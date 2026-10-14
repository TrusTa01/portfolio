# Project Instructions

Personal portfolio website of a Flutter developer. Static Astro site, Russian and English versions. Built stage by stage; the design spec and the staged plan are in `.superpowers/specs/` and `.superpowers/plans/` (local only, not in git).

## Language

- Write everything that goes into the repo in English: code, comments, commit messages, README, docs, branch names, identifiers.
- Chat with the user in Russian.
- Site copy (RU/EN texts shown to visitors) is content, not code. It lives in the i18n dictionary and in `src/content/`.

## Stack

- Astro 7, TypeScript (strict), static output
- Node >= 22.12
- Planned in later stages (add only when the stage calls for it): Tailwind CSS, `@astrojs/sitemap`, Motion

## Commands

- Install: `npm install`
- Dev: `astro dev --background`, then `astro dev status | logs | stop`
- Build: `npm run build`
- Preview: `npm run preview`

## Workflow

- Do one stage at a time and stop for the user's review. Do not build ahead of the requested stage.
- Never run `git init`, commit, push, create a remote repository or publish the site unless the user explicitly asks.
- Do not add dependencies the current stage does not need.

## Do not

- Put personal data in the repo (finances, relocation plans, private notes from the user's Obsidian vault). Name, contacts and domain come only from the user.
- Publish draft or unapproved project descriptions. Projects default to `draft: true`.
- Invent facts about the user's projects or experience.

## See also

- Astro docs: https://docs.astro.build
