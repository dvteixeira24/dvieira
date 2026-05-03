declare namespace App {
    interface Locals {}
}

declare module 'cloudflare:workers' {
    export const env: import('./worker').Env
}
