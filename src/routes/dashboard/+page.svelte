<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const STATUS_LABEL: Record<string, string> = {
		draft: 'Draf',
		pending_review: 'Menunggu Ulasan',
		needs_revision: 'Perlu Revisi',
		published: 'Terbit',
		rejected: 'Ditolak',
		archived: 'Diarsipkan'
	};
	const STATUS_CLASS: Record<string, string> = {
		draft: 'status-draft',
		pending_review: 'status-pending',
		needs_revision: 'status-revision',
		published: 'status-published',
		rejected: 'status-rejected',
		archived: 'status-archived'
	};

	function formatDate(d: Date | null | undefined) {
		if (!d) return '—';
		return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(d));
	}
</script>

<div class="space-y-6">
	<div class="flex items-start justify-between gap-4">
		<div>
			<h1 class="heading text-2xl">Cerita Saya</h1>
			<p class="label mt-1">{data.stories.length} cerita</p>
		</div>
		<a href={resolve('/dashboard/cerita/baru')} class="btn-primary btn-sm shrink-0">
			<span class="i-ph-plus-bold text-xs" aria-hidden="true"></span>
			Kirim Baru
		</a>
	</div>

	{#if data.stories.length === 0}
		<div class="panel-card p-12 text-center">
			<div class="w-16 h-16 rounded-full bg-kulit/20 flex items-center justify-center mx-auto mb-5">
				<span class="i-ph-book-open text-2xl text-bark/40" aria-hidden="true"></span>
			</div>
			<h2 class="heading text-md text-bark/70 mb-2">Belum ada cerita</h2>
			<p class="prose-body text-sm text-bark/50 mb-6">
				Bagikan cerita pertamamu dan mulai berkontribusi!
			</p>
			<a href={resolve('/dashboard/cerita/baru')} class="btn-primary btn-md inline-flex">
				Kirim Cerita Pertamamu
			</a>
		</div>
	{:else}
		<div class="panel-card overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="border-b border-kulit/30 bg-bark/5">
						<tr>
							<th class="px-4 py-3 text-left label">Judul</th>
							<th class="px-4 py-3 text-left label hidden sm:table-cell">Format</th>
							<th class="px-4 py-3 text-left label">Status</th>
							<th class="px-4 py-3 text-left label hidden md:table-cell">Diperbarui</th>
							<th class="px-4 py-3"></th>
						</tr>
					</thead>
					<tbody class="divide-y divide-kulit/20">
						{#each data.stories as story (story.id)}
							{@const note = data.feedback[story.id]}
							<tr class="hover:bg-cream/60 transition-colors">
								<td class="px-4 py-3.5 font-medium text-bark">
									{story.title}
									{#if note && (story.status === 'needs_revision' || story.status === 'rejected')}
										<p class="mt-1.5 max-w-md font-sans text-xs font-normal text-bark/60">
											<span class="font-semibold text-cai-dark">Catatan kurator:</span>
											{note}
										</p>
									{/if}
								</td>
								<td class="px-4 py-3.5 text-bark/70 capitalize hidden sm:table-cell"
									>{story.format}</td
								>
								<td class="px-4 py-3.5">
									<span class={STATUS_CLASS[story.status] ?? 'status-draft'}>
										{STATUS_LABEL[story.status] ?? story.status}
									</span>
								</td>
								<td class="px-4 py-3.5 text-bark/55 text-xs hidden md:table-cell"
									>{formatDate(story.updatedAt)}</td
								>
								<td class="px-4 py-3.5 text-right whitespace-nowrap">
									{#if story.status === 'published'}
										<a
											href={resolve('/cerita/[slug]', { slug: story.slug })}
											class="font-mono text-xs text-cai hover:underline">Lihat →</a
										>
									{:else if story.status === 'draft' || story.status === 'rejected'}
										<a
											href={resolve('/dashboard/cerita/' + story.id + '/sunting')}
											class="font-mono text-xs text-tanah hover:underline">Edit →</a
										>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
