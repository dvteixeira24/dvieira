// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: cloudflare(),
    redirects: {
        '/biography': { status: 301, destination: '/about' },
        '/experience': { status: 301, destination: '/about' },
    },
    security: {
        checkOrigin: true,
    },
})
