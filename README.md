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

## Hosting

`.openai/hosting.json` links this repository to the existing Etkahn Sites project. Build artifacts are generated in `dist/` and deployed through the Sites publishing workflow.
