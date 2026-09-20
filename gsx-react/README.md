# GSX Chennai React homepage

A component-based conversion of the supplied homepage, with the purple skyline image included locally. React + TypeScript + Vite; no component or animation libraries required.

## Run as a new project

Use Node.js 20.19+ or 22.12+. In this folder run:

```sh
npm install
npm run dev
```

For a production build run `npm run build`; output is in `dist/`.

## Add to your existing React project

1. Copy the components from `src/components/` selectively. If your project already has `Navbar.tsx`, `HeroGlow.tsx`, or `AnimatedCounter.tsx`, compare the implementations before replacing them, or rename these imports.
2. Copy `HomePage.tsx`, `config.ts`, and `styles/home.css` into `src/`.
3. Copy `public/assets/chennai.webp` into your public assets directory.
4. Render `<HomePage />` from your home route. Keep your existing App, router, package.json, and main.tsx.
5. Update `src/config.ts` with your real page paths and Join GSX form URL. The package contains only the homepage; other pages and form backends are not implemented.

The CSS includes global body and element rules. Merge these with your existing stylesheet if integrating into a larger app. If deployed under a subpath, adjust `/assets/chennai.webp` and the route paths accordingly.

## Components

- Navbar.tsx: responsive navigation and mobile menu
- SearchModal.tsx: native dialog with page filtering and keyboard dismissal
- HeroGlow.tsx: skyline image and dark overlays
- ChennaiSkyline.tsx: city title and landmark labels
- Hero.tsx: heading, description and calls to action
- CommunityStats.tsx: community statistics from the reference
- AnimatedCounter.tsx: count-up with reduced-motion support

Change the displayed statistics in CommunityStats.tsx. Replace the text wordmark in Navbar.tsx with your official logo if desired. The background is an AI-recreated asset based on your reference, not an exact pixel copy. Additional event, project, and form modals in your screenshot are outside this homepage package.

## Animated purple background

`HeroGlow.tsx` overlays animated SVG light trails on the skyline image. The purple ribbons pulse and a bright highlight travels along each curve, producing a looping video-like effect without an MP4. The pause button freezes the background; reduced-motion preferences disable animation. Change `neon-travel` durations in `home.css` to adjust speed and the halo opacity/stroke widths to adjust intensity.
