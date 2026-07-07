/**
 * Fetches all site content from Sanity into src/data/content.json at
 * build/dev time, so the deployed app is fully static (same behavior as the
 * previous Next.js SSG setup: content updates appear on the next deploy).
 *
 * Falls back to the existing file when offline so `npm run dev` keeps working.
 */
import { createClient } from '@sanity/client'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const outFile = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/content.json')

const client = createClient({
  // Public identifiers (not secrets) — overridable for testing
  projectId: process.env.SANITY_PROJECT_ID || '79vh6zyc',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-11-30',
  // no CDN: build-time snapshots must always see the latest published content
  useCdn: false
})

const queries = {
  pageInfo: '*[_type == "pageInfo"][0]',
  experiences: '*[_type == "experience"] { ..., technologies[]-> }',
  skills: '*[_type == "skill"]',
  projects: '*[_type == "project"] { ..., technologies[]-> }',
  socials: '*[_type == "social"]'
}

try {
  const entries = await Promise.all(
    Object.entries(queries).map(async ([key, query]) => [key, await client.fetch(query)])
  )

  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, JSON.stringify(Object.fromEntries(entries), null, 2) + '\n')
  console.log(`✓ Sanity content written to ${outFile}`)
} catch (err) {
  if (existsSync(outFile)) {
    console.warn(`⚠ Could not reach Sanity (${err.message}) — keeping existing content.json`)
  } else {
    console.error(`✗ Could not fetch Sanity content and no cached content.json exists: ${err.message}`)
    process.exit(1)
  }
}
