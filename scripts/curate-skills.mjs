/**
 * One-off content op: hides resume-irrelevant skills from the Skills grid
 * by setting showInSkills=false. The documents are NOT deleted — they remain
 * valid technology-tag targets on experience/project cards, so those card
 * icons are preserved. Reversible by flipping the flag back to true.
 *
 * Run:  node --env-file=.env.local scripts/curate-skills.mjs
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('✗ SANITY_API_WRITE_TOKEN missing — run with: node --env-file=.env.local scripts/curate-skills.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: '79vh6zyc',
  dataset: 'production',
  apiVersion: '2023-11-30',
  token,
  useCdn: false
})

// Skills to keep as technology tags but hide from the Skills grid
// (resume-aligned trim, approved 2026-07-07).
const hideIds = [
  '0866e202-6221-4571-a9a1-9b09b5d432d6', // DB2
  '2d546bb5-5ce7-47e5-a790-6c818207fa93', // Oxylabs web scrape
  '32f5a9f5-1a51-4698-8018-4c3fbc68f793', // Sanity IO
  '330e811e-3c45-4a59-9e01-bec7d2cae0f6', // Firebase
  '380c0079-6f85-4e8b-978c-e1de041f602c', // Material UI
  '49dc3c24-675b-410c-9299-e06f23385930', // Mainframe
  '4d963f80-cbb6-4d7b-a623-093bba2e62d1', // App write cloud
  '54dfb41c-bb44-4942-97cc-9499bcaccd60', // Stepzen
  '77af1cf6-a36c-46c5-870b-5c92d8acd500', // Dropzone
  '7b3af20f-a9e8-466e-ac92-86ec8f08e1fc', // Azure functions
  '83efae6b-0d39-413d-8286-083a3f0c0c11', // i18next
  'badeacb6-9d1d-4333-a0c4-a667ef55f65b', // SWR
  'c764f68c-6121-4b6e-bb63-da12ff9499e5', // COBOL
  'ccc2c062-98d5-4e40-ad1a-e4b309171c0c', // Open AI API
  'de11c551-0bd0-4c4e-9ca2-ddd4842b9aa2', // Chart JS
  'e6d911cc-c3e5-4491-a7e8-8998b267441a', // ShadCn UI
  'f77f3f90-68ea-489d-b968-2de44724247f' //  Clerk
]

let tx = client.transaction()
for (const id of hideIds) {
  tx = tx.patch(id, patch => patch.set({ showInSkills: false }))
}

const result = await tx.commit()
console.log(`✓ committed ${result.transactionId}: ${hideIds.length} skills hidden from the grid (documents retained as tech tags)`)
