import { schema } from '$lib/server/db';
import { mapStory } from '$lib/server/mappers';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.db) {
		return { stories: [] };
	}

	const rows = await locals.db
		.select()
		.from(schema.stories)
		.leftJoin(schema.contributors, eq(schema.stories.contributorId, schema.contributors.id))
		.leftJoin(schema.users, eq(schema.stories.submittedBy, schema.users.id))
		.where(eq(schema.stories.status, 'published'))
		.orderBy(desc(schema.stories.publishedAt))
		.all();

	return {
		stories: rows.map((r) => mapStory(r.stories, r.contributors, r.users))
	};
};
