import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { postHref, publishedPosts } from '../lib/blog'

export const prerender = true

export async function GET(context: APIContext) {
    const posts = publishedPosts(await getCollection('blog'))
    return rss({
        title: 'Daniel Vieira Teixeira — Writing',
        description:
            'Notes on building software, from Daniel Vieira Teixeira.',
        site: context.site!,
        items: posts.map(post => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: postHref(post.id),
        })),
    })
}
