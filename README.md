# Etkahn

Etkahn's technology and automation studio website, built with React, vinext, and the OpenAI Sites hosting runtime.

The site includes:

- a Famous-inspired agency homepage
- eight technology services and eight productised packages priced in USD
- a persistent cart and invoice-by-email checkout
- privacy, terms, returns/refunds, and shipping/service-delivery policies
- local office and contact placeholders ready to be replaced

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Do not open the HTML source files directly; the development server supplies the styles, scripts, and application routes.

## Verification

```bash
npm test
```

The test command builds the production worker and verifies the homepage, checkout, policy routes, eight USD-priced packages, and cart scripts.

## Cloudflare Workers deployment

`wrangler.jsonc` is the production source of truth for the `etkahn` Worker and its `etkahn.com` custom domain. The Vite Cloudflare plugin produces the Worker bundle and static assets in `dist/`.

For Cloudflare Workers Builds, connect this GitHub repository with:

- production branch: `main`
- build command: `npm test`
- deploy command: `npx wrangler deploy`
- non-production deploy command: `npx wrangler versions upload`
- root directory: `/`

After that one-time connection, pushes to `main` deploy automatically and other branches receive preview versions.

For a local deployment after authenticating Wrangler:

```bash
npm test
npm run deploy
```

`.openai/hosting.json` retains the existing Etkahn Sites project link as a separate fallback hosting target.
