import { z } from 'astro/zod';

export const MAX_HERO_CHIPS = 3;
export const SERVICES_COUNT = 3;

export const homeSchema = z.object({
  hero: z.object({
    title: z.string(),
    description: z.string(),
    chips: z.array(z.string()).max(MAX_HERO_CHIPS),
  }),
  about: z.object({ paragraphs: z.array(z.string()) }),
  technologies: z.object({ intro: z.string(), items: z.array(z.string()) }),
  services: z
    .array(z.object({ title: z.string(), tools: z.array(z.string()), result: z.string() }))
    .length(SERVICES_COUNT),
  contacts: z.object({ intro: z.string() }),
});

export type HomeContent = z.infer<typeof homeSchema>;
