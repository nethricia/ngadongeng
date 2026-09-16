import { requireDb, requirePermission } from '$lib/server/auth-guard';
import { schema } from '$lib/server/db';
import type { NewStory } from '$lib/server/db/schema';
import { mapStory } from '$lib/server/mappers';
import { error, fail, redirect } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	requirePermission(locals, 'story.review');
	const db = requireDb(locals);

	const [row] = await db
		.select()
		.from(schema.stories)
		.leftJoin(schema.contributors, eq(schema.stories.contributorId, schema.contributors.id))
		.leftJoin(schema.users, eq(schema.stories.submittedBy, schema.users.id))
		.where(eq(schema.stories.id, params.id))
		.limit(1)
		.all();

	if (!row) error(404, 'Cerita tidak ditemukan');

	const reviews = await db
		.select({
			id: schema.storyReviews.id,
			action: schema.storyReviews.action,
			notes: schema.storyReviews.notes,
			createdAt: schema.storyReviews.createdAt,
			reviewerName: schema.users.name,
			reviewerEmail: schema.users.email
		})
		.from(schema.storyReviews)
		.leftJoin(schema.users, eq(schema.storyReviews.reviewerId, schema.users.id))
		.where(eq(schema.storyReviews.storyId, params.id))
		.orderBy(desc(schema.storyReviews.createdAt))
		.all();

	return {
		story: mapStory(row.stories, row.contributors, row.users),
		rawStory: row.stories,
		reviews
	};
};

export const actions: Actions = {
	review: async ({ locals, params, request }) => {
		const reviewer = requirePermission(locals, 'story.review');
		const db = requireDb(locals);

		const fd = await request.formData();
		const action = fd.get('action')?.toString();
		const notes = fd.get('notes')?.toString().trim() ?? '';

		const validActions = ['approved', 'rejected', 'requested_changes', 'commented'];
		if (!action || !validActions.includes(action)) {
			return fail(400, { error: 'Tindakan tidak valid.' });
		}

		// A revision request or rejection is meaningless without a reason — the
		// contributor has no other way to learn what to change.
		if ((action === 'requested_changes' || action === 'rejected') && !notes) {
			return fail(400, {
				error: 'Tuliskan catatan agar kontributor tahu apa yang perlu diperbaiki.'
			});
		}

		const [story] = await db
			.select({ id: schema.stories.id, status: schema.stories.status })
			.from(schema.stories)
			.where(eq(schema.stories.id, params.id))
			.limit(1)
			.all();

		if (!story) return fail(404, { error: 'Cerita tidak ditemukan.' });

		// Insert review record
		await db
			.insert(schema.storyReviews)
			.values({
				storyId: story.id,
				reviewerId: reviewer.id!,
				action: action as 'approved' | 'rejected' | 'requested_changes' | 'commented',
				notes: notes || null
			})
			.run();

		// Update story status. A revision request must actually move the story back
		// to the contributor — leaving it on `pending_review` made the action look
		// like a no-op and kept it in the review queue.
		const newStatus: NewStory['status'] =
			action === 'approved'
				? 'published'
				: action === 'rejected'
					? 'rejected'
					: action === 'requested_changes'
						? 'needs_revision'
						: (story.status as NewStory['status']);

		const updateValues: Record<string, unknown> = {
			status: newStatus,
			reviewedBy: reviewer.id,
			reviewedAt: new Date(),
			updatedAt: new Date()
		};
		if (newStatus === 'published') {
			updateValues.publishedAt = new Date();
		}

		await db
			.update(schema.stories)
			.set(updateValues as never)
			.where(eq(schema.stories.id, story.id))
			.run();

		redirect(303, '/ulasan');
	}
};
