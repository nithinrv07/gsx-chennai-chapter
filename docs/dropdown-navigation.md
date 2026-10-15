# Animated GSX navigation

The supplied dropdown navigation is adapted in
`src/components/ui/dropdown-navigation.tsx`. This project already uses
TypeScript, Tailwind v4, shadcn configuration, Framer Motion, and Lucide;
no setup or additional packages are needed. For a fresh checkout, run
`npm ci`, then `npm run dev`.

The configured shared UI path is `src/components/ui`, with global CSS in
`src/index.css` and header layout in `src/styles/home.css`. Keep new UI in
this folder to match `components.json`; a second root `components/ui` folder
would split the project's conventions. The `@` alias points at the repository
root, so absolute imports use `@/src/components/ui/dropdown-navigation`.

Unlike the sample's fullscreen demo wrapper and placeholder links, this
component fits inside the fixed header and uses real navigation callbacks.
The sample's props type is corrected to accept an array of navigation items.
Navbar maps its existing `NAV_STRUCTURE` to labels, descriptions, Lucide
icons, active states, and page/section callbacks. No stock images are needed.

The animated pill, rounded dropdown panels, icon tiles, and descriptions
follow the supplied design using the site's purple palette. Desktop menus
open on hover or disclosure-button click. Arrow Down opens a dropdown and
focuses its first item; Tab moves through its controls; Escape closes it and
restores focus to the disclosure. Clicking elsewhere or moving keyboard
focus out closes the panel. Page-label buttons still navigate directly.

The existing mobile accordion, search, join action, brand, and sticky header
remain integrated. Desktop navigation starts at 1024px; smaller screens use
the mobile drawer. Panels near the right edge align to the right and long
menus scroll within the viewport. Reduced-motion preferences disable panel
movement and shared panel transitions. Menu state stays local to Navbar;
no additional context providers are required.

Validation: `npm run lint`, `npm run build`, `git diff --check`.
