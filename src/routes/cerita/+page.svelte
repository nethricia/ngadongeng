<script lang="ts">
	import FilterBar from '$lib/components/FilterBar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { StoryGrid } from '$lib/components/sections';
	import type { DongengFormat, DongengStory } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let query = $state('');
	let filter = $state({ format: 'semua', category: 'semua', sort: 'terbaru' });

	function applyFilters(
		allStories: DongengStory[],
		q: string,
		f: { format: string; category: string; sort: string }
	): DongengStory[] {
		let result = [...allStories];

		if (q.trim()) {
			const lower = q.toLowerCase();
			result = result.filter(
				(s) =>
					s.title.toLowerCase().includes(lower) ||
					s.excerpt?.toLowerCase().includes(lower) ||
					s.tags?.some((t) => t.toLowerCase().includes(lower))
			);
		}

		// Match any story that *contains* the medium, not just the primary one —
		// a teks+audio story appears under both tabs.
		if (f.format !== 'semua') {
			result = result.filter((s) => s.formats.includes(f.format as DongengFormat));
		}

		if (f.category !== 'semua') {
			result = result.filter((s) => s.category === f.category);
		}

		if (f.sort === 'terbaru') {
			result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
		} else if (f.sort === 'terpopuler') {
			result.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0));
		} else if (f.sort === 'az') {
			result.sort((a, b) => a.title.localeCompare(b.title, 'id'));
		}

		return result;
	}

	let filtered = $derived(applyFilters(data.stories, query, filter));
</script>

<svelte:head>
	<title>Semua Cerita — Ngadongeng</title>
	<meta
		name="description"
		content="Jelajahi koleksi dongeng dan cerita rakyat Sunda dari berbagai format dan wilayah."
	/>
</svelte:head>

<!-- Page header -->
<div class="bg-parchment border-b border-kulit/30 py-12">
	<div class="container-md">
		<p class="label text-tanah mb-3">PERPUSTAKAAN CERITA</p>
		<h1 class="heading text-3xl md:text-4xl mb-3">Semua Cerita</h1>
		<p class="prose-body text-bark/70">
			Jelajahi koleksi dongeng dan cerita rakyat Sunda dari berbagai format dan wilayah.
		</p>
	</div>
</div>

<div class="container-md py-10">
	<!-- Search -->
	<div class="mb-6">
		<SearchBar bind:value={query} placeholder="Cari judul, tokoh, atau kata kunci..." />
	</div>

	<!-- Filter bar -->
	<div class="mb-8">
		<FilterBar
			{filter}
			onchange={(f) => {
				filter = f;
			}}
		/>
	</div>

	<!-- Results count -->
	<p class="label mb-6">Menampilkan {filtered.length} dari {data.stories.length} cerita</p>

	<!-- Grid -->
	<StoryGrid stories={filtered} />
</div>
