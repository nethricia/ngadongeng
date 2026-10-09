<script lang="ts">
	import { resolve } from '$app/paths';
	import Chip from '$lib/components/ui/Chip.svelte';
	import type { DongengFormat } from '$lib/types';

	interface CategoryItem {
		format: DongengFormat;
		label: string;
		description: string;
		icon: string;
		count: number;
	}

	const categories: CategoryItem[] = [
		{
			format: 'teks',
			label: 'Cerita Teks',
			description:
				'Baca dongeng dalam bahasa Sunda atau Indonesia. Cocok untuk yang suka membaca sambil membayangkan.',
			icon: 'i-ph-book-open',
			count: 5
		},
		{
			format: 'buku-cerita-bergambar',
			label: 'Buku Cerita Bergambar',
			description: 'Nikmati cerita rakyat lewat gambar. Cocok untuk anak-anak dan pembaca visual.',
			icon: 'i-ph-paint-brush',
			count: 2
		},
		{
			format: 'audio',
			label: 'Audio & Rekaman',
			description:
				'Dengarkan dongeng yang disampaikan langsung. Seperti duduk di sebelah si pencerita.',
			icon: 'i-ph-microphone',
			count: 3
		},
		{
			format: 'audiovisual',
			label: 'Video & Animasi',
			description: 'Tonton cerita rakyat dalam format flipbook, animasi, atau video dokumenter.',
			icon: 'i-ph-video-camera',
			count: 2
		}
	];
</script>

<section class="py-16 bg-parchment/50">
	<div class="container-md">
		<div class="mb-10">
			<p class="label text-tanah mb-2">FORMAT CERITA</p>
			<h2 class="heading text-2xl md:text-3xl">Pilih Cara Kamu Menikmati Dongeng</h2>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			{#each categories as cat}
				<a
					href={resolve(`/cerita?format=${cat.format}`)}
					class="card-hover p-6 flex flex-col gap-4 min-h-[180px] relative overflow-hidden no-underline rounded-lg"
				>
					<i
						class="{cat.icon} text-6xl text-tanah/15 absolute -right-3 -bottom-3 pointer-events-none"
						aria-hidden="true"
					></i>
					<Chip format={cat.format} label={cat.label} />
					<div>
						<h3 class="heading text-lg mb-2">{cat.label}</h3>
						<p class="prose-body text-sm text-bark/60">{cat.description}</p>
					</div>
					<p class="font-mono text-xs text-kulit mt-auto">{cat.count} cerita</p>
				</a>
			{/each}
		</div>
	</div>
</section>
