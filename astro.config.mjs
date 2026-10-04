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
    trailingSlash: 'never',
    integrations: [
        sitemap({
            // Explicit entries keep server-rendered pages discoverable. The
            // prerendered /blog routes are auto-discovered and admitted by the
            // filter's /blog rules below.
            customPages: indexablePaths.map(path => new URL(path, site).href),
            filter: page => {
                const pathname = new URL(page).pathname
                return (
                    indexablePaths.includes(pathname) ||
                    pathname === '/blog' ||
                    pathname.startsWith('/blog/')
                )
            },
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
