import { requireDb, requirePermission } from '$lib/server/auth-guard';
import { schema } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = requirePermission(locals, 'story.create');
	const db = requireDb(locals);

	const stories = await db
		.select({
			id: schema.stories.id,
			slug: schema.stories.slug,
			title: schema.stories.title,
			status: schema.stories.status,
			format: schema.stories.format,
			category: schema.stories.category,
			viewCount: schema.stories.viewCount,
			createdAt: schema.stories.createdAt,
			updatedAt: schema.stories.updatedAt,
			reviewedAt: schema.stories.reviewedAt
		})
		.from(schema.stories)
		.where(eq(schema.stories.submittedBy, user.id!))
		.orderBy(desc(schema.stories.updatedAt))
		.all();

	// The curator's most recent actionable note per story. Without this a
	// "Perlu Revisi" badge tells the contributor nothing about what to change —
	// the notes were previously only visible on the admin-only review page.
	const feedback: Record<string, string> = {};
	if (stories.length > 0) {
		const reviews = await db
			.select({
				storyId: schema.storyReviews.storyId,
				action: schema.storyReviews.action,
				notes: schema.storyReviews.notes,
				createdAt: schema.storyReviews.createdAt
			})
			.from(schema.storyReviews)
			.innerJoin(schema.stories, eq(schema.storyReviews.storyId, schema.stories.id))
			.where(eq(schema.stories.submittedBy, user.id!))
			.orderBy(desc(schema.storyReviews.createdAt))
			.all();

		// Newest first — the first actionable note per story wins.
		for (const review of reviews) {
			if (feedback[review.storyId]) continue;
			if ((review.action === 'requested_changes' || review.action === 'rejected') && review.notes) {
				feedback[review.storyId] = review.notes;
			}
		}
	}

	return { stories, feedback };
};
