# Astro Starter Kit: Basics

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Contact Form Configuration

This project uses Astro Actions on Cloudflare Workers for the contact page.

### Required variables

- `PUBLIC_HCAPTCHA_SITE_KEY` - hCaptcha site key for the browser widget
- `HCAPTCHA_SECRET` - hCaptcha secret key (server only)
- `TELEGRAM_BOT_TOKEN` - Telegram bot token (server only)
- `TELEGRAM_CHAT_ID` - destination Telegram chat ID (server only)
- `CONTACT_ALLOW_DEV_CAPTCHA_BYPASS` - optional, defaults to disabled (`false`)

Set local development values in `.dev.vars` (do not commit this file).

### Cloudflare secrets

Use Wrangler to set private values:

```sh
pnpm wrangler secret put HCAPTCHA_SECRET
pnpm wrangler secret put TELEGRAM_BOT_TOKEN
pnpm wrangler secret put TELEGRAM_CHAT_ID
```

`PUBLIC_HCAPTCHA_SITE_KEY` can be configured as a regular Worker variable in `wrangler.jsonc` or via dashboard environment variables.
