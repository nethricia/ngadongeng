import { MEDIA_ORDER, validateMediaEntry } from '$lib/media';
import { requireDb, requirePermission } from '$lib/server/auth-guard';
import { schema } from '$lib/server/db';
import type { NewStory } from '$lib/server/db/schema';
import { slugify } from '$lib/server/mappers';
import type { AudioSource, KomikSource, StoryMedia, VideoSource } from '$lib/types';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	requirePermission(locals, 'story.create');
	return {};
};

const KOMIK_SOURCES: KomikSource[] = ['gdrive', 'pdf', 'canva', 'other'];
const AUDIO_SOURCES: AudioSource[] = ['soundcloud', 'spotify', 'archive', 'gdrive', 'direct'];
const VIDEO_SOURCES: VideoSource[] = ['youtube', 'vimeo', 'gdrive', 'direct', 'other'];

function pickSource<T extends string>(value: string, allowed: T[], fallback: T): T {
	return allowed.includes(value as T) ? (value as T) : fallback;
}

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const user = requirePermission(locals, 'story.create');
		const db = requireDb(locals);

		const fd = await request.formData();
		const str = (key: string) => fd.get(key)?.toString().trim() ?? '';
		const on = (key: string) => fd.get(key) === 'on' || fd.get(key) === 'true';

		const title = str('title');
		const synopsis = str('synopsis');
		const moral = str('moral');
		const category = str('category');
		const genre = str('genre');
		const language = str('language');
		const region = str('region');
		const content = fd.get('content')?.toString() ?? '';
		const coverImageUrl = str('coverImageUrl');
		const tagsRaw = str('tags');
		const submitAction = fd.get('_action')?.toString(); // 'save' or 'submit'

		if (!title || !category || !language) {
			return fail(400, { error: 'Judul, kategori, dan bahasa wajib diisi.' });
		}

		// ── Assemble the media blocks ────────────────────────────────────────
		// A block is active when its checkbox is ticked; an active block must
		// carry a link that we can actually render.
		const media: StoryMedia[] = [];

		if (on('komik_enabled')) {
			const url = str('komik_url');
			if (!url) return fail(400, { error: 'Blok Komik dicentang tetapi URL-nya kosong.' });

			const entry: StoryMedia = {
				kind: 'komik',
				source: pickSource(str('komik_source'), KOMIK_SOURCES, 'gdrive'),
				url
			};
			const invalid = validateMediaEntry(entry);
			if (invalid) return fail(400, { error: `Komik: ${invalid}` });
			media.push(entry);
		}

		if (on('audio_enabled')) {
			const url = str('audio_url');
			if (!url) return fail(400, { error: 'Blok Audio dicentang tetapi URL-nya kosong.' });

			const transcript = str('audio_transcript');
			const entry: StoryMedia = {
				kind: 'audio',
				source: pickSource(str('audio_source'), AUDIO_SOURCES, 'soundcloud'),
				url,
				...(transcript ? { transcript } : {})
			};
			const invalid = validateMediaEntry(entry);
			if (invalid) return fail(400, { error: `Audio: ${invalid}` });
			media.push(entry);
		}

		if (on('video_enabled')) {
			const url = str('video_url');
			if (!url) return fail(400, { error: 'Blok Audiovisual dicentang tetapi URL-nya kosong.' });

			const posterUrl = str('video_poster_url');
			const entry: StoryMedia = {
				kind: 'audiovisual',
				source: pickSource(str('video_source'), VIDEO_SOURCES, 'youtube'),
				url,
				...(posterUrl ? { posterUrl } : {})
			};
			const invalid = validateMediaEntry(entry);
			if (invalid) return fail(400, { error: `Audiovisual: ${invalid}` });
			media.push(entry);
		}

		const hasText = content.trim().length > 0;
		if (!hasText && media.length === 0) {
			return fail(400, {
				error: 'Isi minimal satu format konten: teks, komik, audio, atau audiovisual.'
			});
		}

		// The primary format is the first medium present in canonical order.
		const present = [...(hasText ? ['teks'] : []), ...media.map((m) => m.kind)];
		const format = (MEDIA_ORDER.find((kind) => present.includes(kind)) ??
			'teks') as NewStory['format'];

		// Generate unique slug
		let slug = slugify(title);
		const existing = await db
			.select({ id: schema.stories.id })
			.from(schema.stories)
			.where(eq(schema.stories.slug, slug))
			.limit(1)
			.all();
		if (existing.length > 0) {
			slug = `${slug}-${Date.now()}`;
		}

		const tags = tagsRaw
			? JSON.stringify(
					tagsRaw
						.split(',')
						.map((t) => t.trim())
						.filter(Boolean)
				)
			: null;

		const status = submitAction === 'submit' ? 'pending_review' : 'draft';

		const storyData: NewStory = {
			slug,
			title,
			synopsis: synopsis || null,
			moral: moral || null,
			format,
			category: category as NewStory['category'],
			genre: (genre || null) as NewStory['genre'],
			language: language as NewStory['language'],
			region: region || null,
			content: content.trim() || null,
			media: media.length > 0 ? media : null,
			coverImageUrl: coverImageUrl || null,
			tags,
			submittedBy: user.id,
			status: status as NewStory['status']
		};

		await db.insert(schema.stories).values(storyData).run();

		redirect(303, `/dashboard`);
	}
};
