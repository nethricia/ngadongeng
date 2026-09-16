import { schema } from '$lib/server/db';
import { mapStory } from '$lib/server/mappers';
import { error } from '@sveltejs/kit';
import { and, desc, eq, ne, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.db) {
		error(503, 'Database tidak tersedia');
	}

	const db = locals.db;
	const { slug } = params;

	// Fetch story + contributor + submitter
	const [row] = await db
		.select()
		.from(schema.stories)
		.leftJoin(schema.contributors, eq(schema.stories.contributorId, schema.contributors.id))
		.leftJoin(schema.users, eq(schema.stories.submittedBy, schema.users.id))
		.where(and(eq(schema.stories.slug, slug), eq(schema.stories.status, 'published')))
		.limit(1)
		.all();

	if (!row) {
		error(404, 'Cerita tidak ditemukan');
	}

	// Increment view count (fire-and-forget)
	db.update(schema.stories)
		.set({ viewCount: sql`${schema.stories.viewCount} + 1` })
		.where(eq(schema.stories.id, row.stories.id))
		.run()
		.catch(() => null);

	// Fetch related stories (same category, excluding this one)
	const relatedRows = await db
		.select()
		.from(schema.stories)
		.leftJoin(schema.contributors, eq(schema.stories.contributorId, schema.contributors.id))
		.leftJoin(schema.users, eq(schema.stories.submittedBy, schema.users.id))
		.where(
			and(
				eq(schema.stories.status, 'published'),
				eq(schema.stories.category, row.stories.category),
				ne(schema.stories.id, row.stories.id)
			)
		)
		.orderBy(desc(schema.stories.publishedAt))
		.limit(3)
		.all();

	// Fetch reaction counts
	const reactionCounts = await db
		.select({ type: schema.reactions.type, count: sql<number>`count(*)` })
		.from(schema.reactions)
		.where(eq(schema.reactions.storyId, row.stories.id))
		.groupBy(schema.reactions.type)
		.all();

	return {
		story: mapStory(row.stories, row.contributors, row.users),
		related: relatedRows.map((r) => mapStory(r.stories, r.contributors, r.users)),
		reactions: Object.fromEntries(reactionCounts.map((r) => [r.type, r.count]))
	};
};
