<script lang="ts">
	import { base, resolve } from '$app/paths';
	import type { DongengStory } from '$lib/types';
	import Avatar from './ui/Avatar.svelte';
	import Chip from './ui/Chip.svelte';

	interface Props {
		story: DongengStory;
	}
	let { story }: Props = $props();

	function relativeDate(iso: string): string {
		const diff = Date.now() - new Date(iso).getTime();
		const days = Math.floor(diff / 86400000);
		if (days === 0) return 'Hari ini';
		if (days < 2) return '1 hari lalu';
		if (days < 30) return `${days} hari lalu`;
		const m = Math.floor(days / 30);
		return m < 12 ? `${m} bulan lalu` : `${Math.floor(m / 12)} tahun lalu`;
	}

	const fallbacks: Record<string, string> = {
		teks: 'from-parchment to-kulit/40',
		komik: 'from-tanah/20 to-parchment',
		audio: 'from-cai/20 to-parchment',
		audiovisual: 'from-night/80 to-cai-dark/60'
	};

	let gradient = $derived(fallbacks[story.format]);
	let date = $derived(relativeDate(story.publishedAt));

	/** Shown when a story has no cover of its own. */
	const FALLBACK_COVER = `${base}/assets/cropped-headermini.png`;
	let hasCover = $derived(Boolean(story.coverUrl));
	let coverUrl = $derived(story.coverUrl || FALLBACK_COVER);
</script>

<a
	href={resolve('/cerita/[slug]', { slug: story.slug })}
	class="card-hover flex rounded-lg overflow-hidden no-underline"
>
	<!-- Cover — falls back to the Ngadongeng mark when none is set. -->
	<div class="relative w-32 h-24 flex-shrink-0 bg-gradient-to-br {gradient}">
		<img
			src={coverUrl}
			alt={story.title}
			class="w-full h-full {hasCover ? 'object-cover' : 'object-contain'}"
			loading="lazy"
		/>
		<div class="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[80%]">
			{#each story.formats as fmt (fmt)}
				<Chip format={fmt} />
			{/each}
		</div>
	</div>
	<div class="flex-1 p-4 min-w-0">
		<h3 class="heading text-sm line-clamp-2 mb-1">{story.title}</h3>
		<div class="flex items-center gap-2 mt-2">
			<Avatar name={story.author.displayName} src={story.author.avatarUrl} size="sm" />
			<div>
				<p class="font-sans text-xs font-medium text-bark">{story.author.displayName}</p>
				<p class="font-mono text-xs text-kulit">{date}</p>
			</div>
		</div>
	</div>
</a>
