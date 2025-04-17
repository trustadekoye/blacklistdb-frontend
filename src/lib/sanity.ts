import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
    projectId: 'yvza11ed',
    dataset: 'production',
    apiVersion: '2025-04-12',
    useCdn: true
})

// Create an image URL builder
const builder = imageUrlBuilder(client)

// Helper function to get the URL of an image
export const urlFor = (source: SanityImageSource) => builder.image(source)