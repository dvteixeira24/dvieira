// Giscus comment configuration (public, non-secret values).
const repo = 'dvteixeira24/dvieira'
const repoId = 'R_kgDOSTELtg'
const category = 'General'
const categoryId = 'DIC_kwDOSTELts4DHCcc'

export const giscus = { repo, repoId, category, categoryId }

// True only when every giscus value is set; the widget degrades gracefully
// (renders a muted note) until then.
export const giscusConfigured = Boolean(
    repo && repoId && category && categoryId,
)
