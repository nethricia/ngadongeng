// ─── Content Taxonomy ────────────────────────────────────────────────────────

export type DongengFormat = 'teks' | 'komik' | 'audio' | 'audiovisual';

export type DongengCategory =
	| 'binatang'
	| 'dewa-dewi'
	| 'manusia'
	| 'asal-usul'
	| 'sejarah'
	| 'jenaka'
	| 'legenda';

export type DongengGenre =
	| 'fabel'
	| 'legenda'
	| 'mite'
	| 'sage'
	| 'dongeng-anak'
	| 'pantun'
	| 'guguritan'
	| 'parabel'
	| 'lainnya';

export type DongengLanguage =
	| 'sunda'
	| 'sunda-buhun'
	| 'indonesia'
	| 'sunda-indonesia'
	| 'dwibahasa';

export type DongengRegion =
	| 'priangan'
	| 'banten'
	| 'cirebon'
	| 'pesisir-utara'
	| 'sunda-umum'
	| 'melayu-sunda';

export type ContributorRole = 'tbm' | 'komunitas' | 'kurator' | 'individu';

// ─── Media ───────────────────────────────────────────────────────────────────

export type MediaKind = 'teks' | 'komik' | 'audio' | 'audiovisual';

/** Komik is always an embedded document: a Drive PDF, a direct .pdf URL, or a Canva design. */
export type KomikSource = 'gdrive' | 'pdf' | 'canva' | 'other';

/** Audio is either an embeddable widget (iframe) or a direct file (native <audio>). */
export type AudioSource = 'soundcloud' | 'spotify' | 'archive' | 'gdrive' | 'direct';

/** Audiovisual is either an embeddable player (iframe) or a direct file (native <video>). */
export type VideoSource = 'youtube' | 'vimeo' | 'gdrive' | 'direct' | 'other';

/**
 * One embedded medium attached to a story. A story may carry several at once.
 * The `teks` body is NOT stored here — it lives in `stories.content`.
 */
export type StoryMedia =
	| { kind: 'komik'; source: KomikSource; url: string }
	| { kind: 'audio'; source: AudioSource; url: string; transcript?: string }
	| { kind: 'audiovisual'; source: VideoSource; url: string; posterUrl?: string };

export type DongengStatus =
	| 'draft'
	| 'pending_review'
	| 'needs_revision'
	| 'published'
	| 'rejected'
	| 'archived';

export type UserRole = 'reader' | 'contributor' | 'admin' | 'superadmin';

// ─── Data Models ─────────────────────────────────────────────────────────────

export interface Contributor {
	username: string;
	displayName: string;
	avatarUrl?: string;
	role: ContributorRole;
	bio?: string;
	storyCount: number;
	joinedAt: string; // ISO date string
}

export interface DongengStory {
	id: string;
	slug: string;
	title: string;
	excerpt?: string;
	coverUrl?: string;
	/** Primary medium — the headline for cards and the dashboard/review tables. */
	format: DongengFormat;
	/** Every medium this story contains, in canonical order. Drives the format filter. */
	formats: DongengFormat[];
	/** Embedded media to render on the detail page, in canonical order. */
	media: StoryMedia[];
	category: DongengCategory;
	genre: DongengGenre;
	language: DongengLanguage;
	region: DongengRegion;
	duration?: string; // e.g. '12 menit', '8 halaman'
	author: Pick<Contributor, 'username' | 'displayName' | 'avatarUrl' | 'role'>;
	publishedAt: string; // ISO date string
	featured?: boolean;
	viewCount?: number;
	synopsis?: string;
	moralMessage?: string;
	// Rich content (for detail page)
	bodyText?: string; // for teks format
	tags?: string[];
	sourceRef?: string; // original source attribution
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export type BadgeType = 'tbm' | 'komunitas' | 'kurator' | 'individu' | 'baru' | 'unggulan';

export type ButtonVariant = 'primary' | 'secondary' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

// ─── Filter State ─────────────────────────────────────────────────────────────

export interface FilterState {
	format: DongengFormat | 'semua';
	category: DongengCategory | 'semua';
	language: DongengLanguage | 'semua';
	sort: 'terbaru' | 'terpopuler' | 'az';
	query: string;
}
