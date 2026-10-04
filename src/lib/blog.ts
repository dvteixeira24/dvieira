export type BlogPostData = {
    title: string
    description: string
    pubDate: Date
    updated?: Date
    tags?: string[]
    cover?: string
    draft?: boolean
}

export type BlogPostLike = {
    id: string
    data: BlogPostData
}

export function postHref(id: string): string {
    return '/blog/' + id
}

export function isPublished(
    post: BlogPostLike,
    opts: { includeDrafts?: boolean } = {},
): boolean {
    if (post.data.draft && !opts.includeDrafts) return false
    return true
}

export function sortPostsByDate<T extends BlogPostLike>(
    posts: T[],
    order: 'desc' | 'asc' = 'desc',
): T[] {
    return [...posts].sort((a, b) => {
        const diff = b.data.pubDate.getTime() - a.data.pubDate.getTime()
        return order === 'desc' ? diff : -diff
    })
}

export function publishedPosts<T extends BlogPostLike>(
    posts: T[],
    opts: { includeDrafts?: boolean } = {},
): T[] {
    return sortPostsByDate(posts.filter(post => isPublished(post, opts)))
}

const dateFormatter = new Intl.DateTimeFormat('en', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
})

export function formatDate(date: Date): string {
    return dateFormatter.format(date)
}
