import type { APIRoute } from 'astro';
import { navigation } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const entries = navigation.map(({ href }) => `<url><loc>${new URL(href, site)}</loc></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
