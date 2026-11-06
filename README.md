# Etkahn

A static Astro site for Etkahn, with Home, Services, About, Work, and Contact pages.

## Run locally

Use Node.js 22.19 or later.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`. For local testing of the contact endpoint alongside the built pages, run `npx wrangler dev` after the build. Wrangler simulates email delivery locally. The canonical origin is set in `astro.config.mjs`.

## Deploy to Cloudflare Workers

In the `etkahn` Worker's **Settings → Builds**, connect the GitHub repository with `main` as the production branch. Use the repository root, `npm run build` as the build command, and `npm run deploy` as the deploy command. For a manual deployment, run `npm run build` followed by `npm run deploy`. Use `npm run deploy:dry-run` to validate the bundle locally.

## Add portfolio media

Put approved images and videos in `public/media/projects/`. Add or update the matching `media` entry in `src/data/projects.ts`. Public paths start with `/media/projects/`.

```ts
media: {
  image: '/media/projects/example.webp',
  alt: 'A description of what the screenshot shows.',
  caption: 'A short caption for the Work page.',
  ratio: '4 / 3',
  // Optional demo and poster. Keep the still image for the homepage preview.
  poster: '/media/projects/example-poster.webp',
  video: { webm: '/media/projects/example.webm', mp4: '/media/projects/example.mp4' },
},
```

Static images can use WebP, AVIF, JPEG, or PNG. Use `srcset` and `sizes` if you have multiple image widths. With no media entry, the project displays its own typographic artwork. The Pankaj Mishra screenshot comes from the approved project record in the previous Etkahn checkout. Aureon Hub and Goldfinch Construction need approved media and confirmation of the scope and delivery details before expanding their entries.

## Contact delivery

The form posts to `/api/contact`. The Worker validates the submission, rate-limits by client IP, and sends to `hello@etkahn.com` through the Cloudflare email binding. Replies go to the visitor’s address. The direct email link works with JavaScript disabled.

Verify that Cloudflare Email Service can send from `website@etkahn.com` to the verified destination `hello@etkahn.com`. Cloudflare Email Routing forwards the domain aliases to the verified Gmail inbox. In Gmail, create filters under **Settings → See all settings → Filters and Blocked Addresses** and apply the corresponding labels.

| Gmail search criteria | Label |
| --- | --- |
| `to:hello@etkahn.com` | Hello |
| `to:billing@etkahn.com` | Billing |
| `to:support@etkahn.com` | Support |
| `to:mohammad.durrani@etkahn.com` | Mohammad Durrani |

Test the form and forwarding rules after deployment.
