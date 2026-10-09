<script lang="ts">
	import { base, resolve } from '$app/paths';
	import type { DongengStory } from '$lib/types';
	import Avatar from './ui/Avatar.svelte';
	import Badge from './ui/Badge.svelte';
	import Chip from './ui/Chip.svelte';

	interface Props {
		story: DongengStory;
	}

	let { story }: Props = $props();

	// Relative date formatter
	function relativeDate(iso: string): string {
		const diff = Date.now() - new Date(iso).getTime();
		const days = Math.floor(diff / 86400000);
		if (days === 0) return 'Hari ini';
		if (days === 1) return '1 hari lalu';
		if (days < 30) return `${days} hari lalu`;
		const months = Math.floor(days / 30);
		if (months < 12) return `${months} bulan lalu`;
		return `${Math.floor(months / 12)} tahun lalu`;
	}

	// Cover fallback gradients by format
	const fallbackGradients: Record<string, string> = {
		teks: 'from-parchment to-kulit/40',
		'buku-cerita-bergambar': 'from-tanah/20 to-parchment',
		audio: 'from-cai/20 to-parchment',
		audiovisual: 'from-night/80 to-cai-dark/60'
	};

	const categoryLabels: Record<string, string> = {
		binatang: 'Tokoh Binatang',
		'dewa-dewi': 'Dewa-Dewi',
		manusia: 'Tokoh Manusia',
		'asal-usul': 'Asal-Usul Tempat'
	};

	let gradient = $derived(fallbackGradients[story.format]);
	let categoryLabel = $derived(categoryLabels[story.category] ?? story.category);
	let date = $derived(relativeDate(story.publishedAt));

	/** Shown when a story has no cover of its own. */
	const FALLBACK_COVER = `${base}/assets/cropped-headermini.png`;
	let hasCover = $derived(Boolean(story.coverUrl));
	let coverUrl = $derived(story.coverUrl || FALLBACK_COVER);
</script>

<a
	href={resolve('/cerita/[slug]', { slug: story.slug })}
	class="card-hover block rounded-lg overflow-hidden no-underline {story.featured
		? 'border-l-4 border-padi'
		: ''}"
>
	<!-- Cover image — falls back to the Ngadongeng mark when none is set. -->
	<div class="relative aspect-video bg-gradient-to-br {gradient} overflow-hidden">
		<img
			src={coverUrl}
			alt={story.title}
			class="w-full h-full {hasCover ? 'object-cover' : 'object-contain'}"
			loading="lazy"
		/>
		<!-- One chip per medium the story contains -->
		<div class="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
			{#each story.formats as fmt (fmt)}
				<Chip format={fmt} />
			{/each}
		</div>
		<!-- Featured badge -->
		{#if story.featured}
			<div class="absolute top-3 right-3">
				<Badge type="unggulan" />
			</div>
		{/if}
	</div>

	<!-- Body -->
	<div class="p-5 {story.featured ? 'bg-padi/5' : ''}">
		<p class="label mb-2">{categoryLabel}{story.duration ? ` · ${story.duration}` : ''}</p>
		<h3 class="heading text-md line-clamp-2 mb-2">{story.title}</h3>
		{#if story.excerpt}
			<p class="prose-body text-sm line-clamp-2 text-bark/70 mb-4">{story.excerpt}</p>
		{/if}

		<!-- Footer -->
		<div class="flex items-center justify-between border-t border-kulit/30 pt-3 mt-3">
			<div class="flex items-center gap-2">
				<Avatar name={story.author.displayName} src={story.author.avatarUrl} size="sm" />
				<div>
					<p class="font-sans text-xs font-medium text-bark">{story.author.displayName}</p>
					<p class="font-mono text-xs text-kulit">{date}</p>
				</div>
			</div>
			{#if story.viewCount}
				<p class="font-mono text-xs text-kulit flex items-center gap-1">
					<i class="i-ph-eye" aria-hidden="true"></i>
					{story.viewCount.toLocaleString('id')}
				</p>
			{/if}
		</div>
	</div>
</a>
