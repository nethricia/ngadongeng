<script lang="ts">
	import { resolve } from '$app/paths';
	import { MediaBlock } from '$lib/components/media';
	import { MEDIA_KIND_LABELS, mediaSourceLabel } from '$lib/media';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const ACTION_LABEL: Record<string, string> = {
		approved: 'Diterbitkan',
		rejected: 'Ditolak',
		requested_changes: 'Perlu Revisi',
		commented: 'Komentar'
	};
	const ACTION_CLASS: Record<string, string> = {
		approved: 'bg-success/15 text-success',
		rejected: 'bg-danger/15 text-danger',
		requested_changes: 'bg-padi/25 text-bark',
		commented: 'bg-cai/10 text-cai'
	};

	const STATUS_CLASS: Record<string, string> = {
		draft: 'status-draft',
		pending_review: 'status-pending',
		needs_revision: 'status-revision',
		published: 'status-published',
		rejected: 'status-rejected',
		archived: 'status-archived'
	};
	const STATUS_LABEL: Record<string, string> = {
		draft: 'Draf',
		pending_review: 'Menunggu Ulasan',
		needs_revision: 'Perlu Revisi',
		published: 'Terbit',
		rejected: 'Ditolak',
		archived: 'Diarsipkan'
	};

	function formatDate(d: Date | null | undefined) {
		if (!d) return '—';
		return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' }).format(
			new Date(d)
		);
	}
</script>

<div class="space-y-6">
	<!-- Breadcrumb + title -->
	<div>
		<a
			href={resolve('/ulasan')}
			class="font-mono text-xs text-bark/55 hover:text-bark transition-colors"
		>
			← Antrian
		</a>
		<div class="flex items-start gap-3 mt-2">
			<h1 class="heading text-xl flex-1">{data.story.title}</h1>
			<span class={STATUS_CLASS[data.rawStory.status] ?? 'status-draft'}>
				{STATUS_LABEL[data.rawStory.status] ?? data.rawStory.status}
			</span>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Story preview -->
		<div class="lg:col-span-2 space-y-4">
			<div class="panel-card p-5 space-y-4">
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{#each [['Format', data.story.formats.join(' + ')], ['Kategori', data.story.category], ['Bahasa', data.story.language], ['Genre', data.story.genre ?? '—']] as [k, v] (k)}
						<div>
							<div class="label mb-0.5">{k}</div>
							<div class="font-sans text-sm text-bark capitalize">{v}</div>
						</div>
					{/each}
				</div>

				{#if data.story.synopsis}
					<div class="border-t border-kulit/20 pt-4">
						<p class="label mb-2">Sinopsis</p>
						<p class="prose-body text-sm text-bark/85">{data.story.synopsis}</p>
					</div>
				{/if}

				{#if data.story.bodyText}
					<div class="border-t border-kulit/20 pt-4">
						<p class="label mb-2">Isi Cerita</p>
						<div
							class="bg-cream rounded-lg p-4 text-sm text-bark max-h-80 overflow-y-auto whitespace-pre-wrap font-serif leading-relaxed border border-kulit/20"
						>
							{data.story.bodyText}
						</div>
					</div>
				{/if}

				{#if data.story.media.length > 0}
					<div class="border-t border-kulit/20 pt-4 space-y-4">
						<p class="label">Media Terlampir</p>
						{#each data.story.media as entry, i (`${entry.kind}-${i}`)}
							<div class="space-y-2">
								<div class="flex flex-wrap items-center gap-2">
									<span class="chip chip-teks">{MEDIA_KIND_LABELS[entry.kind]}</span>
									<span class="font-mono text-xs text-bark/55">{mediaSourceLabel(entry)}</span>
								</div>
								<!--
									The submitted URL is shown verbatim for review; the block below
									already renders it and offers its own "open in new tab" link.
								-->
								<p class="font-mono text-xs text-cai break-all">{entry.url}</p>
								<!-- Rendered inline so reviewers can verify the embed before approving. -->
								<MediaBlock {entry} title={data.story.title} />
							</div>
						{/each}
					</div>
				{/if}

				{#if data.story.moralMessage}
					<div class="border-t border-kulit/20 pt-4">
						<p class="label mb-2">Pesan Moral</p>
						<p class="font-display italic text-base text-bark">{data.story.moralMessage}</p>
					</div>
				{/if}
			</div>

			<!-- Review history -->
			{#if data.reviews.length > 0}
				<div class="panel-card p-5">
					<h2 class="heading text-base mb-4">Riwayat Ulasan</h2>
					<ol class="space-y-3">
						{#each data.reviews as rev (rev.id)}
							<li class="flex gap-3 items-start">
								<span
									class="mt-0.5 shrink-0 px-2 py-0.5 rounded text-xs font-medium {ACTION_CLASS[
										rev.action
									] ?? 'bg-bark/10 text-bark'}"
								>
									{ACTION_LABEL[rev.action] ?? rev.action}
								</span>
								<div class="flex-1 min-w-0">
									<p class="font-mono text-xs text-bark/55">
										{rev.reviewerName ?? rev.reviewerEmail ?? 'Admin'} ·
										{formatDate(rev.createdAt)}
									</p>
									{#if rev.notes}
										<p class="prose-body text-sm mt-1">{rev.notes}</p>
									{/if}
								</div>
							</li>
						{/each}
					</ol>
				</div>
			{/if}
		</div>

		<!-- Review form -->
		<div class="lg:sticky lg:top-20">
			<form method="POST" action="?/review" class="panel-card p-5 space-y-4">
				<h2 class="heading text-base">Beri Keputusan</h2>

				{#if form?.error}
					<p class="text-sm text-danger bg-danger/10 rounded-lg px-3 py-2">{form.error}</p>
				{/if}

				<div class="space-y-1.5">
					<label for="notes" class="block text-sm font-semibold text-bark"
						>Catatan untuk kontributor</label
					>
					<textarea
						id="notes"
						name="notes"
						rows="4"
						placeholder="Opsional — jelaskan keputusan atau minta revisi..."
						class="input-base resize-y text-sm"
					></textarea>
				</div>

				<div class="flex flex-col gap-2">
					<button
						type="submit"
						name="action"
						value="approved"
						class="w-full py-2.5 rounded-lg bg-success text-cream text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
					>
						<span class="i-ph-check-circle-bold" aria-hidden="true"></span>
						Terbitkan
					</button>
					<button
						type="submit"
						name="action"
						value="requested_changes"
						class="w-full py-2.5 rounded-lg bg-padi text-night text-sm font-semibold hover:bg-padi/90 transition-colors flex items-center justify-center gap-2"
					>
						<span class="i-ph-arrows-clockwise-bold" aria-hidden="true"></span>
						Minta Revisi
					</button>
					<button
						type="submit"
						name="action"
						value="commented"
						class="btn-soft w-full py-2.5 text-sm flex items-center justify-center gap-2"
					>
						<span class="i-ph-chat-bold" aria-hidden="true"></span>
						Tambah Komentar
					</button>
					<button
						type="submit"
						name="action"
						value="rejected"
						class="w-full py-2.5 rounded-lg bg-danger text-cream text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
					>
						<span class="i-ph-x-circle-bold" aria-hidden="true"></span>
						Tolak
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
