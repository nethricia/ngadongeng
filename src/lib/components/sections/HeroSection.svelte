<script lang="ts">
	import { base, resolve } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		totalCerita?: number;
		totalKontributor?: number;
		totalKegiatan?: number;
		tahunBerjalan?: number;
	}
	let {
		totalCerita = 12,
		totalKontributor = 3,
		totalKegiatan = 47,
		tahunBerjalan = 6
	}: Props = $props();
</script>

<section class="relative min-h-[85vh] flex items-center overflow-hidden bg-cream">
	<!-- Decorative background: subtle batik-like radial pattern -->
	<div class="absolute inset-0 pointer-events-none" aria-hidden="true">
		<div
			class="absolute inset-0 opacity-[0.06]"
			style="background-image: radial-gradient(circle at 20% 50%, #C1622F 1px, transparent 1px), radial-gradient(circle at 80% 20%, #E8B84B 1px, transparent 1px), radial-gradient(circle at 60% 80%, #2C3E6B 1px, transparent 1px); background-size: 40px 40px, 60px 60px, 50px 50px;"
		></div>
		<div
			class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent"
		></div>
	</div>

	<div class="container-md relative z-10 py-20 w-full">
		<!-- Overline -->
		<p class="label text-tanah mb-5">TBM Pabukon Ngadongeng · Sumedang, Jawa Barat</p>

		<!-- Heading -->
		<h1
			class="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-bark leading-tight mb-6 max-w-3xl"
		>
			Yuk, Ngadongeng.
		</h1>

		<!-- Subheading -->
		<p class="prose-body text-md text-bark/70 max-w-xl mb-10 leading-relaxed">
			Temukan kumpulan dongeng dan cerita rakyat Sunda — dalam teks, buku cerita bergambar, rekaman
			suara, dan video. Dari Tatar Sunda untuk semua yang ingin mengenal dan berbagi cerita.
		</p>

		<!-- CTAs -->
		<div class="flex flex-wrap gap-4 mb-16">
			<Button variant="primary" size="lg" href={resolve('/cerita')}>Jelajahi Cerita →</Button>
			<Button variant="secondary" size="lg" href={resolve('/dashboard/cerita/baru')}
				>Bagikan Dongengmu</Button
			>
		</div>

		<!-- Brand visual -->
		<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
			<div>
				<!-- Stats -->
				<div class="flex flex-wrap gap-8 md:gap-12 border-t border-kulit/30 pt-8">
					<div>
						<p class="font-display font-bold text-3xl text-tanah">{totalCerita}+</p>
						<p class="label mt-1">Dongeng</p>
					</div>
					<div>
						<p class="font-display font-bold text-3xl text-tanah">{totalKontributor}+</p>
						<p class="label mt-1">Kontributor</p>
					</div>
					<div>
						<p class="font-display font-bold text-3xl text-tanah">{totalKegiatan}+</p>
						<p class="label mt-1">Kegiatan Mendongeng</p>
					</div>
					<div>
						<p class="font-display font-bold text-3xl text-tanah">{tahunBerjalan}</p>
						<p class="label mt-1">Tahun Berjalan</p>
					</div>
				</div>
			</div>
			<div class="hidden lg:flex justify-end">
				<div class="rounded-[2rem] border border-kulit/20 bg-cream p-6 shadow-2xl">
					<img
						src={`${base}/assets/cropped-headermini.png`}
						alt="Logo Ngadongeng"
						class="w-72 h-auto object-contain"
					/>
				</div>
			</div>
		</div>
		<div class="flex flex-wrap gap-8 md:gap-12 border-t border-kulit/30 pt-8">
			<div>
				<p class="font-display font-bold text-3xl text-tanah">{totalCerita}+</p>
				<p class="label mt-1">Dongeng</p>
			</div>
			<div>
				<p class="font-display font-bold text-3xl text-tanah">{totalKontributor}+</p>
				<p class="label mt-1">Kontributor</p>
			</div>
			<div>
				<p class="font-display font-bold text-3xl text-tanah">{totalKegiatan}+</p>
				<p class="label mt-1">Kegiatan Mendongeng</p>
			</div>
			<div>
				<p class="font-display font-bold text-3xl text-tanah">{tahunBerjalan}</p>
				<p class="label mt-1">Tahun Berjalan</p>
			</div>
		</div>
	</div>
</section>
