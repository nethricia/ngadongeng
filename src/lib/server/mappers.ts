/**
 * Maps Drizzle DB types → DongengStory (for use in public-facing components).
 * Admin/dashboard pages can use the raw DB types directly.
 */
import { isStoryMedia, sortMedia } from '$lib/media';
import type { Contributor, Story } from '$lib/server/db/schema';
import type {
	ContributorRole,
	DongengCategory,
	DongengFormat,
	DongengGenre,
	DongengLanguage,
	DongengRegion,
	DongengStory
} from '$lib/types';

const FALLBACK_AUTHOR = {
	username: 'pabukon-ngadongeng',
	displayName: 'TBM Pabukon Ngadongeng',
	role: 'tbm' as ContributorRole
};

/** The account that submitted a story, as returned by a `users` join on `submitted_by`. */
export type Submitter = { name: string | null; image: string | null };

/**
 * Attribution precedence:
 *   1. `contributors` — an explicit credit (curated or organisational, e.g. TBM itself)
 *   2. the submitting user account — the normal case for community submissions
 *   3. the TBM placeholder, for legacy rows with neither
 *
 * The submission form writes `submitted_by` and never `contributor_id`, so before
 * this the `contributors` join was always null and every user-submitted story was
 * credited to TBM Pabukon Ngadongeng.
 */
function resolveAuthor(
	story: Story,
	contributor?: Contributor | null,
	submitter?: Submitter | null
) {
	if (contributor) {
		return {
			username: contributor.id,
			displayName: contributor.name,
			avatarUrl: contributor.avatarUrl ?? undefined,
			role: contributor.role as ContributorRole
		};
	}

	if (submitter?.name) {
		return {
			username: story.submittedBy ?? 'anon',
			displayName: submitter.name,
			avatarUrl: submitter.image ?? undefined,
			role: 'individu' as ContributorRole
		};
	}

	return FALLBACK_AUTHOR;
}

export function mapStory(
	story: Story,
	contributor?: Contributor | null,
	submitter?: Submitter | null
): DongengStory {
	const parsedTags = story.tags
		? (() => {
				try {
					return JSON.parse(story.tags) as string[];
				} catch {
					return story.tags.split(',').map((t) => t.trim());
				}
			})()
		: undefined;

	const author = resolveAuthor(story, contributor, submitter);

	// The JSON column is not guaranteed to hold clean data — drop anything malformed.
	// Entries are NOT deduplicated by kind: the submission form allows one block per
	// medium, but a row may legitimately hold more (e.g. two audio recordings), and
	// silently dropping content from an archive is worse than rendering both.
	const media = sortMedia((story.media ?? []).filter(isStoryMedia));

	// A story's media set: the written body comes from `content`, the rest from `media`.
	const formats: DongengFormat[] = [];
	if (story.content?.trim()) formats.push('teks');
	for (const entry of media) {
		if (!formats.includes(entry.kind)) formats.push(entry.kind);
	}
	// Rows with neither body nor media (e.g. a bare draft) fall back to the
	// primary format so the card chip always has something to show.
	if (formats.length === 0) formats.push(story.format as DongengFormat);

	return {
		id: story.id,
		slug: story.slug,
		title: story.title,
		excerpt: story.synopsis ?? undefined,
		coverUrl: story.coverImageUrl ?? undefined,
		format: story.format as DongengFormat,
		formats,
		media,
		category: story.category as DongengCategory,
		genre: (story.genre ?? 'lainnya') as DongengGenre,
		language: story.language as DongengLanguage,
		region: (story.region ?? 'sunda-umum') as DongengRegion,
		author,
		publishedAt: story.publishedAt?.toISOString() ?? story.createdAt.toISOString(),
		featured: story.featured,
		viewCount: story.viewCount,
		synopsis: story.synopsis ?? undefined,
		moralMessage: story.moral ?? undefined,
		bodyText: story.content ?? undefined,
		tags: parsedTags
	};
}

export function mapStories(
	rows: Array<{
		stories: Story;
		contributors: Contributor | null;
		users?: Submitter | null;
	}>
): DongengStory[] {
	return rows.map((r) => mapStory(r.stories, r.contributors, r.users));
}

/** Generates a URL-safe slug from a story title. */
export function slugify(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 80);
}
