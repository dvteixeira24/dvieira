// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'

const site = 'https://dvieira.dev'
const indexablePaths = ['/', '/about', '/contact']

// https://astro.build/config
export default defineConfig({
    site,
    output: 'server',
    integrations: [
        sitemap({
            // Explicit entries keep server-rendered pages discoverable.
            customPages: indexablePaths.map(path => new URL(path, site).href),
            filter: page => indexablePaths.includes(new URL(page).pathname),
        }),
    ],
    adapter: cloudflare(),
    redirects: {
        '/biography': { status: 301, destination: '/about' },
        '/experience': { status: 301, destination: '/about' },
    },
    security: {
        checkOrigin: true,
    },
})
