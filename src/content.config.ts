import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { homeSchema } from './content/home-schema.ts';

const home = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/home' }),
  schema: homeSchema,
});

export const collections = { home };
