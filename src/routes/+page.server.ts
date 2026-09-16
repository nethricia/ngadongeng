import { schema } from '$lib/server/db';
import { mapStory } from '$lib/server/mappers';
import { and, desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.db) {
		return {
			featuredStories: [],
			recentStories: [],
			stats: {
				storyCount: 0,
				contributorCount: 0
			}
		};
	}

	const db = locals.db;

	const [featured, recent, storyCount, contributorCount] = await Promise.all([
		db
			.select()
			.from(schema.stories)
			.leftJoin(schema.contributors, eq(schema.stories.contributorId, schema.contributors.id))
			.leftJoin(schema.users, eq(schema.stories.submittedBy, schema.users.id))
			.where(and(eq(schema.stories.status, 'published'), eq(schema.stories.featured, true)))
			.orderBy(desc(schema.stories.publishedAt))
			.limit(3)
			.all(),

		db
			.select()
			.from(schema.stories)
			.leftJoin(schema.contributors, eq(schema.stories.contributorId, schema.contributors.id))
			.leftJoin(schema.users, eq(schema.stories.submittedBy, schema.users.id))
			.where(eq(schema.stories.status, 'published'))
			.orderBy(desc(schema.stories.publishedAt))
			.limit(8)
			.all(),

		db
			.select({ id: schema.stories.id })
			.from(schema.stories)
			.where(eq(schema.stories.status, 'published'))
			.all()
			.then((r) => r.length),

		db
			.select({ id: schema.contributors.id })
			.from(schema.contributors)
			.all()
			.then((r) => r.length)
	]);

	return {
		featuredStories: featured.map((r) => mapStory(r.stories, r.contributors, r.users)),
		recentStories: recent.map((r) => mapStory(r.stories, r.contributors, r.users)),
		stats: {
			storyCount,
			contributorCount
		}
	};
};
