# AstroVerse

A mobile-first cosmic astrology frontend prototype with a planet-reactive visual theme, animated sacred geometry, and a local planet selector. It does not perform astrology calculations or use live data.

## Run & Operate

- `pnpm --filter @workspace/astroverse run dev` — run the managed AstroVerse preview
- `pnpm --filter @workspace/astroverse run typecheck` — compile the Angular app
- `pnpm run typecheck` — check the workspace
- AstroVerse uses local mock state; it does not require the shared API server or database.

## Stack

- pnpm workspace, TypeScript
- Angular with Ionic Angular
- Angular signals for local theme and visual state
- Inline SVG geometry and CSS gradients/animations

## Where things live

- `artifacts/astroverse/src/app/models/planet-theme.model.ts` — theme and local visual-state types
- `artifacts/astroverse/src/app/core/services/theme.service.ts` — planet definitions, selection, and CSS theme variables
- `artifacts/astroverse/src/app/components/` — nebula background, zodiac wheel, yantras, status text, and planet selector
- `artifacts/astroverse/src/app/pages/home/` — main mobile screen
- `artifacts/astroverse/src/index.css` — cosmic atmosphere, layout, safe areas, and motion

## Architecture decisions

- Planet colors, glows, and nebula tones are centralized in the theme model/service; components consume CSS variables rather than defining their own planet palettes.
- Each planet selects its own vector yantra. These are visual prototypes, not mathematically authentic charts.
- Motion is CSS-based, slow, and reduced for users who prefer reduced motion.

## Product

- Starts on Jupiter with an amber cosmic atmosphere.
- A translucent side selector switches between Jupiter, Mercury, Saturn, Mars, and Sun without reloading.
- Status copy, planetary glyph, yantra, background, and accent glow follow the active planet.

## User preferences

- Keep this prototype frontend-only: no backend, API, database, authentication, payments, AI, or real astrology logic.
- Preserve the immersive cosmic reference direction; do not turn it into a standard Ionic dashboard or add cards.

## Gotchas

- Use the managed `artifacts/astroverse: web` workflow so the injected `PORT` and `BASE_PATH` are honored.
- The generic API Server artifact exists in the workspace but is not part of AstroVerse.

## Pointers

- See the `pnpm-workspace` skill for workspace structure and package conventions.