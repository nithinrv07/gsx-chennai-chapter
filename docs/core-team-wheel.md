# Core Team wheel

The supplied WorksWheel is integrated in `src/components/ui/works-wheel.tsx`.
The existing shadcn configuration points to `src/components/ui`, so this
folder keeps reusable UI and CLI-generated imports consistent; a separate
root-level components folder is unnecessary. The `@` alias resolves to the
repository root, and the wheel imports `cn` from `@/src/lib/utils`.
Global styles remain in `src/index.css`.

TypeScript, Tailwind, React, and Lucide are already installed. No additional
dependencies, context providers, or stock images are required. Set up a fresh
checkout with `npm ci` and run it with `npm run dev`.

`CoreTeamShowcase` maps all 13 entries from `CORE_TEAM` to the supplied
ring-to-drum wheel. It uses real team portraits, a member index, Previous and
Next controls, scroll/drag navigation, and Arrow Up/Down and Home/End keys.
The selected member's name, role, bio, ownership area, and available LinkedIn
link appear below. The Founder and Chapter Lead profiles stay in place.
Both CommunityPage (also used for the team route) and the standalone TeamPage
use the shared showcase. The previous glow heading is not reintroduced.

Below 768px and for reduced-motion preferences, every member appears in a
static profile grid. Preference and viewport changes update this choice.
Existing portrait positioning is preserved and failed wheel photos reveal
initials. Wheel instances use unique option IDs. Scroll events release the
page at both ends; Ctrl+wheel and horizontal gestures are not intercepted.
Animation frames stop when the wheel rests, and listeners, timers, frames,
and ResizeObserver are cleaned up when the component unmounts.

The reusable wheel retains `items`, `label`, `action`, and section props.
Items support `subtitle` and `imagePosition`; `onActiveChange(index)` lets
the host display profile details. LinkedIn actions live in the profile panel
instead of making every rotating portrait an external navigation target.

Validation: TypeScript (`npm run lint`), production build (`npm run build`),
and `git diff --check`. A jsdom interaction smoke check also covered member
selection/LinkedIn, keyboard navigation, scroll-boundary behavior, idle-frame
shutdown, mobile/reduced-motion fallback, and Strict Mode cleanup. Browser
visual verification remains pending.
