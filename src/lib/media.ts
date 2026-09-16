import type { AudioSource, KomikSource, MediaKind, StoryMedia, VideoSource } from '$lib/types';

/**
 * Everything needed to turn a stored StoryMedia entry into something renderable.
 *
 * This is the ONLY place embed URLs are assembled. Components must not build
 * provider URLs themselves — a contributor pastes whatever link their provider's
 * share button gave them (`/view?usp=sharing`, `youtu.be/...`, `/details/...`),
 * and normalisation happens here.
 */

// ─── Labels ──────────────────────────────────────────────────────────────────

export const KOMIK_SOURCE_LABELS: Record<KomikSource, string> = {
	gdrive: 'Google Drive (PDF)',
	pdf: 'Tautan PDF langsung',
	canva: 'Canva',
	other: 'Lainnya'
};

export const AUDIO_SOURCE_LABELS: Record<AudioSource, string> = {
	soundcloud: 'SoundCloud',
	spotify: 'Spotify',
	archive: 'Archive.org',
	gdrive: 'Google Drive',
	direct: 'Berkas audio langsung'
};

export const VIDEO_SOURCE_LABELS: Record<VideoSource, string> = {
	youtube: 'YouTube',
	vimeo: 'Vimeo',
	gdrive: 'Google Drive',
	direct: 'Berkas video langsung',
	other: 'Lainnya'
};

export const MEDIA_KIND_LABELS: Record<MediaKind, string> = {
	teks: 'Teks',
	komik: 'Komik',
	audio: 'Audio',
	audiovisual: 'Audiovisual'
};

/** Overline shown above each block on the story detail page. */
export const MEDIA_BLOCK_LABELS: Record<Exclude<MediaKind, 'teks'>, string> = {
	komik: 'KOMIK',
	audio: 'DENGARKAN',
	audiovisual: 'TONTON'
};

/** Canonical render order for the media blocks. */
export const MEDIA_ORDER: MediaKind[] = ['teks', 'komik', 'audio', 'audiovisual'];

export function mediaSourceLabel(entry: StoryMedia): string {
	switch (entry.kind) {
		case 'komik':
			return KOMIK_SOURCE_LABELS[entry.source];
		case 'audio':
			return AUDIO_SOURCE_LABELS[entry.source];
		case 'audiovisual':
			return VIDEO_SOURCE_LABELS[entry.source];
	}
}

export function sortMedia(media: StoryMedia[]): StoryMedia[] {
	return [...media].sort((a, b) => MEDIA_ORDER.indexOf(a.kind) - MEDIA_ORDER.indexOf(b.kind));
}

// ─── URL helpers ─────────────────────────────────────────────────────────────

const AUDIO_FILE_EXTENSIONS = ['.mp3', '.ogg', '.oga', '.wav', '.m4a', '.aac', '.flac', '.opus'];
const VIDEO_FILE_EXTENSIONS = ['.mp4', '.webm', '.ogv', '.mov', '.m4v'];

function safeUrl(value: string): URL | null {
	try {
		const url = new URL(value.trim());
		return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
	} catch {
		return null;
	}
}

export function isHttpUrl(value: string): boolean {
	return safeUrl(value) !== null;
}

/** True when the URL path (ignoring query/hash) ends with one of the extensions. */
export function isDirectFile(value: string, extensions: string[]): boolean {
	const url = safeUrl(value);
	if (!url) return false;
	const path = url.pathname.toLowerCase();
	return extensions.some((ext) => path.endsWith(ext));
}

/**
 * Pulls the file id out of any Google Drive / Docs share link shape:
 *   /file/d/{id}/view?usp=sharing, /open?id={id}, /uc?id={id}&export=download,
 *   docs.google.com/document/d/{id}/edit
 */
export function extractDriveId(value: string): string | null {
	const url = safeUrl(value);
	if (!url) return null;
	if (!/(^|\.)(drive|docs)\.google\.com$/.test(url.hostname)) return null;

	const fromPath = url.pathname.match(/\/d\/([^/]+)/);
	if (fromPath) return fromPath[1];

	return url.searchParams.get('id') || null;
}

/** Drive only embeds via /preview — a /view share link renders a blank iframe. */
export function drivePreviewUrl(value: string): string | null {
	const id = extractDriveId(value);
	return id ? `https://drive.google.com/file/d/${id}/preview` : null;
}

/** Accepts youtube.com/watch?v=, youtu.be/, /embed/, /shorts/ and /live/. */
export function youtubeEmbedUrl(value: string): string | null {
	const url = safeUrl(value);
	if (!url) return null;
	const host = url.hostname.replace(/^www\./, '');

	if (host === 'youtu.be') {
		const id = url.pathname.slice(1).split('/')[0];
		return id ? `https://www.youtube.com/embed/${id}` : null;
	}

	if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
		const fromQuery = url.searchParams.get('v');
		if (fromQuery) return `https://www.youtube.com/embed/${fromQuery}`;

		const fromPath = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/]+)/);
		if (fromPath) return `https://www.youtube.com/embed/${fromPath[1]}`;
	}

	return null;
}

export function vimeoEmbedUrl(value: string): string | null {
	const url = safeUrl(value);
	if (!url) return null;
	const host = url.hostname.replace(/^www\./, '');
	if (host !== 'vimeo.com' && host !== 'player.vimeo.com') return null;

	const match = url.pathname.match(/(?:\/video)?\/(\d+)/);
	return match ? `https://player.vimeo.com/video/${match[1]}` : null;
}

const SPOTIFY_KINDS = ['track', 'album', 'playlist', 'episode', 'show', 'artist'];

export function spotifyEmbedUrl(value: string): string | null {
	const url = safeUrl(value);
	if (!url) return null;
	if (url.hostname.replace(/^www\./, '') !== 'open.spotify.com') return null;

	const [, kind, id] = url.pathname.split('/');
	if (!kind || !id || !SPOTIFY_KINDS.includes(kind)) return null;

	return `https://open.spotify.com/embed/${kind}/${id}`;
}

/** SoundCloud has no URL rewriting — the track URL is passed to the widget. */
export function soundcloudEmbedUrl(value: string): string {
	const params = new URLSearchParams({
		url: value.trim(),
		// Brand `tanah` — keeps the play button on-palette.
		color: '#C1622F',
		auto_play: 'false',
		hide_related: 'true',
		show_comments: 'false',
		show_user: 'true',
		show_reposts: 'false',
		visual: 'false'
	});
	return `https://w.soundcloud.com/player/?${params.toString()}`;
}

/** /details/{id} and /embed/{id} both normalise to the embeddable player. */
export function archiveEmbedUrl(value: string): string | null {
	const url = safeUrl(value);
	if (!url) return null;
	if (url.hostname.replace(/^www\./, '') !== 'archive.org') return null;

	const match = url.pathname.match(/^\/(?:details|embed)\/([^/]+)/);
	return match ? `https://archive.org/embed/${match[1]}` : null;
}

// ─── Resolution ──────────────────────────────────────────────────────────────

export type EmbedAspect = 'video' | 'comic' | 'audio';

export type ResolvedMedia =
	| { render: 'iframe'; src: string; aspect: EmbedAspect }
	| { render: 'audio'; src: string; transcript?: string }
	| { render: 'video'; src: string; poster?: string }
	| { render: 'unsupported'; url: string };

/**
 * Decides how a media entry is displayed. Anything that cannot be normalised into
 * a working player falls through to `unsupported` so the UI offers a plain link
 * instead of rendering a dead iframe.
 */
export function resolveMedia(entry: StoryMedia): ResolvedMedia {
	if (!isHttpUrl(entry.url)) {
		return { render: 'unsupported', url: entry.url };
	}

	switch (entry.kind) {
		case 'komik': {
			if (entry.source === 'pdf') {
				return { render: 'iframe', src: entry.url, aspect: 'comic' };
			}
			if (entry.source === 'gdrive') {
				const src = drivePreviewUrl(entry.url);
				return src
					? { render: 'iframe', src, aspect: 'comic' }
					: { render: 'unsupported', url: entry.url };
			}
			if (entry.source === 'canva' || isDirectFile(entry.url, ['.pdf'])) {
				return { render: 'iframe', src: entry.url, aspect: 'comic' };
			}
			return { render: 'unsupported', url: entry.url };
		}

		case 'audio': {
			// A direct file is played by our own player; anything else needs a widget.
			if (entry.source === 'direct' || isDirectFile(entry.url, AUDIO_FILE_EXTENSIONS)) {
				return { render: 'audio', src: entry.url, transcript: entry.transcript };
			}

			let src: string | null = null;
			switch (entry.source) {
				case 'soundcloud':
					src = soundcloudEmbedUrl(entry.url);
					break;
				case 'spotify':
					src = spotifyEmbedUrl(entry.url);
					break;
				case 'archive':
					src = archiveEmbedUrl(entry.url);
					break;
				case 'gdrive':
					src = drivePreviewUrl(entry.url);
					break;
			}

			return src
				? { render: 'iframe', src, aspect: 'audio' }
				: { render: 'unsupported', url: entry.url };
		}

		case 'audiovisual': {
			if (entry.source === 'direct' || isDirectFile(entry.url, VIDEO_FILE_EXTENSIONS)) {
				return { render: 'video', src: entry.url, poster: entry.posterUrl };
			}

			let src: string | null = null;
			switch (entry.source) {
				case 'youtube':
					src = youtubeEmbedUrl(entry.url);
					break;
				case 'vimeo':
					src = vimeoEmbedUrl(entry.url);
					break;
				case 'gdrive':
					src = drivePreviewUrl(entry.url);
					break;
			}

			return src
				? { render: 'iframe', src, aspect: 'video' }
				: { render: 'unsupported', url: entry.url };
		}
	}
}

// ─── Validation ──────────────────────────────────────────────────────────────

/**
 * Returns a contributor-facing error message when the entry cannot be rendered,
 * or null when it is usable. Shared by the submission action so a bad link is
 * caught before the story is stored.
 */
export function validateMediaEntry(entry: StoryMedia): string | null {
	if (!isHttpUrl(entry.url)) {
		return 'Tautan harus diawali http:// atau https://.';
	}

	switch (entry.kind) {
		case 'komik':
			if (entry.source === 'pdf' && !isDirectFile(entry.url, ['.pdf'])) {
				return 'Tautan PDF langsung harus berakhiran .pdf.';
			}
			if (entry.source === 'gdrive' && !extractDriveId(entry.url)) {
				return 'Tautan Google Drive tidak dikenali. Tempel tautan bagikan berkasnya.';
			}
			break;

		case 'audio':
			if (entry.source === 'soundcloud' && !entry.url.includes('soundcloud.com')) {
				return 'Tautan SoundCloud tidak dikenali.';
			}
			if (entry.source === 'spotify' && !spotifyEmbedUrl(entry.url)) {
				return 'Tautan Spotify tidak dikenali.';
			}
			if (entry.source === 'archive' && !archiveEmbedUrl(entry.url)) {
				return 'Tautan Archive.org tidak dikenali.';
			}
			if (entry.source === 'gdrive' && !extractDriveId(entry.url)) {
				return 'Tautan Google Drive tidak dikenali.';
			}
			break;

		case 'audiovisual':
			if (entry.source === 'youtube' && !youtubeEmbedUrl(entry.url)) {
				return 'Tautan YouTube tidak dikenali.';
			}
			if (entry.source === 'vimeo' && !vimeoEmbedUrl(entry.url)) {
				return 'Tautan Vimeo tidak dikenali.';
			}
			if (entry.source === 'gdrive' && !extractDriveId(entry.url)) {
				return 'Tautan Google Drive tidak dikenali.';
			}
			break;
	}

	return null;
}

/** Shape check for the JSON column, which is not guaranteed to hold clean data. */
export function isStoryMedia(value: unknown): value is StoryMedia {
	if (!value || typeof value !== 'object') return false;
	const entry = value as { kind?: unknown; source?: unknown; url?: unknown };
	return (
		(entry.kind === 'komik' || entry.kind === 'audio' || entry.kind === 'audiovisual') &&
		typeof entry.source === 'string' &&
		typeof entry.url === 'string'
	);
}
