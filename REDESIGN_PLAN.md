# Redesign Plan: Latvia Guide (React + Tailwind)

## 1. Weak Points in the Current Design
- **Typography:** Relies on generic system fonts. Lacks the crisp, uniform readability of a premium sans-serif typeface.
- **Iconography:** Problem cards use standard emojis (🏠, 💼), which feels like a personal blog rather than a professional gov-tech/startup product.
- **Color Palette & Depth:** The teal primary color is functional but lacks depth. The cards and backgrounds don't use subtle tinted surfaces or soft shadows effectively.
- **Hierarchy & Layout:** The homepage elements stack simply but lack a strong 12-column grid alignment, generous padding, and the visual distinction that alternating soft section backgrounds provide.
- **Components:** Buttons and badges have basic styling without the refined hover states, rounded corners, and micro-interactions expected in modern apps.

## 2. Visual Direction
- **Vibe:** Modern European startup / clean gov-tech. Calm, professional, highly trustworthy.
- **Typography:** **Inter** (self-hosted). It's clean, legible, and supports all necessary diacritics and Cyrillic. We'll enforce a strict typographic scale.
- **Colors:**
  - *Primary:* Deep slate blue/teal (trustworthy, calm).
  - *Accent:* Warm amber/orange (for actionable highlights).
  - *Semantic:* Official (emerald green), Verified (sky blue), Warning (rose red).
  - *Surfaces:* Soft gray/blue tinted backgrounds (`bg-slate-50`, `bg-white`) with extremely subtle borders (`border-slate-200`).
- **Components:** Rounded cards (`rounded-xl` or `rounded-2xl`), very light shadows (`shadow-sm`, `shadow-md` on hover), clean Lucide icons replacing emojis, and crisp pill-shaped badges.

## 3. Migration Strategy (Phased Approach)
We will keep Astro for routing and static generation, but migrate all UI and interactivity to React + Tailwind.
1. **Phase 1:** Create `react-tailwind-redesign` branch. Install React, Tailwind, Lucide. Setup tokens and Inter font. Update base layout.
2. **Phase 2:** Build shared React components (Button, Card, Badges, Callouts) and the internal `/design-system` page.
3. **Phase 3:** Migrate i18n logic and Language Switcher to React.
4. **Phase 4:** Rebuild the Homepage with new layout, icons, and typography.
5. **Phase 5:** Rebuild Guide templates and landing pages (clean article layout, table of contents).
6. **Phase 6:** Rebuild Checklist and Search components (React state replacing vanilla JS).
7. **Phase 7:** Rebuild Useful Websites, Phrases, and Emergency pages.
8. **Phase 8:** Rebuild Map (React-Leaflet wrapper).
9. **Phase 9:** Rebuild Calculators (React state).
10. **Phase 10:** Cleanup old CSS, final SEO/accessibility checks.
11. **Phase 11:** Final QA (cross-browser, mobile, Lighthouse).

## 4. Questions
1. Is the `Inter` font acceptable, or do you have a specific font in mind?
2. Shall I proceed to create the branch and start Phase 1?
