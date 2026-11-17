# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, etc.) when working with code in this repository. `CLAUDE.md` is a symlink to this file.

## Overview

See `README.md`. Node 22 is required (see `.nvmrc`).

## Commands

See `README.md`. CI (`.github/workflows/ci.yaml`) runs typecheck, Prettier, and ESLint. There is no test suite. Run `react-router typegen` (part of `npm run typecheck`) before relying on `./+types/*` imports.

## Architecture

**Fully static, no runtime server.** `react-router.config.ts` sets `ssr: false` and prerenders `/`, `/episodes`, and `/episodes/:number` for every episode. Route `loader`s run only at build time (in Node), so they can use `fs`. `vercel.json` serves the prerendered files and falls back to `/index.html` with a 404 status.

**Episode data pipeline.** Episodes have no explicit IDs. An episode's number is its 1-based position in the `episodeConfigs` array (`app/episodes/utils/episodeConfigs.ts`). `getEpisodeConfigs()` (`app/episodes/utils/getEpisodeConfigs.ts`) builds full episode objects from that array:

- derives `number` and `title` ("Episode 01", …)
- checks that `public/episodes/audio/episode{N}.mp3` exists, and fails the build if it doesn't
- reads width, height, and `ImageDescription` (used as alt text) from the EXIF data of `public/episodes/images/episode{N}.png` and `episode{N}-opengraph.jpg`
- parses the optional `public/episodes/transcripts/episode{N}.vtt` (a Descript subtitle export) into speaker paragraphs of timed cues
- attaches waveform peaks from `app/episodes/waveforms/getAudioPeaks.ts`, which must statically import each `episode{N}.json`
- returns episodes newest-first; it optionally accepts a list of properties to keep loader payloads small

`getPublicURL` switches between `public/` (dev) and `build/client` (when running from `build/server`), so keep that in mind if you move files.

**Adding an episode** requires several assets and code entries to stay in sync. Use the `add-episode` skill (`.agents/skills/add-episode/SKILL.md`; `.claude/skills` is a symlink to `.agents/skills`).

**Routes** are declared in `app/routes.ts`. Route modules in `app/routes/` are thin: loader, `meta`, and rendering a component from `app/episodes/` or `app/home/`. An invalid episode number redirects to `/episodes`. Page `<meta>` and Open Graph tags come from `createRouteMeta`, which uses the absolute domain `https://podcast.tesinandnick.com`. Use `satisfies RoutePath` (`keyof Register["pages"]`) for type-checked internal paths.

**Audio playback** uses `@wavesurfer/react` with precomputed peaks, so the browser doesn't decode the audio to draw the waveform.

## Conventions

- Styling uses CSS Modules (`*.module.css`, co-located with components) with PostCSS nesting, plus global `app/app.css` and `sanitize.css`. Use `clsx` to compose class names.
- `~/*` aliases `app/*`.
- TypeScript is strict with `noUncheckedIndexedAccess` and `verbatimModuleSyntax`, so use `import type` for type-only imports.
- Sentry is enabled only in production builds. Source maps are uploaded only when `SENTRY_AUTH_TOKEN` is set. GoatCounter handles analytics.
- Pages are marked `noindex` in `root.tsx`.
