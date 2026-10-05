import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        // The CMS writes `updated: ''` (and `cover: ''`) when the optional
        // fields are left blank; normalise empty strings to `undefined` so
        // the optional date coercion doesn't reject them.
        updated: z.preprocess(
            value => (value === '' ? undefined : value),
            z.coerce.date().optional(),
        ),
        tags: z.array(z.string()).optional(),
        cover: z.string().optional(),
        draft: z.boolean().optional(),
    }),
})

export const collections = { blog }
