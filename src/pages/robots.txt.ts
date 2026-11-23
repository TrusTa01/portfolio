import type { APIRoute } from 'astro';
import { CONCEPT_PATH } from '../navigation/nav.ts';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const body = `User-agent: *\nAllow: /\nDisallow: ${CONCEPT_PATH}\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
