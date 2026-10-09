# Ngadongeng — Brand Styling & Planning Guide

> _"Carita hirup dina ucapan, abadi dina tulisan."_
> ("Stories live in speech, eternal in writing.")

---

## 1. Brand Foundation

### 1.1 Identity Statement

**Ngadongeng** is a living digital archive and community platform for Sundanese folklore and cultural heritage. It is rooted in _TBM Pabukon Ngadongeng_ but belongs to anyone who carries a story worth telling. The platform exists at the intersection of **preservation** and **participation** — a space that feels as intimate as a grandmother's veranda, as inviting as a village gathering.

### 1.2 Brand Personality

| Dimension   | Characteristic                                  |
| ----------- | ----------------------------------------------- |
| **Voice**   | Warm, unhurried, trustworthy                    |
| **Feeling** | Like sitting cross-legged on bamboo mat at dusk |
| **Role**    | Village elder meets digital librarian           |
| **Not**     | Corporate, cold, gamified, or clickbait-driven  |

### 1.3 Core Values

- **Ngamumule** (Preservation) — every story shared is a cultural act of care
- **Bareng-bareng** (Togetherness) — inclusive authorship, community curation
- **Luhung** (Dignified) — Sundanese culture deserves beautiful, intentional presentation
- **Mekar** (Flourishing) — the platform grows as its community grows

---

## 2. Visual Identity

### 2.1 Aesthetic Direction

**Warm Ethnographic Editorial**

Draw from Sundanese visual vernacular: batik _lereng_ diagonal motifs, the terracotta and golden hues of traditional _rumah panggung_, the deep indigos of handwoven _kain tenun_. Pair this with a modern editorial typographic grid — the result should feel like a beautifully designed cultural magazine that respects its heritage without being a museum.

The key tension to maintain: **ancient texture, contemporary clarity.**

---

## 3. Color System

### 3.1 Color Palette

All values given in HEX, HSL, and CSS variable name.

#### Primary — _Tanah Liat_ (Terracotta Earth)

```
--color-tanah:        #C1622F   /* hsl(22, 60%, 47%) */
--color-tanah-light:  #D98558   /* hsl(24, 55%, 59%) */
--color-tanah-dark:   #8C3E18   /* hsl(22, 70%, 32%) */
```

_Use for: primary buttons, active states, key headings, logo mark accent._

#### Secondary — _Padi_ (Golden Harvest)

```
--color-padi:         #E8B84B   /* hsl(42, 78%, 60%) */
--color-padi-light:   #F2D07A   /* hsl(44, 84%, 71%) */
--color-padi-dark:    #B38520   /* hsl(41, 70%, 41%) */
```

_Use for: highlights, badges, featured content accents, decorative motifs._

#### Tertiary — _Cai_ (Deep Water Indigo)

```
--color-cai:          #2C3E6B   /* hsl(224, 41%, 30%) */
--color-cai-light:    #4A5E91   /* hsl(224, 35%, 43%) */
--color-cai-dark:     #1A2542   /* hsl(224, 45%, 18%) */
```

_Use for: secondary buttons, links, audio/visual category tags, dark sections._

#### Neutral — _Kalapa_ (Coconut Shell & Cream)

```
--color-cream:        #FAF4E8   /* hsl(42, 67%, 95%) */  ← primary background
--color-parchment:    #EDE3CC   /* hsl(40, 45%, 87%) */  ← card backgrounds
--color-kulit:        #C4A882   /* hsl(34, 35%, 64%) */  ← borders, dividers
--color-bark:         #5C3D2A   /* hsl(23, 37%, 26%) */  ← body text
--color-night:        #1C1007   /* hsl(28, 56%, 7%)  */  ← dark mode background
```

#### Semantic

```
--color-success:      #4A7C59   /* Mossy green */
--color-warning:      #E8B84B   /* Reuse padi */
--color-danger:       #B84040   /* Faded red */
--color-info:         #4A5E91   /* Reuse cai-light */
```

### 3.2 Dark Mode Mapping

| Light token              | Dark equivalent     |
| ------------------------ | ------------------- |
| `--color-cream`          | `--color-night`     |
| `--color-parchment`      | `hsl(28, 30%, 13%)` |
| `--color-bark`           | `hsl(40, 30%, 85%)` |
| `--color-kulit` (border) | `hsl(30, 20%, 25%)` |

Dark mode should feel like reading by lamplight, not staring at a terminal.

---

## 4. Typography

### 4.1 Font Families

#### Display / Heading — _Lora_ (Serif)

```css
font-family: 'Lora', Georgia, serif;
```

A literary serif with ink-press character. Used for all page titles, section headings, story titles, and pull quotes. Lora carries the sense of a printed book — intentional and unhurried.

_Source: Google Fonts_

#### Body / UI — _Plus Jakarta Sans_

```css
font-family: 'Plus Jakarta Sans', sans-serif;
```

A contemporary Indonesian-designed sans-serif — geographically and culturally appropriate. Clean enough for long-form reading, distinct enough to avoid the generic trap.

_Source: Google Fonts_

#### Accent / Monospace (for metadata, tags, timestamps) — _DM Mono_

```css
font-family: 'DM Mono', monospace;
```

_Source: Google Fonts_

#### Optional: Sundanese Script Decoration

For purely decorative, non-interactive use (section dividers, hero overlays), consider rendering selected words in **Noto Sans Sundanese**:

```css
font-family: 'Noto Sans Sundanese', sans-serif;
```

Use sparingly. Never for body copy. Only as visual texture.

---

### 4.2 Type Scale

Base size: `16px`. Scale ratio: **Major Third (1.250)**.

```
--text-xs:    0.640rem   /* 10.24px — timestamps, captions */
--text-sm:    0.800rem   /* 12.80px — tags, labels, meta */
--text-base:  1.000rem   /* 16.00px — body */
--text-md:    1.250rem   /* 20.00px — lead paragraph, card titles */
--text-lg:    1.563rem   /* 25.00px — section subheadings */
--text-xl:    1.953rem   /* 31.25px — section headings */
--text-2xl:   2.441rem   /* 39.06px — page titles */
--text-3xl:   3.052rem   /* 48.83px — hero titles */
--text-4xl:   3.815rem   /* 61.04px — display / landing */
```

### 4.3 Type Usage Rules

- Story titles: Lora, `--text-2xl`, `font-weight: 700`, `--color-bark`
- Body text: Plus Jakarta Sans, `--text-base`, `font-weight: 400`, line-height `1.8`
- Section labels / overlines: DM Mono, `--text-sm`, uppercase, letter-spacing `0.12em`
- Pull quotes: Lora italic, `--text-lg`, `--color-tanah-dark`
- Card metadata: DM Mono, `--text-xs`, `--color-kulit`

---

## 5. Spacing & Layout

### 5.1 Spacing Scale

Base unit: `4px`.

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   24px
--space-6:   32px
--space-7:   48px
--space-8:   64px
--space-9:   96px
--space-10:  128px
```

### 5.2 Grid System

```
Max content width:     1200px
Wide content width:    1440px (hero, full-bleed sections)
Gutter (desktop):      32px
Gutter (mobile):       16px
Column count:          12
```

### 5.3 Layout Zones

The page is divided into five structural zones:

```
┌─────────────────────────────────────────────┐
│  TOPBAR (utility nav, lang toggle, auth)    │  height: 36px
├─────────────────────────────────────────────┤
│  NAVBAR (logo, main nav, search, CTA)       │  height: 72px (desktop)
├─────────────────────────────────────────────┤
│                                             │
│  CONTENT ZONE (varies per page)             │
│                                             │
├─────────────────────────────────────────────┤
│  PRE-FOOTER (newsletter, community CTA)     │
├─────────────────────────────────────────────┤
│  FOOTER (sitemap, credits, TBM info)        │
└─────────────────────────────────────────────┘
```

### 5.4 Border Radius

```
--radius-sm:   4px    /* tags, chips */
--radius-md:   8px    /* buttons, inputs */
--radius-lg:   16px   /* cards */
--radius-xl:   24px   /* modals, panels */
--radius-full: 9999px /* pills, avatars */
```

---

## 6. Page Templates

### 6.1 Home Page (`/`)

```
[Hero Section]
  Full-bleed illustrated background (batik motif overlay, low opacity)
  Large display heading: "Yuk, Ngadongeng."
  Sub-copy in Plus Jakarta Sans
  Two CTAs: "Jelajahi Cerita" (primary) / "Bagikan Dongengmu" (secondary)

[Featured Stories Strip]
  Horizontal scroll on mobile, 3-column grid on desktop
  Curated by TBM editors

[Category Showcase]
  4 large tiles: Cerita Teks / Buku Cerita Bergambar / Audio / Audiovisual
  Each with illustrated icon and count badge

[Community Voices]
  Grid of recent community-submitted stories
  Contributor avatar + name prominent

[About TBM Pabukon Ngadongeng]
  Two-column: text left, photo/illustration right
  Warm, human tone

[Pre-Footer CTA]
  "Punya Cerita? Bagikan Sekarang."
```

### 6.2 Story Archive (`/cerita`)

```
[Filter Bar]
  Category tabs (All / Teks / Buku Cerita Bergambar / Audio / Audiovisual)
  Sort: Terbaru / Terpopuler / A–Z
  Search input

[Story Grid]
  3-column (desktop) / 2-column (tablet) / 1-column (mobile)
  StoryCard components (see Section 7)

[Pagination]
  Numbered + prev/next
```

### 6.3 Story Detail (`/cerita/[slug]`)

```
[Story Header]
  Category tag + breadcrumb
  Title (Lora, large)
  Author block + publish date + read/listen time
  Cover image / comic thumbnail / audio player

[Story Body]
  For text: long-form prose, 68ch max-width, 1.8 line-height
  For comic: paginated image viewer
  For audio: embedded audio player with transcript accordion
  For audiovisual: embedded video player

[Story Meta Sidebar] (desktop: sticky right column)
  Tags, language, region, source attribution
  Share buttons

[Related Stories]
  3-card horizontal row

[Comments / Reactions]
  Simple emoji reaction bar + threaded comments
```

### 6.4 Contributor Profile (`/kontributor/[username]`)

```
[Profile Header]
  Avatar, display name, bio, badge (TBM Member / Komunitas)
  Story count, follower count (if applicable)

[Their Stories Grid]
  Same StoryCard layout
```

---

## 7. Component Library

### 7.1 Buttons

Three variants, three sizes.

#### Variant: Primary (Tanah)

```css
background: var(--color-tanah);
color: var(--color-cream);
border: none;
border-radius: var(--radius-md);
font-family: 'Plus Jakarta Sans', sans-serif;
font-weight: 600;
letter-spacing: 0.02em;

/* Hover */
background: var(--color-tanah-dark);
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(193, 98, 47, 0.35);
```

#### Variant: Secondary (Ghost Cai)

```css
background: transparent;
color: var(--color-cai);
border: 2px solid var(--color-cai);
border-radius: var(--radius-md);

/* Hover */
background: var(--color-cai);
color: var(--color-cream);
```

#### Variant: Soft (Parchment)

```css
background: var(--color-parchment);
color: var(--color-bark);
border: 1px solid var(--color-kulit);

/* Hover */
background: var(--color-kulit);
```

#### Sizes

```
sm:  padding 6px 14px,  font-size var(--text-sm)
md:  padding 10px 20px, font-size var(--text-base)  ← default
lg:  padding 14px 28px, font-size var(--text-md)
```

---

### 7.1a Status Badges (Story Workflow)

Used across dashboard, review panel, and admin to communicate story publication state.

| Status           | Shortcut           | Appearance                      |
| ---------------- | ------------------ | ------------------------------- |
| `draft`          | `status-draft`     | bark/10 bg, bark text           |
| `pending_review` | `status-pending`   | padi/30 bg, bark text           |
| `published`      | `status-published` | success/15 bg, success text     |
| `rejected`       | `status-rejected`  | danger/15 bg, danger text       |
| `archived`       | `status-archived`  | bark/8 bg, bark/55 text (muted) |

All status badges use: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`.

---

### 7.2 Story Card

The primary content unit across the platform.

```
┌─────────────────────────────┐
│  [Cover Image / Thumbnail]  │  aspect-ratio: 16/9
│  [Category Tag — top-left]  │  absolute positioned chip
├─────────────────────────────┤
│  [Format Icon] [Format]     │  e.g. 🎙 Audio · 12 min
│                             │
│  Story Title                │  Lora, --text-md, 2-line clamp
│  Short excerpt              │  Plus Jakarta Sans, --text-sm
│                             │
│  ──────────────────────     │
│  [Avatar] Contributor Name  │  left-aligned
│           2 hari lalu       │  DM Mono, --text-xs
└─────────────────────────────┘
```

**Card States:**

- Default: `box-shadow: 0 2px 8px rgba(92,61,42,0.08)`
- Hover: `transform: translateY(-4px); box-shadow: 0 12px 28px rgba(92,61,42,0.16)`
- Featured: golden left-border `4px solid var(--color-padi)` + slight `--color-parchment` background

---

### 7.2a Panel Card

The primary surface component for authenticated panel pages (dashboard, review, admin).

```css
/* Shortcut: panel-card */
background: var(--color-parchment);
border-radius: var(--radius-xl); /* 24px */
border: 1px solid rgba(196, 168, 130, 0.3); /* kulit/30 */
box-shadow: 0 1px 3px rgba(92, 61, 42, 0.08);
```

Distinct from `card` (used for public story cards) — `panel-card` has a larger radius and lighter border for the enclosed, form-like panel environment. Use `card-hover` for interactive public cards, `panel-card` for data tables, form sections, and stat containers.

---

### 7.3 Category Chip / Tag

```css
display: inline-flex;
align-items: center;
gap: 4px;
padding: 4px 10px;
border-radius: var(--radius-sm);
font-family: 'DM Mono', monospace;
font-size: var(--text-xs);
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.08em;
```

**Per-category color:**

| Category              | Background           | Text                 |
| --------------------- | -------------------- | -------------------- |
| Teks                  | `hsl(42, 40%, 88%)`  | `--color-bark`       |
| Buku Cerita Bergambar | `hsl(22, 50%, 88%)`  | `--color-tanah-dark` |
| Audio                 | `hsl(224, 30%, 88%)` | `--color-cai-dark`   |
| Audiovisual           | `hsl(28, 30%, 20%)`  | `--color-padi`       |

---

### 7.3a Typography Shortcuts

Three semantic typography shortcuts used across all pages:

| Shortcut     | Applies                                                    | Usage                              |
| ------------ | ---------------------------------------------------------- | ---------------------------------- |
| `heading`    | `font-display font-bold text-bark`                         | Page/section titles, stat numbers  |
| `label`      | `font-mono text-xs uppercase tracking-widest text-bark/60` | Table headers, overlines, metadata |
| `prose-body` | `font-sans text-base leading-[1.8] text-bark`              | Long-form body copy                |

> **Contrast note:** `label` uses `text-bark/60` (not `text-kulit`) to meet the 4.5:1 minimum contrast ratio against parchment and cream backgrounds.

---

### 7.4 Audio Player Component

Custom styled player (not browser default).

```
┌─────────────────────────────────────────────┐
│  [▶]  Judul Dongeng                         │
│  ──●─────────────────  02:14 / 18:40        │
│  [⏮] [⏪ 10s] [▶/⏸] [⏩ 10s] [🔊──●──]    │
│  [Transcript ▾]                             │
└─────────────────────────────────────────────┘
```

Background: `--color-parchment`, border: `1px solid --color-kulit`
Progress bar fill: `--color-tanah`
Thumb: circular, `--color-tanah-dark`, `12px` diameter

---

### 7.5 Section Divider / Motif

Between major sections, use a decorative SVG strip based on _Sunda wiwitan_ or batik _lereng_ motifs. Height `32–48px`, `--color-kulit` opacity 0.4. Not every section — use at most 2–3 per page.

---

### 7.6 Avatar

```css
border-radius:  var(--radius-full);
border:         2px solid var(--color-kulit);
object-fit:     cover;

/* Sizes */
sm:  28px × 28px
md:  40px × 40px
lg:  64px × 64px
xl:  96px × 96px
```

If no avatar is set, use a generated initial-based avatar with `--color-parchment` background and `--color-tanah` text.

---

### 7.7 Form Elements

#### Input / Textarea

```css
background: var(--color-cream);
border: 1.5px solid var(--color-kulit);
border-radius: var(--radius-md);
padding: 10px 14px;
font-family: 'Plus Jakarta Sans', sans-serif;
font-size: var(--text-base);
color: var(--color-bark);

/* Focus */
border-color: var(--color-tanah);
outline: 3px solid rgba(193, 98, 47, 0.2);
```

#### Select

Same as input, with custom `▾` chevron in `--color-bark`.

#### File Upload Zone (for story submission)

```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│   Drag & drop file here     │
│   or [Pilih File]           │
│                             │
│   Teks / Gambar / Audio /   │
│   Video — maks. 50MB        │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

Border: `2px dashed --color-kulit`. On drag-over: `--color-tanah-light` dashed border, light tanah background tint.

---

### 7.7a Panel Layout Component (`PanelLayout.svelte`)

A shared layout component used by all authenticated panel routes (dashboard, review, admin). Replaces per-route duplicated layout files.

**Props:**

| Prop              | Type        | Default        | Description                                |
| ----------------- | ----------- | -------------- | ------------------------------------------ |
| `title`           | `string`    | —              | Panel name shown in header breadcrumb      |
| `homeHref`        | `string`    | `'/'`          | Back-to-home link target                   |
| `accentClass`     | `string`    | `'bg-tanah'`   | Header background color class              |
| `accentTextClass` | `string`    | `'text-cream'` | Header text color class                    |
| `navItems`        | `NavItem[]` | —              | Sidebar/bottom-nav link list               |
| `actionLabel`     | `string?`   | —              | Optional CTA button label in header        |
| `actionHref`      | `string?`   | —              | Optional CTA button href                   |
| `children`        | `Snippet`   | —              | Main content slot (`{@render children()}`) |

**Accent colors per panel:**

| Panel     | `accentClass` | `accentTextClass` |
| --------- | ------------- | ----------------- |
| Dashboard | `bg-tanah`    | `text-cream`      |
| Review    | `bg-cai`      | `text-cream`      |
| Admin     | `bg-night`    | `text-cream`      |

Layout structure: sticky top header → two-column desktop (208px sidebar + content) → fixed bottom nav on mobile (`md:hidden`).

---

### 7.8 Navigation Bar

```
[Logo: Ngadongeng wordmark]   [Cerita] [Kontributor] [Tentang]    [🔍] [Masuk] [Bagikan Cerita ▶]
```

- Logo: Lora bold + small batik motif icon to the left
- Nav links: Plus Jakarta Sans, `--text-sm`, `font-weight: 500`
- Active link: `--color-tanah` with `2px` underline
- CTA button: Primary button variant
- Scroll behavior: sticky, slight `backdrop-filter: blur(8px)` + `--color-cream` at `92%` opacity when scrolled

Mobile: hamburger menu → full-height slide-in drawer from right.

---

### 7.9 Toast / Notification

```css
border-radius: var(--radius-md);
padding: 12px 16px;
font-family: 'Plus Jakarta Sans', sans-serif;
font-size: var(--text-sm);
box-shadow: 0 4px 16px rgba(28, 16, 7, 0.15);
```

Positioned bottom-right on desktop, bottom-center on mobile. Slide-up animation on enter, fade-out on exit.

---

### 7.10 Badge

Used on contributor profiles and story counts.

```
[TBM Member]  → --color-tanah bg, cream text
[Komunitas]   → --color-cai bg, cream text
[Kurator]     → --color-padi bg, bark text
[Baru]        → --color-success bg, cream text
```

---

### 7.11 Modal

```css
background: var(--color-cream);
border-radius: var(--radius-xl);
max-width: 560px;
padding: var(--space-7);
box-shadow: 0 20px 60px rgba(28, 16, 7, 0.3);
```

Overlay: `rgba(28,16,7,0.60)` with `backdrop-filter: blur(4px)`.

---

## 8. Iconography

Use **Phosphor Icons** (available as web font or SVG). They have a warm, slightly hand-crafted quality that suits the brand better than Heroicons or Lucide.

Recommended weight: `Regular` for UI, `Bold` for emphasis.

Custom illustrations (hero sections, empty states, onboarding) should use a flat-with-texture style — muted palette (parchment, tanah, padi), visible grain texture, inspired by Sundanese wayang or shadow-puppet silhouettes.

---

## 9. Illustration & Photography

### 9.1 Illustration Style

- Flat vector with subtle grain/noise overlay
- Sundanese vernacular references: wayang golek silhouettes, angklung motifs, rice fields, rumah panggung, bamboo
- Palette: always drawn from the brand color system, never arbitrary colors
- Never use stock clip art. Commission or generate illustrations that have a consistent illustrative voice.

### 9.2 Photography

- Warm color grading (+10 temperature, slight fade in shadows)
- Avoid harsh white backgrounds
- Preferred subjects: community reading activities, handwritten manuscripts, performance/storytelling, cultural objects
- Apply `mix-blend-mode: multiply` with a light parchment overlay on hero images to integrate them with the warm background

---

## 10. Motion & Animation

### 10.1 Principles

- **Unhurried** — nothing snaps. Easing is always ease-in-out or custom cubic-bezier
- **Purposeful** — animation communicates state change, not entertainment
- **Reduced** — respect `prefers-reduced-motion` by disabling all non-essential transitions

### 10.2 Duration Tokens

```
--duration-fast:    150ms   /* hover color changes */
--duration-base:    250ms   /* button press, tag hover */
--duration-slow:    400ms   /* card hover lift, modal open */
--duration-slower:  600ms   /* page transition, hero load */
```

### 10.3 Easing

```css
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-enter: cubic-bezier(0, 0, 0.2, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* playful spring */
```

### 10.4 Key Animations

- **Page enter:** content fades up `translateY(12px) → 0`, opacity `0 → 1`, staggered `50ms` per card
- **Card hover:** `translateY(-4px)` + shadow deepens, `--duration-base`
- **Audio player progress:** smooth `width` transition, `--duration-fast`
- **Modal:** scale `0.95 → 1` + fade, `--duration-slow`, `--ease-spring`

---

## 11. Responsive Breakpoints

```
--bp-sm:   480px    /* Large phone */
--bp-md:   768px    /* Tablet portrait */
--bp-lg:   1024px   /* Tablet landscape / small desktop */
--bp-xl:   1280px   /* Desktop */
--bp-2xl:  1536px   /* Large desktop */
```

Mobile-first approach. Design primary experience for `320–480px` range — many Indonesian community library users will access via mid-range Android phones.

---

## 12. Content Taxonomy

Understanding this helps design the filtering, tagging, and navigation systems.

### 12.1 Format Types

| ID                      | Label                 | Icon | Description                        |
| ----------------------- | --------------------- | ---- | ---------------------------------- |
| `teks`                  | Cerita Teks           | 📖   | Written prose or poetry            |
| `buku-cerita-bergambar` | Buku Cerita Bergambar | 🎨   | Sequential art / illustrated story |
| `audio`                 | Audio                 | 🎙   | Narrated recording, podcast-style  |
| `audiovisual`           | Audiovisual           | 🎬   | Video, animation, or film          |

### 12.2 Story Origin Tags

`Cerita Rakyat` · `Legenda` · `Mite` · `Fabel` · `Dongeng Anak` · `Pantun` · `Guguritan`

### 12.3 Language / Dialect

`Bahasa Sunda` · `Sunda Buhun` · `Indonesia` · `Dwibahasa`

### 12.4 Region / Tatar

`Tatar Sunda (Umum)` · `Priangan` · `Banten` · `Cirebon` · `Pesisir Utara` · `Melayu-Sunda`

---

## 13. Voice & Writing Style

- **Bahasa Indonesia:** warmly formal. Think a thoughtful librarian, not a bureaucrat.
- **Bahasa Sunda:** use for decorative moments, headings when appropriate, and TBM-related official content.
- **CTA copy:** active, inviting, non-pushy. "Bagikan Ceritamu" not "Upload Sekarang!"
- **Error messages:** human and calm. "Aduh, sepertinya ada masalah. Coba lagi sebentar." not "Error 500."
- **Empty states:** use a small illustration + an encouraging line. Never just "No results."

---

## 14. Accessibility

- Minimum contrast ratio: **4.5:1** for body text, **3:1** for large text and UI elements
- All interactive elements must be keyboard-navigable with visible `:focus-visible` rings using `--color-tanah` at `3px` offset
- Audio and video content must have transcript/subtitle options (core to the platform's archive mission)
- Form fields must have explicit `<label>` elements, never placeholder-only
- Decorative Sundanese script / motifs must have `aria-hidden="true"`

---

## 15. Tech Notes for Implementation

The brand system is implemented with **SvelteKit 2 + Svelte 5 (runes)** and **UnoCSS `presetWind3`**.

### 15.1 Token Mapping

All brand tokens are defined in `uno.config.ts` under `theme.colors`, `theme.fontFamily`, `theme.fontSize`, `theme.borderRadius`, and `theme.spacing`. Use UnoCSS utility classes (`bg-tanah`, `text-bark`, `rounded-xl`, etc.) — do **not** use raw hex values in component files.

### 15.2 UnoCSS Shortcuts Reference

Key shortcuts in `uno.config.ts`:

```
# Buttons
btn, btn-sm, btn-md, btn-lg
btn-primary   → bg-tanah text-cream hover:bg-tanah-dark
btn-secondary → ghost cai border
btn-soft      → bg-parchment text-bark border-kulit

# Cards / Surfaces
card          → public story cards (rounded-lg)
card-hover    → card + lift-on-hover
panel-card    → authenticated panel surfaces (rounded-xl, kulit/30 border)

# Status badges
status-draft / status-pending / status-published / status-rejected / status-archived

# Category chips
chip-teks / chip-buku-cerita-bergambar / chip-audio / chip-av

# Typography
heading       → font-display font-bold text-bark
label         → font-mono text-xs uppercase tracking-widest text-bark/60
prose-body    → font-sans text-base leading-[1.8] text-bark

# Layout
container-sm  → max-w-[720px] mx-auto px-4 md:px-8
container-md  → max-w-[1200px] mx-auto px-4 md:px-8
container-wide → max-w-[1440px] mx-auto px-4 md:px-8

# Form
input-base    → full-width cream bg, kulit border, tanah focus ring
```

### 15.3 Svelte 5 Conventions

- **Props:** `$props()` runes only. No `export let`.
- **Children:** `{@render children()}`. No `<slot>`.
- **Events:** callback props (`onclick`). No `on:click`.
- **Icons:** Phosphor Icons via `i-ph-*` classes (UnoCSS `presetIcons`).

### 15.4 Component Naming

Use Sundanese-inspired names: `DongengCard`, `PanelLayout`, `PamariksaBar` (filter bar), `TatarBadge` (region badge).

### 15.5 Fonts

Loaded in `app.html` via Google Fonts `<link>` with `display=swap`: Lora, Plus Jakarta Sans, DM Mono.

---

_Last updated: May 2026 — TBM Pabukon Ngadongeng × Ngadongeng Platform_
