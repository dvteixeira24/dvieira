// Giscus comment configuration (public, non-secret values).
// Populate these after enabling GitHub Discussions and installing the
// giscus App on dvteixeira24/dvieira — see docs/superpowers/specs/2026-10-04-blog-design.md.
const repo = ''
const repoId = ''
const category = ''
const categoryId = ''

export const giscus = { repo, repoId, category, categoryId }

// True only when every giscus value is set; the widget degrades gracefully
// (renders a muted note) until then.
export const giscusConfigured = Boolean(
    repo && repoId && category && categoryId,
)
