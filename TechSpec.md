# A&A Response Services — Technical Specification

## 1. Component Inventory

### shadcn/ui Components (built-in)
- **Button** — CTAs (primary/secondary variants)
- **Input** — contact form fields
- **Textarea** — message field
- **Card** — service cards, stat cards, sector cards
- **Label** — form labels
- **Sheet** — mobile navigation overlay

### Custom Components

**HUDFrame**
- Purpose: reusable HUD border overlay for pinned sections
- Props: `className?: string`

**GridOverlay**
- Purpose: CSS grid lines background
- Props: `opacity?: number`

**CornerBrackets**
- Purpose: L-shaped corner accents
- Props: `className?: string`

**ServiceCard**
- Purpose: service/sector card with icon, title, description
- Props: `icon: ReactNode, title: string, description: string`

**StatCard**
- Purpose: metric display with number and label
- Props: `value: string, label: string`

**LogoCell**
- Purpose: monochrome logo placeholder for trusted-by section
- Props: `name: string`

---

## 2. Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero HUD frame draw-on | GSAP | scaleX/scaleY from 0→1 on lines | Medium |
| Hero headline entrance | GSAP | y:+24px, opacity:0→1, power2.out | Low |
| Hero scroll exit (pinned) | GSAP ScrollTrigger | x:-18vw, opacity fade, scrub 0.6 | Medium |
| Section 2 left/right slides | GSAP ScrollTrigger | x:±10vw, opacity, scrub true | Low |
| Section 2 values cards stagger | GSAP ScrollTrigger | y:+10vh, stagger 0.08 | Low |
| Section 3 pinned three-phase | GSAP ScrollTrigger | 0-30% entrance, 30-70% settle, 70-100% exit | High |
| Section 3 cards stagger | GSAP ScrollTrigger | y:+30vh, rotate:+2deg, stagger 0.1 | Medium |
| Section 4 feature items | GSAP ScrollTrigger | x:±8vw, stagger 0.1 | Low |
| Section 5 pinned three-phase | GSAP ScrollTrigger | y:+60vh headline, background parallax | High |
| Section 6 stat cards | GSAP ScrollTrigger | y:+10vh, stagger 0.1 | Low |
| Section 7 pinned three-phase | GSAP ScrollTrigger | same pattern as Section 3 | High |
| Section 8 logo grid | GSAP ScrollTrigger | y:+6vh, stagger 0.06 | Low |
| Section 9 pinned three-phase | GSAP ScrollTrigger | form fields stagger, background parallax | High |
| Global scroll snap | GSAP | derived from pinned sections, settleRatio | High |
| Button hover states | CSS | translateY(-2px), box-shadow | Low |
| Card hover states | CSS | translateY(-4px), border brighten | Low |

---

## 3. Animation Library Choices

### Primary: GSAP + ScrollTrigger
- All scroll-driven animations
- Pinned sections with three-phase timing
- Staggered reveals
- Global snap implementation

### Secondary: CSS
- Hover states (buttons, cards)
- Micro-interactions
- Grid overlay (static or ultra-slow drift)

### Rationale
- GSAP provides precise scrub control and pinned section behavior
- ScrollTrigger’s `fromTo()` ensures reverse scroll correctness
- CSS for simple states keeps bundle size lean

---

## 4. Project File Structure

```
app/
├── src/
│   ├── sections/
│   │   ├── Hero.tsx              # Section 1 (pinned)
│   │   ├── WhoWeAre.tsx          # Section 2 (flowing)
│   │   ├── Services.tsx          # Section 3 (pinned)
│   │   ├── WhyAAA.tsx            # Section 4 (flowing)
│   │   ├── RapidResponse.tsx     # Section 5 (pinned)
│   │   ├── Stats.tsx             # Section 6 (flowing)
│   │   ├── Industries.tsx        # Section 7 (pinned)
│   │   ├── TrustedBy.tsx         # Section 8 (flowing)
│   │   ├── Contact.tsx           # Section 9 (pinned)
│   │   └── Footer.tsx            # Section 10 (flowing)
│   ├── components/
│   │   ├── HUDFrame.tsx          # HUD border overlay
│   │   ├── GridOverlay.tsx       # Grid background
│   │   ├── CornerBrackets.tsx    # Corner accents
│   │   ├── ServiceCard.tsx       # Service/sector card
│   │   ├── StatCard.tsx          # Metric card
│   │   ├── LogoCell.tsx          # Logo placeholder
│   │   ├── Navigation.tsx        # Header nav
│   │   └── MobileMenu.tsx        # Sheet-based mobile nav
│   ├── hooks/
│   │   ├── useScrollAnimation.ts # GSAP scroll setup
│   │   └── useGlobalSnap.ts      # Global snap implementation
│   ├── lib/
│   │   └── utils.ts              # cn() and utilities
│   ├── App.tsx                   # Main app with all sections
│   ├── index.css                 # Global styles, CSS variables
│   └── main.tsx                  # Entry point
├── public/
│   └── images/                   # Background images
├── components/ui/                # shadcn components
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 5. Dependencies

### Core
- `react` ^18
- `react-dom` ^18
- `vite` ^5

### Animation
- `gsap` ^3.12
- `@gsap/react` (optional, or use direct GSAP)

### UI
- `tailwindcss` ^3.4
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

### Fonts
- `@fontsource/space-grotesk`
- `@fontsource/inter`
- `@fontsource/ibm-plex-mono`

### Icons
- `lucide-react`

---

## 6. Key Implementation Notes

### Pinned Section Pattern
```typescript
// Each pinned section follows this structure
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "+=130%",
  pin: true,
  scrub: 0.6,
  // animations defined with fromTo()
});
```

### Three-Phase Animation
- **0-30%**: Elements enter from off-screen
- **30-70%**: Static settle state (fully readable)
- **70-100%**: Elements exit (stay visible until ~95%)

### Global Snap
- Derive snap targets from actual pinned ScrollTriggers
- Use each section's `settleRatio` (default 0.5)
- Fast snap: delay 0, duration 0.18-0.45s

### Z-Index Stacking
- Section 1: z-10
- Section 3: z-20
- Section 5: z-30
- Section 7: z-40
- Section 9: z-50
- Ensures next section overlays previous during transitions

### Performance
- Use `will-change: transform` on animated elements
- Avoid backdrop-filter blur
- Keep grid overlay simple (CSS gradients)
