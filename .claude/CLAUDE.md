# Project Instructions

Personal portfolio website of a Flutter developer. Static Astro site, Russian and English versions. Built stage by stage; the design spec and the staged plan are in `.superpowers/specs/` and `.superpowers/plans/` (local only, not in git).

## Audience

The site serves two audiences with one goal (getting the owner work): clients who hire a freelancer, and employers who hire for a job. Design, structure and copy must work for both. Take this into account in every design decision.

## Language

- Write everything that goes into the repo in English: code, comments, commit messages, README, docs, branch names, identifiers.
- Chat with the user in Russian.
- Site copy (RU/EN texts shown to visitors) is content, not code. It lives in the i18n dictionary and in `src/content/`.

## Stack

- Astro 7, TypeScript (strict), static output
- Node >= 22.18
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

## Code quality

- Max 200 lines per source file (`.ts`, `.astro`, `.css`, `.mjs`). When a file approaches the limit, split it by responsibility. Content `.md`, lock files and generated output are exempt.
- Reuse first: before writing something, look for an existing component, function or type that does it. Repeated markup or logic becomes a component or a helper, never a copy.
- No hardcode: visitor-facing strings live in the i18n dictionary or `src/content/`; contacts and domain in `src/site.config.ts`; locales, routes, animation durations, breakpoints and colors in named constants or theme tokens. No magic numbers or strings inline.
- Apply SOLID, DRY, KISS and YAGNI, and keep Clean Architecture boundaries: pure logic (i18n, content visibility, config) has no Astro or DOM imports; components and pages only compose it; browser scripts stay in `src/scripts/`. Dependencies point inward, never from logic to UI.
- One responsibility per file, function and component. Prefer small pure functions with explicit inputs over hidden state. Explicit types, no `any`.
- Every pure-logic function gets a unit test. If the plan's code breaks these rules, follow the rules and note the deviation in the report.

## Design skills

Project-level skills in `.claude/skills/` (local only, gitignored). Use each for its own job so their advice does not collide:

- `design-taste-frontend`: art direction and the first layout of a page (direction, composition, type, palette).
- `impeccable`: critique, audit, accessibility, responsive checks and `DESIGN.md` with theme tokens.
- `emil-design-eng`: motion, hover and focus states, and small interaction details.
- Do not mix recommendations from several skills in one pass. When they disagree, name the conflict and let the user choose.

## Do not

- Put personal data in the repo (finances, relocation plans, private notes from the user's Obsidian vault). Name, contacts and domain come only from the user.
- Publish draft or unapproved project descriptions. Projects default to `draft: true`.
- Invent facts about the user's projects or experience.

## See also

- Astro docs: https://docs.astro.build
