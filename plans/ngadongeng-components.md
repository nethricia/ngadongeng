# Ngadongeng — Component Library Specification

> Reference for all SvelteKit components using UnoCSS tokens defined in `uno.config.ts`.
> All shortcut classes (`btn-primary`, `card`, etc.) reference the brand token system.
> Components are listed in order of abstraction: primitives → composites → page sections.

---

## Conventions

- **File location:** `src/lib/components/` — UI primitives in `ui/`, feature components at root
- **Props:** typed with TypeScript interfaces, always exported
- **Slots:** used for content projection; documented with `<slot>` annotations
- **Events:** forwarded via `createEventDispatcher` or native `on:` forwarding where applicable
- **Accessibility:** every interactive component documents required ARIA attributes

---

## 1. Primitives

---

### 1.1 `Button.svelte`

**Path:** `src/lib/components/ui/Button.svelte`

**Props:**

```ts
interface Props {
	variant?: 'primary' | 'secondary' | 'soft'; // default: 'primary'
	size?: 'sm' | 'md' | 'lg'; // default: 'md'
	href?: string; // renders as <a> if set
	type?: 'button' | 'submit' | 'reset'; // default: 'button'
	disabled?: boolean; // default: false
	loading?: boolean; // shows spinner, disables interaction
	fullWidth?: boolean; // default: false
}
```

**Slots:** default (button label), `icon-left`, `icon-right`

**UnoCSS classes:**

```
variant=primary  → btn-primary
variant=secondary → btn-secondary
variant=soft     → btn-soft
size=sm          → btn-sm (override padding/font on btn base)
size=lg          → btn-lg
fullWidth        → w-full
disabled         → opacity-50 cursor-not-allowed pointer-events-none
loading          → [spinner icon replaces icon-left slot]
```

**Usage:**

```svelte
<Button variant="primary" size="md" href="/cerita">Jelajahi Cerita</Button>

<Button variant="secondary" loading={isSubmitting} type="submit">Bagikan Dongeng</Button>
```

**Accessibility:** forwards all native button attributes; uses `aria-disabled` when `disabled`; loading state adds `aria-busy="true"`.

---

### 1.2 `Chip.svelte`

**Path:** `src/lib/components/ui/Chip.svelte`

**Props:**

```ts
interface Props {
	format: 'teks' | 'buku-cerita-bergambar' | 'audio' | 'audiovisual';
	label?: string; // overrides default format label
}
```

**Format label defaults:** `teks → Teks`, `buku-cerita-bergambar → Buku Cerita Bergambar`, `audio → Audio`, `audiovisual → Audiovisual`

**UnoCSS classes:**

```
teks        → chip-teks
buku-cerita-bergambar       → chip-buku-cerita-bergambar
audio       → chip-audio
audiovisual → chip-av
```

**Usage:**

```svelte
<Chip format="audio" />
<Chip format="teks" label="Cerita Teks" />
```

---

### 1.3 `Avatar.svelte`

**Path:** `src/lib/components/ui/Avatar.svelte`

**Props:**

```ts
interface Props {
	src?: string; // image URL; if absent, renders initials
	name: string; // used for alt text and initials fallback
	size?: 'sm' | 'md' | 'lg' | 'xl'; // default: 'md'
	badge?: 'tbm' | 'komunitas' | 'kurator'; // optional role badge overlay
}
```

**Sizes:**

```
sm  → w-7 h-7 text-xs
md  → w-10 h-10 text-sm
lg  → w-16 h-16 text-base
xl  → w-24 h-24 text-lg
```

**Fallback initials:** takes first letter of each word in `name`, max 2 characters. Background `bg-parchment`, text `text-tanah`.

**Usage:**

```svelte
<Avatar src="/foto/evi.jpg" name="Evi Rukmana" size="lg" badge="tbm" />
<Avatar name="Chrisna Adhi" size="md" />
```

---

### 1.4 `Badge.svelte`

**Path:** `src/lib/components/ui/Badge.svelte`

**Props:**

```ts
interface Props {
	type: 'tbm' | 'komunitas' | 'kurator' | 'baru' | 'unggulan';
	label?: string; // overrides default label
}
```

**Default labels and styles:**

| type        | Label      | BG             | Text         |
| ----------- | ---------- | -------------- | ------------ |
| `tbm`       | TBM Member | `bg-tanah`     | `text-cream` |
| `komunitas` | Komunitas  | `bg-cai`       | `text-cream` |
| `kurator`   | Kurator    | `bg-padi`      | `text-bark`  |
| `baru`      | Baru       | `bg-success`   | `text-cream` |
| `unggulan`  | Unggulan   | `bg-padi-dark` | `text-cream` |

**UnoCSS base:** `inline-flex items-center px-2.5 py-0.5 rounded-full font-sans font-semibold text-xs`

---

### 1.5 `Input.svelte`

**Path:** `src/lib/components/ui/Input.svelte`

**Props:**

```ts
interface Props {
	label: string;
	id: string;
	type?: string; // default: 'text'
	placeholder?: string;
	value?: string;
	error?: string; // shows validation message below
	hint?: string; // shows helper text below (hidden when error present)
	required?: boolean;
	disabled?: boolean;
}
```

**Structure:**

```
<label for={id}>                  ← font-sans text-sm font-medium text-bark
  {label} [*]                     ← asterisk if required
  <input id={id} />               ← input-base shortcut
  <span class="error">            ← text-danger text-xs mt-1 (if error)
  <span class="hint">             ← text-kulit text-xs mt-1 (if hint, no error)
```

**Usage:**

```svelte
<Input
	label="Judul Dongeng"
	id="judul"
	placeholder="Contoh: Si Kabayan dan Buaya"
	required
	error={errors.judul}
/>
```

---

### 1.6 `Textarea.svelte`

Same API as `Input.svelte` with additional:

```ts
rows?: number  // default: 5
resize?: 'none' | 'vertical' | 'both'  // default: 'vertical'
```

UnoCSS: extends `input-base` with `resize-y min-h-[120px]`.

---

### 1.7 `Select.svelte`

**Props:**

```ts
interface Props {
	label: string;
	id: string;
	options: Array<{ value: string; label: string }>;
	value?: string;
	placeholder?: string; // renders as disabled first option
	error?: string;
	required?: boolean;
}
```

Custom chevron via CSS `background-image` using an inline SVG in `--color-bark`.

---

### 1.8 `FileUpload.svelte`

**Path:** `src/lib/components/ui/FileUpload.svelte`

**Props:**

```ts
interface Props {
	accept: string; // e.g. 'image/*,application/pdf'
	maxSizeMB?: number; // default: 50
	label?: string;
	hint?: string;
	multiple?: boolean;
}
```

**Events:** `on:change` with `{ files: FileList }`

**States:**

- Default: dashed border `border-2 border-dashed border-kulit`, centered icon + text
- Drag over: `border-tanah-light bg-tanah/5` tint
- File selected: shows filename, size, remove button
- Error: `border-danger`, error message below

**Structure:**

```
<div class="upload-zone">
  <i class="i-ph-upload-simple" />
  <p>Seret & lepas file di sini</p>
  <p>atau <span>Pilih File</span></p>
  <p class="hint">{hint} — maks. {maxSizeMB}MB</p>
  <input type="file" class="sr-only" />
```

---

### 1.9 `Toast.svelte` + `toastStore.ts`

**Path:** `src/lib/components/ui/Toast.svelte`, `src/lib/stores/toast.ts`

**Store API:**

```ts
// src/lib/stores/toast.ts
import { writable } from 'svelte/store'

export type ToastType = 'success' | 'danger' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number  // ms, default 4000
}

export const toasts = writable<Toast[]>([])

export function addToast(toast: Omit<Toast, 'id'>) { ... }
export function removeToast(id: string) { ... }
```

**Usage in any component:**

```svelte
import { addToast } from '$lib/stores/toast'
addToast({ type: 'success', message: 'Dongeng berhasil disimpan!' })
```

**Toast container** is placed once in `+layout.svelte`, fixed `bottom-4 right-4` (desktop) / `bottom-4 inset-x-4` (mobile). Each toast slides up on enter, fades on exit.

---

### 1.10 `Modal.svelte`

**Path:** `src/lib/components/ui/Modal.svelte`

**Props:**

```ts
interface Props {
	open: boolean;
	title?: string;
	size?: 'sm' | 'md' | 'lg'; // default: 'md'
	closable?: boolean; // default: true
}
```

**Sizes:** `sm → max-w-sm`, `md → max-w-lg`, `lg → max-w-2xl`

**Slots:** default (body), `footer`

**Events:** `on:close`

**Behavior:** closes on Escape key, on overlay click (if `closable`). Focus trapped inside while open. Body scroll locked via `overflow-hidden` on `<body>`.

**Overlay:** `fixed inset-0 bg-night/60 backdrop-blur-sm z-50`

---

### 1.11 `Spinner.svelte`

Simple SVG circle spinner.

```ts
interface Props {
	size?: number; // px, default: 20
	color?: string; // CSS color, default: 'currentColor'
}
```

Used inline inside `Button` when `loading={true}`.

---

## 2. Feature Components

---

### 2.1 `DongengCard.svelte`

**Path:** `src/lib/components/DongengCard.svelte`

The primary content unit of the platform.

**Props:**

```ts
interface DongengCardProps {
	id: string;
	slug: string;
	title: string;
	excerpt?: string;
	coverUrl?: string; // fallback: generated gradient by format type
	format: 'teks' | 'buku-cerita-bergambar' | 'audio' | 'audiovisual';
	category: 'binatang' | 'dewa-dewi' | 'manusia' | 'asal-usul';
	duration?: string; // e.g. '12 menit' for audio, '8 halaman' for buku-cerita-bergambar
	author: {
		name: string;
		avatarUrl?: string;
		role: 'tbm' | 'komunitas' | 'kurator';
	};
	publishedAt: string; // ISO date string
	featured?: boolean; // default: false
	viewCount?: number;
}
```

**Structure:**

```
<a href="/cerita/{slug}" class="card-hover block rounded-lg overflow-hidden">

  <!-- Cover -->
  <div class="relative aspect-video bg-parchment">
    <img src={coverUrl} alt={title} class="w-full h-full object-cover" />
    <div class="absolute top-3 left-3">
      <Chip format={format} />
    </div>
    {#if featured}
      <div class="absolute top-3 right-3">
        <Badge type="unggulan" />
      </div>
    {/if}
  </div>

  <!-- Body -->
  <div class="p-5">
    <p class="label mb-2">{category label} · {duration}</p>
    <h3 class="heading text-md line-clamp-2 mb-2">{title}</h3>
    {#if excerpt}
      <p class="prose-body text-sm line-clamp-2 text-bark/70 mb-4">{excerpt}</p>
    {/if}

    <!-- Footer -->
    <div class="flex items-center justify-between border-t border-kulit/30 pt-3">
      <div class="flex items-center gap-2">
        <Avatar name={author.name} src={author.avatarUrl} size="sm" />
        <div>
          <p class="font-sans text-xs font-medium text-bark">{author.name}</p>
          <p class="font-mono text-xs text-kulit">{relative date}</p>
        </div>
      </div>
      {#if viewCount}
        <p class="font-mono text-xs text-kulit flex items-center gap-1">
          <i class="i-ph-eye" /> {viewCount}
        </p>
      {/if}
    </div>
  </div>
</a>
```

**Featured variant:** adds `border-l-4 border-padi bg-padi/5` to the card container.

**Cover fallback gradients by format:**

```ts
const fallbacks = {
	teks: 'from-parchment to-kulit/40',
	buku-cerita-bergambar: 'from-tanah/20 to-parchment',
	audio: 'from-cai/20 to-parchment',
	audiovisual: 'from-night/80 to-cai-dark/60'
};
```

---

### 2.2 `DongengCardHorizontal.svelte`

Landscape variant used in search results and "Cerita Terkait" rows.

**Props:** same as `DongengCard`, minus `excerpt`.

**Structure:** `flex-row`, cover is `w-32 h-24 flex-shrink-0` (fixed), body fills remaining width.

---

### 2.3 `AudioPlayer.svelte`

**Path:** `src/lib/components/AudioPlayer.svelte`

Custom audio player — never use browser default `<audio controls>`.

**Props:**

```ts
interface Props {
	src: string;
	title: string;
	transcript?: string; // raw text; shown in collapsible accordion below player
	duration?: number; // seconds, for display before load
}
```

**Structure:**

```
<div class="bg-parchment border border-kulit rounded-lg p-5">

  <!-- Top row: title + time -->
  <div class="flex justify-between items-center mb-3">
    <p class="heading text-sm">{title}</p>
    <span class="font-mono text-xs text-kulit">{currentTime} / {totalDuration}</span>
  </div>

  <!-- Waveform placeholder / progress bar -->
  <div class="relative h-1.5 bg-kulit/30 rounded-full mb-4 cursor-pointer">
    <div class="h-full bg-tanah rounded-full" style="width: {progress}%" />
    <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-tanah-dark shadow"
         style="left: {progress}%" />
  </div>

  <!-- Controls -->
  <div class="flex items-center justify-center gap-5">
    <button on:click={skipBack}>   <i class="i-ph-skip-back" />   </button>
    <button on:click={rewind10}>   <i class="i-ph-rewind" />  -10s </button>
    <button on:click={togglePlay} class="w-12 h-12 rounded-full bg-tanah text-cream flex-center">
      <i class={playing ? 'i-ph-pause' : 'i-ph-play'} />
    </button>
    <button on:click={forward10}>  <i class="i-ph-fast-forward" /> +10s </button>
    <div class="flex items-center gap-2 ml-auto">
      <i class="i-ph-speaker-high" />
      <input type="range" min="0" max="1" step="0.1" bind:value={volume} />
    </div>
  </div>

  <!-- Transcript accordion -->
  {#if transcript}
    <details class="mt-4 border-t border-kulit/30 pt-4">
      <summary class="label cursor-pointer select-none">Transkrip ▾</summary>
      <p class="prose-body text-sm mt-3 whitespace-pre-wrap">{transcript}</p>
    </details>
  {/if}

</div>
```

**State:** uses `<audio bind:this={audioEl}>` hidden element; all controls are programmatic.

---

### 2.4 `ComicViewer.svelte`

**Path:** `src/lib/components/ComicViewer.svelte`

Paginated image viewer for comic format stories.

**Props:**

```ts
interface Props {
	pages: Array<{ url: string; alt?: string }>;
	title: string;
}
```

**Structure:**

```
<div class="relative bg-night rounded-lg overflow-hidden">
  <!-- Page display -->
  <img src={pages[current].url} alt={pages[current].alt} class="w-full" />

  <!-- Navigation overlay -->
  <button class="absolute left-0 inset-y-0 w-1/3 cursor-w-resize" on:click={prev} />
  <button class="absolute right-0 inset-y-0 w-1/3 cursor-e-resize" on:click={next} />

  <!-- Page indicator -->
  <div class="absolute bottom-4 inset-x-0 flex justify-center gap-2">
    {#each pages as _, i}
      <span class="w-2 h-2 rounded-full transition-colors duration-base"
            class:bg-cream={i === current}
            class:bg-cream/30={i !== current} />
    {/each}
  </div>
</div>

<!-- Thumbnail strip -->
<div class="flex gap-2 mt-3 overflow-x-auto pb-2">
  {#each pages as page, i}
    <button on:click={() => current = i}>
      <img src={page.url} class="w-14 h-14 object-cover rounded border-2 transition-colors"
           class:border-tanah={i === current}
           class:border-transparent={i !== current} />
    </button>
  {/each}
</div>
```

**Keyboard:** left/right arrow keys navigate pages when viewer is focused.

---

### 2.5 `VideoPlayer.svelte`

Wrapper around native `<video>` with custom control bar overlay. Hides native controls (`controls={false}`). Uses the same visual language as `AudioPlayer`.

**Props:**

```ts
interface Props {
	src: string;
	poster?: string;
	title: string;
	subtitleSrc?: string; // WebVTT .vtt file URL
}
```

**Features:** play/pause, scrub bar (`--color-tanah` fill), volume, fullscreen, subtitle toggle.

---

### 2.6 `Navbar.svelte`

**Path:** `src/lib/components/Navbar.svelte`

**Props:**

```ts
interface Props {
	transparent?: boolean; // for hero sections — no bg until scroll
}
```

**Structure:**

```
<header class="sticky top-0 z-40 transition-all duration-slow"
        class:bg-cream/90={scrolled || !transparent}
        class:backdrop-blur-md={scrolled}>

  <div class="container-md flex items-center h-18 gap-8">

    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 flex-shrink-0">
      <img src="/logo-mark.svg" alt="" class="w-8 h-8" aria-hidden="true" />
      <span class="font-display font-bold text-md text-bark">Ngadongeng</span>
    </a>

    <!-- Desktop nav -->
    <nav class="hidden md:flex items-center gap-6 flex-1" aria-label="Navigasi utama">
      <a href="/cerita">Cerita</a>
      <a href="/kontributor">Kontributor</a>
      <a href="/tentang">Tentang</a>
    </nav>

    <!-- Actions -->
    <div class="ml-auto flex items-center gap-3">
      <button aria-label="Cari cerita" class="i-ph-magnifying-glass text-xl text-bark" />
      <a href="/masuk" class="btn-soft btn-sm">Masuk</a>
      <a href="/cerita/baru" class="btn-primary btn-sm hidden md:inline-flex">
        Bagikan Cerita
      </a>
      <!-- Mobile hamburger -->
      <button class="md:hidden i-ph-list text-2xl text-bark" aria-label="Menu" />
    </div>

  </div>
</header>
```

**Mobile drawer:** slides in from right; full-height overlay with same nav links + auth actions. Close button top-right. Animates via `translate-x-full → translate-x-0`.

**Active link:** detected via SvelteKit `$page.url.pathname`. Active = `text-tanah font-semibold` + `2px underline offset-4`.

---

### 2.7 `Footer.svelte`

**Path:** `src/lib/components/Footer.svelte`

**Structure:**

```
<footer class="bg-bark text-cream/80 font-sans">

  <!-- Main grid -->
  <div class="container-md py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

    <!-- Brand column -->
    <div class="md:col-span-2">
      <img src="/logo-mark-light.svg" class="w-8 h-8 mb-3" />
      <p class="font-display font-bold text-lg text-cream mb-2">Ngadongeng</p>
      <p class="text-sm leading-relaxed text-cream/60 max-w-sm">
        Platform berbagi dongeng dan cerita rakyat Sunda.
        Dikelola oleh TBM Pabukon Ngadongeng, Sumedang.
      </p>
    </div>

    <!-- Links: Jelajahi -->
    <div>
      <h4 class="label text-cream/40 mb-4">Jelajahi</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/cerita">Semua Cerita</a></li>
        <li><a href="/cerita?format=teks">Cerita Teks</a></li>
        <li><a href="/cerita?format=buku-cerita-bergambar">Buku Cerita Bergambar</a></li>
        <li><a href="/cerita?format=audio">Audio</a></li>
        <li><a href="/cerita?format=audiovisual">Audiovisual</a></li>
      </ul>
    </div>

    <!-- Links: Tentang -->
    <div>
      <h4 class="label text-cream/40 mb-4">Tentang</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/tentang">Tentang Kami</a></li>
        <li><a href="/tentang#pabukon">TBM Pabukon</a></li>
        <li><a href="/kontribusi">Cara Berkontribusi</a></li>
        <li><a href="/kebijakan">Kebijakan Privasi</a></li>
        <li><a href="/kontak">Kontak</a></li>
      </ul>
    </div>

  </div>

  <!-- Bottom bar -->
  <div class="border-t border-cream/10">
    <div class="container-md py-5 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/40">
      <p>© 2024 TBM Pabukon Ngadongeng. Konten dilisensikan CC BY-NC-SA 4.0.</p>
      <p>Dibuat dengan ❤ dari Sumedang, Jawa Barat.</p>
    </div>
  </div>

</footer>
```

---

### 2.8 `SearchBar.svelte`

**Path:** `src/lib/components/SearchBar.svelte`

**Props:**

```ts
interface Props {
	placeholder?: string; // default: 'Cari dongeng, tokoh, atau cerita...'
	autofocus?: boolean;
	size?: 'sm' | 'md' | 'lg';
}
```

**Events:** `on:search` with `{ query: string }`, `on:clear`

**Structure:**

```
<div class="relative">
  <i class="i-ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-kulit" />
  <input
    type="search"
    class="input-base pl-10 pr-10"
    placeholder={placeholder}
    bind:value={query}
    on:input={handleInput}
  />
  {#if query}
    <button on:click={clear}
      class="absolute right-3 top-1/2 -translate-y-1/2 i-ph-x text-kulit" />
  {/if}
</div>
```

Debounced 300ms on input before dispatching `on:search`.

---

### 2.9 `FilterBar.svelte`

**Path:** `src/lib/components/FilterBar.svelte`

Used on the `/cerita` archive page.

**Props:**

```ts
interface Props {
	activeFormat?: string; // 'semua' | 'teks' | 'buku-cerita-bergambar' | 'audio' | 'audiovisual'
	activeSort?: string; // 'terbaru' | 'terpopuler' | 'az'
	activeCategory?: string; // 'semua' | 'binatang' | 'dewa-dewi' | 'manusia' | 'asal-usul'
}
```

**Events:** `on:change` with `{ format, sort, category }`

**Structure:**

```
<div class="flex flex-wrap gap-3 items-center">
  <!-- Format tabs -->
  <div class="flex gap-1 bg-parchment p-1 rounded-md" role="tablist">
    {#each formats as f}
      <button role="tab" aria-selected={activeFormat === f.value}
        class:bg-cream={activeFormat === f.value}
        class:shadow-sm={activeFormat === f.value}
        class="px-3 py-1.5 rounded text-sm font-sans font-medium transition-all">
        {f.label}
      </button>
    {/each}
  </div>

  <!-- Category select -->
  <Select options={categories} bind:value={activeCategory} label="" id="kategori" />

  <!-- Sort select -->
  <Select options={sorts} bind:value={activeSort} label="" id="urutan" />
</div>
```

---

### 2.10 `ContributorCard.svelte`

**Path:** `src/lib/components/ContributorCard.svelte`

**Props:**

```ts
interface Props {
	username: string;
	displayName: string;
	avatarUrl?: string;
	role: 'tbm' | 'komunitas' | 'kurator';
	bio?: string;
	storyCount: number;
	joinedAt: string;
}
```

**Structure:**

```
<a href="/kontributor/{username}" class="card-hover p-5 flex flex-col items-center text-center gap-3">
  <Avatar name={displayName} src={avatarUrl} size="lg" />
  <Badge type={role} />
  <div>
    <p class="heading text-base">{displayName}</p>
    {#if bio}
      <p class="prose-body text-sm text-bark/60 mt-1 line-clamp-2">{bio}</p>
    {/if}
  </div>
  <p class="font-mono text-xs text-kulit">{storyCount} cerita</p>
</a>
```

---

### 2.11 `ReactionBar.svelte`

Simple emoji reaction row for story detail pages.

**Props:**

```ts
interface Props {
	storyId: string;
	reactions: Array<{ emoji: string; label: string; count: number; reacted: boolean }>;
}
```

**Reactions defined:** `❤️ Nyukcruk`, `👏 Sae Pisan`, `😄 Pikaseurieun`, `🤔 Pikir Heula`, `😢 Matak Sedih`

Each button: `bg-parchment hover:bg-padi/20 rounded-full px-3 py-1.5 text-sm flex items-center gap-1.5`. When `reacted=true`: `bg-padi/30 border border-padi font-semibold`.

---

### 2.12 `StoryForm.svelte`

**Path:** `src/lib/components/StoryForm.svelte`

Multi-step form for submitting a new dongeng. Manages its own step state.

**Steps:**

```
Step 1 — Informasi Dasar
  - Input: Judul Dongeng (required)
  - Select: Format (Teks / Buku Cerita Bergambar / Audio / Audiovisual)
  - Select: Kategori (Binatang / Dewa-Dewi / Manusia / Asal-Usul Tempat)
  - Select: Bahasa (Bahasa Sunda / Sunda Buhun / Indonesia / Dwibahasa)
  - Select: Tatar/Wilayah (dropdown of Tatar Sunda regions)
  - Textarea: Sinopsis / Ringkasan (max 300 karakter)

Step 2 — Konten Utama
  IF format=teks:    Textarea (rich text, markdown-rendered)
  IF format=buku-cerita-bergambar:   FileUpload (image/*, multiple, max 20 files)
  IF format=audio:   FileUpload (audio/*, single) + Textarea (transkrip)
  IF format=av:      FileUpload (video/*, single) + FileUpload (subtitle .vtt, optional)

Step 3 — Sampul & Metadata
  - FileUpload: Gambar Sampul (image/*, single, recommended 1280×720)
  - Input: Sumber Asli / Referensi (optional)
  - Input: Tags (comma-separated)
  - Checkbox: Saya menyatakan ini karya asli / adaptasi yang saya miliki haknya

Step 4 — Pratinjau & Kirim
  - Read-only preview of DongengCard
  - Summary of all filled fields
  - Submit Button
```

**Step indicator:**

```
[1]──[2]──[3]──[4]
Informasi · Konten · Sampul · Kirim
```

Active step: `bg-tanah text-cream`, completed step: `bg-tanah-dark text-cream`, future: `bg-parchment text-kulit`.

---

## 3. Section Components

---

### 3.1 `HeroSection.svelte`

**Path:** `src/lib/components/sections/HeroSection.svelte`

Full-bleed landing hero.

**Structure:**

```
<section class="relative min-h-[85vh] flex items-center overflow-hidden">

  <!-- Background: batik motif overlay -->
  <div class="absolute inset-0 bg-cream">
    <img src="/assets/batik-bg.svg" class="absolute inset-0 w-full h-full object-cover opacity-8" />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-cream/60" />
  </div>

  <!-- Content -->
  <div class="container-md relative z-10 py-20">
    <p class="label text-tanah mb-4">TBM Pabukon Ngadongeng</p>
    <h1 class="font-display font-bold text-4xl md:text-5xl text-bark leading-tight mb-6 max-w-2xl">
      Yuk, Ngadongeng.
    </h1>
    <p class="prose-body text-md text-bark/70 max-w-xl mb-10">
      Kumpulan dongeng dan cerita rakyat Sunda — dalam teks, buku-cerita-bergambar, audio, dan video.
      Dibuka untuk semua yang ingin berbagi cerita.
    </p>
    <div class="flex flex-wrap gap-4">
      <Button variant="primary" size="lg" href="/cerita">Jelajahi Cerita</Button>
      <Button variant="secondary" size="lg" href="/cerita/baru">Bagikan Dongengmu</Button>
    </div>

    <!-- Stats row -->
    <div class="flex gap-8 mt-16">
      <div>
        <p class="font-display font-bold text-2xl text-tanah">{totalCerita}+</p>
        <p class="label">Dongeng</p>
      </div>
      <div>
        <p class="font-display font-bold text-2xl text-tanah">{totalKontributor}+</p>
        <p class="label">Kontributor</p>
      </div>
      <div>
        <p class="font-display font-bold text-2xl text-tanah">{totalKegiatan}+</p>
        <p class="label">Kegiatan</p>
      </div>
    </div>
  </div>

</section>
```

---

### 3.2 `FeaturedStories.svelte`

**Path:** `src/lib/components/sections/FeaturedStories.svelte`

**Props:**

```ts
interface Props {
	stories: DongengCardProps[]; // 3–5 items
	title?: string;
}
```

Desktop: 3-column CSS grid. Mobile: horizontal scroll snap. Each item: `DongengCard` with `featured={true}` on first item.

---

### 3.3 `CategoryShowcase.svelte`

Four format category tiles in 2×2 grid (desktop) or vertical stack (mobile).

Each tile:

```
<a href="/cerita?format={format}" class="card-hover p-6 flex flex-col gap-4 min-h-[200px] relative overflow-hidden">
  <i class="i-ph-{icon} text-5xl text-tanah/20 absolute -right-2 -bottom-2" />
  <Chip format={format} />
  <h3 class="heading text-lg">{label}</h3>
  <p class="prose-body text-sm text-bark/60">{description}</p>
  <p class="font-mono text-xs text-kulit mt-auto">{count} cerita</p>
```

---

### 3.4 `StoryGrid.svelte`

**Props:**

```ts
interface Props {
	stories: DongengCardProps[];
	loading?: boolean;
	columns?: 2 | 3; // default: 3
}
```

CSS grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-{columns} gap-6`.

Loading state: renders 6 `SkeletonCard` placeholders (pulsing `bg-parchment` blocks, same aspect ratio as `DongengCard`).

Empty state: centered illustration + "Belum ada cerita di sini. Jadilah yang pertama berbagi!" + `<Button>`.

---

### 3.5 `AboutTBM.svelte`

Two-column section with TBM narrative text left, image/illustration right.

```
<section class="container-md py-16 grid md:grid-cols-2 gap-12 items-center">
  <div>
    <p class="label text-tanah mb-3">Tentang Kami</p>
    <h2 class="heading text-2xl mb-5">TBM Pabukon Ngadongeng</h2>
    <div class="prose-body space-y-4">...narrative...</div>
    <Button variant="soft" href="/tentang" class="mt-6">Selengkapnya</Button>
  </div>
  <div class="rounded-xl overflow-hidden">
    <img src="/assets/tbm-foto.jpg" class="w-full aspect-[4/3] object-cover" />
  </div>
</section>
```

---

### 3.6 `PreFooterCTA.svelte`

Full-width warm CTA section before footer.

```
<section class="bg-tanah text-cream py-16 text-center">
  <div class="container-md">
    <p class="font-display italic text-lg text-padi mb-3">
      "Carita hirup dina ucapan, abadi dina tulisan."
    </p>
    <h2 class="font-display font-bold text-3xl mb-5">
      Punya cerita? Bagikan sekarang.
    </h2>
    <p class="prose-body text-cream/80 max-w-md mx-auto mb-8">
      Siapa pun bisa berbagi dongeng di Ngadongeng.
      Daftar gratis dan mulai menulis, merekam, atau mengunggah hari ini.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <Button variant="soft" size="lg" href="/daftar">Buat Akun</Button>
      <Button variant="secondary" size="lg" href="/cerita">Baca Dulu</Button>
    </div>
  </div>
</section>
```

---

## 4. Layout Components

---

### 4.1 `+layout.svelte` (root)

```svelte
<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ToastContainer from '$lib/components/ui/ToastContainer.svelte';
</script>

<Navbar />
<main>
	<slot />
</main>
<Footer />
<ToastContainer />
```

---

### 4.2 `+layout.svelte` (auth routes `/masuk`, `/daftar`)

Minimal layout: no Navbar/Footer, centered card on `bg-cream`.

---

### 4.3 `+layout.svelte` (story detail `/cerita/[slug]`)

Two-column layout on desktop: `prose` column (65%) + sticky sidebar (35%). Single column on mobile.

```svelte
<div class="container-md py-10 grid lg:grid-cols-[1fr_300px] gap-10">
	<article>
		<slot name="content" />
	</article>
	<aside class="lg:sticky lg:top-24 self-start space-y-6">
		<slot name="sidebar" />
	</aside>
</div>
```

---

## 5. Utility Components

---

### 5.1 `SkeletonCard.svelte`

Shimmer placeholder while `DongengCard` data loads.

```
<div class="card overflow-hidden animate-pulse">
  <div class="aspect-video bg-kulit/30" />
  <div class="p-5 space-y-3">
    <div class="h-3 bg-kulit/30 rounded w-1/3" />
    <div class="h-5 bg-kulit/30 rounded w-4/5" />
    <div class="h-4 bg-kulit/20 rounded w-full" />
    <div class="h-4 bg-kulit/20 rounded w-2/3" />
    <div class="flex gap-2 mt-3 pt-3 border-t border-kulit/20">
      <div class="w-7 h-7 rounded-full bg-kulit/30" />
      <div class="h-3 bg-kulit/20 rounded w-24 mt-1" />
    </div>
  </div>
</div>
```

---

### 5.2 `Breadcrumb.svelte`

**Props:** `items: Array<{ label: string; href?: string }>`

```
<nav aria-label="Breadcrumb">
  <ol class="flex items-center gap-2 font-mono text-xs text-kulit">
    {#each items as item, i}
      {#if i > 0}<span aria-hidden>/</span>{/if}
      {#if item.href && i < items.length - 1}
        <li><a href={item.href} class="hover:text-tanah">{item.label}</a></li>
      {:else}
        <li aria-current="page" class="text-bark">{item.label}</li>
      {/if}
    {/each}
  </ol>
</nav>
```

---

### 5.3 `Pagination.svelte`

**Props:** `currentPage: number`, `totalPages: number`, `basePath: string`

Renders: `‹ Sebelumnya  [1] [2] [3] … [N]  Berikutnya ›`

Current page: `bg-tanah text-cream`. Others: `bg-parchment hover:bg-kulit/30`.

---

### 5.4 `MotifDivider.svelte`

Decorative SVG section divider using abstracted batik lereng motif.

**Props:** `flip?: boolean` (mirrors horizontally), `color?: string`

Height: `32px`. Used max 2–3 times per page at section breaks.

---

_End of Component Library — v1.0, May 2026_
