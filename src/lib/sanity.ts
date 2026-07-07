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
