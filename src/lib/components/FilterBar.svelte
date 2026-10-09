<script lang="ts">
	interface FilterState {
		format: string;
		category: string;
		sort: string;
	}

	interface Props {
		filter?: FilterState;
		onchange?: (filter: FilterState) => void;
	}

	let { filter = { format: 'semua', category: 'semua', sort: 'terbaru' }, onchange }: Props =
		$props();

	let local = $state({ ...filter });

	const formats = [
		{ value: 'semua', label: 'Semua' },
		{ value: 'teks', label: 'Teks' },
		{ value: 'buku-cerita-bergambar', label: 'Buku Cerita Bergambar' },
		{ value: 'audio', label: 'Audio' },
		{ value: 'audiovisual', label: 'Audiovisual' }
	];

	const categories = [
		{ value: 'semua', label: 'Semua Kategori' },
		{ value: 'binatang', label: 'Tokoh Binatang' },
		{ value: 'dewa-dewi', label: 'Dewa-Dewi' },
		{ value: 'manusia', label: 'Tokoh Manusia' },
		{ value: 'asal-usul', label: 'Asal-Usul Tempat' }
	];

	const sorts = [
		{ value: 'terbaru', label: 'Terbaru' },
		{ value: 'terpopuler', label: 'Terpopuler' },
		{ value: 'az', label: 'A–Z' }
	];

	function update(key: keyof FilterState, value: string) {
		local = { ...local, [key]: value };
		onchange?.(local);
	}
</script>

<div class="flex flex-wrap gap-3 items-center">
	<!-- Format tabs -->
	<div class="flex gap-1 bg-parchment p-1 rounded-md" role="tablist" aria-label="Filter format">
		{#each formats as f (f.value)}
			<button
				role="tab"
				aria-selected={local.format === f.value}
				onclick={() => update('format', f.value)}
				class="px-3 py-1.5 rounded border border-transparent text-sm font-sans font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-tanah/20
               {local.format === f.value
					? 'bg-cream shadow-sm text-bark'
					: 'text-kulit hover:text-bark'}"
			>
				{f.label}
			</button>
		{/each}
	</div>

	<!-- Category select -->
	<select
		value={local.category}
		onchange={(e) => update('category', (e.target as HTMLSelectElement).value)}
		class="input-base max-w-[180px] py-1.5"
		aria-label="Filter kategori"
	>
		{#each categories as c (c.value)}
			<option value={c.value}>{c.label}</option>
		{/each}
	</select>

	<!-- Sort select -->
	<select
		value={local.sort}
		onchange={(e) => update('sort', (e.target as HTMLSelectElement).value)}
		class="input-base max-w-[150px] py-1.5"
		aria-label="Urutan tampilan"
	>
		{#each sorts as s (s.value)}
			<option value={s.value}>{s.label}</option>
		{/each}
	</select>
</div>
