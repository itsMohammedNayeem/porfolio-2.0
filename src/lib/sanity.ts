import { createImageUrlBuilder } from '@sanity/image-url'

import type { SanityImage } from '../types'

/**
 * Builds Sanity CDN image URLs from asset references embedded in the
 * prefetched content. Public identifiers only — no client/API calls.
 */
const builder = createImageUrlBuilder({
  projectId: '79vh6zyc',
  dataset: 'production'
})

export const urlFor = (source: SanityImage) => builder.image(source)

/**
 * Builds an optimized image URL sized for display: capped width, quality 80,
 * and auto WebP/AVIF. The source images in Sanity are multi-megabyte full-res,
 * so requesting a display-sized rendition is the single biggest perf win.
 * Pass the intended CSS display width; use ~2x for retina crispness.
 */
export const imageSrc = (source: SanityImage, width: number) =>
  builder.image(source).width(width).quality(80).auto('format').url()
