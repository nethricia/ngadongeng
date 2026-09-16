import type { StoryMedia } from '$lib/types';
import type { AdapterAccountType } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

// ============================================================
// AUTH.JS REQUIRED TABLES
// ============================================================

export const users = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'timestamp_ms' }),
	image: text('image'),
	// Extended fields
	// reader → default for new signups
	// contributor → can submit stories
	// admin → can review/publish
	// superadmin → full access
	role: text('role', { enum: ['reader', 'contributor', 'admin', 'superadmin'] })
		.notNull()
		.default('reader'),
	bio: text('bio'),
	suspended: integer('suspended', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const accounts = sqliteTable(
	'accounts',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccountType>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('provider_account_id').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(t) => [primaryKey({ columns: [t.provider, t.providerAccountId] })]
);

export const sessions = sqliteTable('sessions', {
	sessionToken: text('session_token').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable(
	'verification_tokens',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
	},
	(t) => [primaryKey({ columns: [t.identifier, t.token] })]
);

// ============================================================
// CONTRIBUTORS
// Can be an individual linked to a user account, or an
// organisation/community account not tied to any user.
// ============================================================

export const contributors = sqliteTable('contributors', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	// null = organisation/anonymous contributor not tied to a user account
	userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
	name: text('name').notNull(),
	bio: text('bio'),
	role: text('role', { enum: ['tbm', 'komunitas', 'kurator', 'individu'] })
		.notNull()
		.default('individu'),
	avatarUrl: text('avatar_url'),
	verified: integer('verified', { mode: 'boolean' }).notNull().default(false),
	joinedAt: integer('joined_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

// ============================================================
// STORIES
// A story carries one or more media. `content` holds the
// written (teks) body; `media` holds every embedded medium:
//   komik       — PDF document embedded via Drive, a direct .pdf URL, or Canva
//   audio       — SoundCloud/Spotify/Archive.org/Drive widget, or a direct audio file
//   audiovisual — YouTube/Vimeo/Drive player, or a direct video file
//
// No binary assets are stored here; all media is referenced
// by external URL.
// ============================================================

export const stories = sqliteTable('stories', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	slug: text('slug').notNull().unique(),

	// ── Titles ───────────────────────────────────────────────
	title: text('title').notNull(),
	// Optional Sundanese/Pegon script title
	titleSunda: text('title_sunda'),

	// ── Description ──────────────────────────────────────────
	synopsis: text('synopsis'),
	// Moral / nilai cerita
	moral: text('moral'),
	// JSON-encoded string array: '["kancil","binatang","jenaka"]'
	tags: text('tags'),

	// ── Classification ───────────────────────────────────────
	format: text('format', { enum: ['teks', 'komik', 'audio', 'audiovisual'] }).notNull(),
	category: text('category', {
		enum: ['binatang', 'dewa-dewi', 'manusia', 'asal-usul', 'sejarah', 'jenaka', 'legenda']
	}).notNull(),
	genre: text('genre', {
		enum: [
			'fabel',
			'legenda',
			'mite',
			'sage',
			'dongeng-anak',
			'pantun',
			'guguritan',
			'parabel',
			'lainnya'
		]
	}),
	language: text('language', { enum: ['sunda', 'sunda-buhun', 'indonesia', 'sunda-indonesia'] })
		.notNull()
		.default('indonesia'),
	region: text('region'),

	// ── Primary content (teks format) ────────────────────────
	// The story body stored directly; no uploads needed.
	contentType: text('content_type', { enum: ['markdown', 'html'] }).default('markdown'),
	content: text('content'),

	// ── Embedded media (komik / audio / audiovisual) ─────────
	// JSON-encoded StoryMedia[]: '[{"kind":"audio","source":"soundcloud","url":"..."}]'
	// A story may carry several; rendering order is the array order.
	media: text('media', { mode: 'json' }).$type<StoryMedia[]>(),

	// ── Deprecated: single-format embed (pre-multi-media) ────
	// Superseded by `media`. Retained only so the migration that
	// backfills `media` can read the historical values; nothing
	// writes these anymore.
	embedUrl: text('embed_url'),
	embedProvider: text('embed_provider', {
		enum: ['youtube', 'gdrive', 'canva', 'soundcloud', 'spotify', 'other']
	}),

	// ── Cover image ──────────────────────────────────────────
	// External URL — Cloudflare Images, Google Drive public share, etc.
	coverImageUrl: text('cover_image_url'),

	// ── Authorship ───────────────────────────────────────────
	contributorId: text('contributor_id').references(() => contributors.id, { onDelete: 'set null' }),
	// Authenticated user who submitted this story
	submittedBy: text('submitted_by').references(() => users.id, { onDelete: 'set null' }),

	// ── Review tracking ───────────────────────────────────────
	reviewedBy: text('reviewed_by').references(() => users.id, { onDelete: 'set null' }),
	reviewedAt: integer('reviewed_at', { mode: 'timestamp' }),

	// ── Publishing ────────────────────────────────────────────
	// draft → pending_review → published
	//                       ↘ needs_revision (curator asked for changes; the story
	//                                        comes back to the contributor, who
	//                                        revises and resubmits → pending_review)
	//                       ↘ rejected (final)
	status: text('status', {
		enum: ['draft', 'pending_review', 'needs_revision', 'published', 'rejected', 'archived']
	})
		.notNull()
		.default('draft'),
	featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
	viewCount: integer('view_count').notNull().default(0),

	publishedAt: integer('published_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull()
});

// ============================================================
// STORY REVIEWS
// Full audit trail of review actions. Allows admins to approve,
// reject, request changes, or leave feedback comments.
// ============================================================

export const storyReviews = sqliteTable('story_reviews', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	storyId: text('story_id')
		.notNull()
		.references(() => stories.id, { onDelete: 'cascade' }),
	reviewerId: text('reviewer_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	action: text('action', {
		enum: ['approved', 'rejected', 'requested_changes', 'commented']
	}).notNull(),
	notes: text('notes'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull()
});

// ============================================================
// REACTIONS
// Five Sundanese-flavoured emoji reactions per story.
// Logged-in users are keyed by userId; anonymous visitors
// are keyed by a session fingerprint (set by the client).
// A user may cast each reaction type at most once per story.
// ============================================================

export const reactions = sqliteTable(
	'reactions',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		storyId: text('story_id')
			.notNull()
			.references(() => stories.id, { onDelete: 'cascade' }),
		// null = anonymous visitor
		userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
		// Used for anonymous de-duplication (e.g. stored in a cookie)
		fingerprint: text('fingerprint'),
		type: text('type', {
			enum: ['nyukcruk', 'sae-pisan', 'pikaseurieun', 'pikir-heula', 'matak-sedih']
		}).notNull(),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.$defaultFn(() => new Date())
			.notNull()
	},
	(t) => [
		// Prevent a logged-in user from reacting with the same type twice
		unique('uq_user_story_reaction').on(t.storyId, t.userId, t.type)
	]
);

// ============================================================
// RELATIONS
// ============================================================

export const usersRelations = relations(users, ({ many, one }) => ({
	accounts: many(accounts),
	sessions: many(sessions),
	contributor: one(contributors, { fields: [users.id], references: [contributors.userId] }),
	submittedStories: many(stories, { relationName: 'submittedBy' }),
	reviewedStories: many(stories, { relationName: 'reviewedBy' }),
	storyReviews: many(storyReviews),
	reactions: many(reactions)
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] })
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const contributorsRelations = relations(contributors, ({ one, many }) => ({
	user: one(users, {
		fields: [contributors.userId],
		references: [users.id]
	}),
	stories: many(stories)
}));

export const storiesRelations = relations(stories, ({ one, many }) => ({
	contributor: one(contributors, {
		fields: [stories.contributorId],
		references: [contributors.id]
	}),
	submitter: one(users, {
		fields: [stories.submittedBy],
		references: [users.id],
		relationName: 'submittedBy'
	}),
	reviewer: one(users, {
		fields: [stories.reviewedBy],
		references: [users.id],
		relationName: 'reviewedBy'
	}),
	reviews: many(storyReviews),
	reactions: many(reactions)
}));

export const storyReviewsRelations = relations(storyReviews, ({ one }) => ({
	story: one(stories, { fields: [storyReviews.storyId], references: [stories.id] }),
	reviewer: one(users, { fields: [storyReviews.reviewerId], references: [users.id] })
}));

export const reactionsRelations = relations(reactions, ({ one }) => ({
	story: one(stories, { fields: [reactions.storyId], references: [stories.id] }),
	user: one(users, { fields: [reactions.userId], references: [users.id] })
}));

// ============================================================
// TYPES (useful for server-side code)
// ============================================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Contributor = typeof contributors.$inferSelect;
export type NewContributor = typeof contributors.$inferInsert;
export type Story = typeof stories.$inferSelect;
export type NewStory = typeof stories.$inferInsert;
export type StoryReview = typeof storyReviews.$inferSelect;
export type Reaction = typeof reactions.$inferSelect;
export type NewReaction = typeof reactions.$inferInsert;
