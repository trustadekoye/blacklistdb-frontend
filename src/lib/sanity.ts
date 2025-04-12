import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'yvza11ed',
    dataset: 'production',
    apiVersion: '2025-04-12',
    useCdn: true
})