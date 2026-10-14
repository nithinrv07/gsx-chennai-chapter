# GSX glow horizon intro

The existing Vite app already supports TypeScript, Tailwind CSS v4, and the
shadcn directory configuration. `framer-motion` and `lucide-react` are already
installed, so no dependency or lockfile changes are needed. Run `npm ci` when
setting up a fresh checkout.

- Shared UI: `src/components/ui` (the `ui` alias in `components.json`).
- Global styles: `src/index.css`, with homepage styles in `src/styles/home.css`.
- The `@` import alias resolves to the repository root, so use
  `@/src/components/ui/glow-horizon` in this project.

Keeping reusable components in `src/components/ui` follows the project's
shadcn aliases and keeps generated UI and imports consistent. A second
root-level `components/ui` folder is unnecessary.

`GlowHorizonFM` accepts an optional `className` and a `variant` of `top`,
`bottom`, `left`, or `right` (default `top`). It needs a positioned container
with a defined size and hidden overflow. `GlowHorizonDemo` supplies that
container and the GSX title; the original snippet referenced an animated
title helper without supplying its implementation, so one is included.

`IntroScreen` wraps the existing app. Content mounts and loads underneath
while the intro runs for 3.3 seconds, followed by a 0.45-second fade. It runs
once per document load, including refreshes, and stays mounted across page
navigation. Existing deep links still select their requested page.

During the intro, background content is inert and hidden from assistive
technology, scrolling is locked, and the Skip intro button remains available
by keyboard. Focus moves to main content if the focused Skip button is
removed. Users who prefer reduced motion skip the intro. Timers, preference
listeners, and scroll styles are cleaned up on unmount, including React
Strict Mode remounts.

No global state, new providers, API data, stock photography, or extra image
assets are required. Text scales for mobile screens and the canvas follows
the dynamic viewport height. `AnimatedTitleFM` takes an `open` boolean; edit
its copy to change the branding.

Validation: `npm run lint`, `npm run build`.
