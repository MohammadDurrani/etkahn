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

`npm run build` writes the static site to `dist/`. Configure the static host to serve directory indexes at extensionless URLs such as `/work`. The canonical origin is set in `astro.config.mjs`.

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

The inquiry form validates fields and opens a prefilled draft in the visitor’s email app. The visitor reviews and sends the email from that app. A direct email link works with JavaScript disabled.

Server-side delivery would require a POST endpoint, server-side field validation and abuse controls, and a configured mail service with a verified sender. Keep mail credentials on the server. Report success only after the service accepts the message and keep the direct email link available if delivery fails.
