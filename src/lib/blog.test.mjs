import assert from 'node:assert/strict'
import test from 'node:test'
import {
    formatDate,
    isPublished,
    postHref,
    publishedPosts,
    sortPostsByDate,
} from './blog.ts'

const makePost = (id, pubDate, draft = false) => ({
    id,
    data: {
        title: `Post ${id}`,
        description: 'A test post',
        pubDate: new Date(pubDate),
        draft,
    },
})

test('postHref builds a slashless /blog/<slug> link', () => {
    assert.equal(postHref('hello-world'), '/blog/hello-world')
})

test('isPublished hides drafts by default and shows non-drafts', () => {
    assert.equal(isPublished(makePost('a', '2026-01-01', true)), false)
    assert.equal(isPublished(makePost('b', '2026-01-01', false)), true)
    assert.equal(
        isPublished(makePost('c', '2026-01-01', true), { includeDrafts: true }),
        true,
    )
})

test('sortPostsByDate orders newest first and supports ascending', () => {
    const posts = [
        makePost('old', '2026-01-01'),
        makePost('new', '2026-06-01'),
        makePost('older', '2025-12-31'),
    ]
    assert.deepEqual(
        sortPostsByDate(posts).map(p => p.id),
        ['new', 'old', 'older'],
    )
    assert.deepEqual(
        sortPostsByDate(posts, 'asc').map(p => p.id),
        ['older', 'old', 'new'],
    )
})

test('publishedPosts filters drafts and sorts newest first', () => {
    const posts = [
        makePost('draft', '2026-07-01', true),
        makePost('mid', '2026-03-01'),
        makePost('latest', '2026-05-01'),
    ]
    assert.deepEqual(
        publishedPosts(posts).map(p => p.id),
        ['latest', 'mid'],
    )
    assert.deepEqual(
        publishedPosts(posts, { includeDrafts: true }).map(p => p.id),
        ['draft', 'latest', 'mid'],
    )
})

test('formatDate renders a stable UTC date string', () => {
    assert.equal(formatDate(new Date('2026-10-04T00:00:00Z')), 'October 4, 2026')
})
