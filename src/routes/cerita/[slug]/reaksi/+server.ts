import { schema } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

const VALID_TYPES = ['nyukcruk', 'sae-pisan', 'pikaseurieun', 'pikir-heula', 'matak-sedih'];

export const POST: RequestHandler = async ({ locals, params, request, cookies }) => {
	if (!locals.db) {
		error(503, 'Database tidak tersedia');
	}

	const db = locals.db;
	const { slug } = params;

	const body = await request.json().catch(() => null);
	const reactionType = body?.type;

	if (!reactionType || !VALID_TYPES.includes(reactionType)) {
		error(400, 'Tipe reaksi tidak valid');
	}

	// Find the story
	const [story] = await db
		.select({ id: schema.stories.id })
		.from(schema.stories)
		.where(and(eq(schema.stories.slug, slug), eq(schema.stories.status, 'published')))
		.limit(1)
		.all();

	if (!story) {
		error(404, 'Cerita tidak ditemukan');
	}

	const userId = locals.session?.user?.id ?? null;
	const fingerprint = cookies.get('fp') ?? null;

	if (!userId && !fingerprint) {
		error(400, 'Sesi tidak dikenali');
	}

	// Check for existing reaction (user or fingerprint)
	const existing = await db
		.select({ id: schema.reactions.id })
		.from(schema.reactions)
		.where(
			and(
				eq(schema.reactions.storyId, story.id),
				eq(schema.reactions.type, reactionType as never),
				userId
					? eq(schema.reactions.userId, userId)
					: eq(schema.reactions.fingerprint, fingerprint!)
			)
		)
		.limit(1)
		.all();

	if (existing.length > 0) {
		// Toggle off — remove the reaction
		await db.delete(schema.reactions).where(eq(schema.reactions.id, existing[0].id)).run();
		return json({ toggled: false });
	}

	// Insert new reaction
	await db
		.insert(schema.reactions)
		.values({
			storyId: story.id,
			userId,
			fingerprint,
			type: reactionType as never
		})
		.run();

	return json({ toggled: true });
};
