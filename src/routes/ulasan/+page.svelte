<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	function formatDate(d: Date | null | undefined) {
		if (!d) return '—';
		return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(
			new Date(d)
		);
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="heading text-2xl">Antrian Ulasan</h1>
		<p class="label mt-1">{data.pending.length} cerita menunggu</p>
	</div>

	{#if data.pending.length === 0}
		<div class="panel-card p-12 text-center">
			<div
				class="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-5"
			>
				<span class="i-ph-check-circle text-2xl text-success" aria-hidden="true"></span>
			</div>
			<h2 class="heading text-md text-bark/70 mb-2">Semua Bersih!</h2>
			<p class="prose-body text-sm text-bark/50">Tidak ada cerita yang menunggu ulasan saat ini.</p>
		</div>
	{:else}
		<div class="panel-card overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="border-b border-kulit/30 bg-bark/5">
						<tr>
							<th class="px-4 py-3 text-left label">Judul</th>
							<th class="px-4 py-3 text-left label hidden sm:table-cell">Format</th>
							<th class="px-4 py-3 text-left label hidden md:table-cell">Pengirim</th>
							<th class="px-4 py-3 text-left label hidden lg:table-cell">Dikirim</th>
							<th class="px-4 py-3"></th>
						</tr>
					</thead>
					<tbody class="divide-y divide-kulit/20">
						{#each data.pending as story (story.id)}
							<tr class="hover:bg-cream/60 transition-colors">
								<td class="px-4 py-3.5 font-medium text-bark">{story.title}</td>
								<td class="px-4 py-3.5 text-bark/70 capitalize hidden sm:table-cell"
									>{story.format}</td
								>
								<td class="px-4 py-3.5 text-bark/70 hidden md:table-cell">
									{story.submitterName ?? story.submitterEmail ?? '—'}
								</td>
								<td class="px-4 py-3.5 text-bark/55 text-xs hidden lg:table-cell">
									{formatDate(story.submittedAt)}
								</td>
								<td class="px-4 py-3.5 text-right">
									<a
										href={resolve('/ulasan/[id]', { id: story.id })}
										class="inline-flex items-center gap-1.5 bg-cai text-cream px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-cai-dark transition-colors"
									>
										Tinjau
										<span class="i-ph-arrow-right text-xs" aria-hidden="true"></span>
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
