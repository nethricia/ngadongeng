<script lang="ts">
	import { resolve } from '$app/paths';
	import DongengCardHorizontal from '$lib/components/DongengCardHorizontal.svelte';
	import { MediaBlock } from '$lib/components/media';
	import ReactionBar from '$lib/components/ReactionBar.svelte';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Chip from '$lib/components/ui/Chip.svelte';
	import { MEDIA_BLOCK_LABELS } from '$lib/media';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let story = $derived(data.story);
	let related = $derived(data.related ?? []);

	const categoryLabels: Record<string, string> = {
		binatang: 'Dongeng Tokoh Binatang',
		'dewa-dewi': 'Dongeng Tokoh Dewa-Dewi',
		manusia: 'Dongeng Tokoh Manusia',
		'asal-usul': 'Asal-Usul Tempat',
		sejarah: 'Cerita Sejarah',
		jenaka: 'Cerita Jenaka',
		legenda: 'Legenda'
	};

	const languageLabels: Record<string, string> = {
		sunda: 'Bahasa Sunda',
		'sunda-buhun': 'Sunda Buhun (Kuna)',
		indonesia: 'Bahasa Indonesia',
		'sunda-indonesia': 'Dwibahasa',
		dwibahasa: 'Dwibahasa'
	};

	const regionLabels: Record<string, string> = {
		priangan: 'Tatar Priangan',
		banten: 'Tatar Banten',
		cirebon: 'Tatar Cirebon',
		'pesisir-utara': 'Pesisir Utara',
		'sunda-umum': 'Tatar Sunda (Umum)',
		'melayu-sunda': 'Melayu-Sunda'
	};

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	let pageTitle = $derived(story ? `${story.title} — Ngadongeng` : 'Cerita — Ngadongeng');
	let pageDesc = $derived(story ? (story.excerpt ?? story.synopsis ?? '') : '');
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDesc} />
</svelte:head>

{#if story}
	<!-- Story header -->
	<div class="bg-parchment/60 border-b border-kulit/30">
		<div class="container-md py-10">
			<!-- Breadcrumb -->
			<nav
				class="flex items-center gap-2 font-mono text-xs text-kulit mb-6"
				aria-label="Breadcrumb"
			>
				<a href={resolve('/')} class="hover:text-tanah transition-colors">Beranda</a>
				<span>/</span>
				<a href={resolve('/cerita')} class="hover:text-tanah transition-colors">Cerita</a>
				<span>/</span>
				<span class="text-bark">{story.title}</span>
			</nav>

			<!-- Format chips + category -->
			<div class="flex flex-wrap items-center gap-3 mb-4">
				{#each story.formats as fmt (fmt)}
					<Chip format={fmt} />
				{/each}
				<span class="label">{categoryLabels[story.category] ?? story.category}</span>
			</div>

			<!-- Title -->
			<h1
				class="font-display font-bold text-3xl md:text-4xl text-bark mb-6 max-w-3xl leading-tight"
			>
				{story.title}
			</h1>

			<!-- Author + meta -->
			<div class="flex flex-wrap items-center gap-6">
				<div class="flex items-center gap-3">
					<Avatar name={story.author.displayName} src={story.author.avatarUrl} size="md" />
					<div>
						<div class="flex items-center gap-2">
							<p class="font-sans text-sm font-semibold text-bark">{story.author.displayName}</p>
							<Badge type={story.author.role} />
						</div>
						<p class="font-mono text-xs text-kulit">
							Diterbitkan {formatDate(story.publishedAt)}
						</p>
					</div>
				</div>
				{#if story.duration}
					<div class="flex items-center gap-1.5 font-mono text-xs text-kulit">
						<i class="i-ph-clock" aria-hidden="true"></i>
						{story.duration}
					</div>
				{/if}
				{#if story.viewCount}
					<div class="flex items-center gap-1.5 font-mono text-xs text-kulit">
						<i class="i-ph-eye" aria-hidden="true"></i>
						{story.viewCount.toLocaleString('id')} kali dilihat
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Main content area -->
	<div class="container-md py-10">
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
			<!-- Story body -->
			<article>
				<!-- Synopsis -->
				{#if story.synopsis}
					<div class="bg-parchment border-l-4 border-tanah rounded-r-lg p-6 mb-8">
						<p class="label text-tanah mb-2">SINOPSIS</p>
						<p class="prose-body text-bark/80">{story.synopsis}</p>
					</div>
				{/if}

				<!-- Body text -->
				{#if story.bodyText}
					<section class="mb-10">
						<p class="label text-tanah mb-3">BACA</p>
						<div class="prose max-w-none">
							{#each story.bodyText.split('\n\n') as paragraph, i (i)}
								{#if paragraph.trim()}
									<p class="prose-body mb-5 text-bark/85">{paragraph.trim()}</p>
								{/if}
							{/each}
						</div>
					</section>
				{/if}

				<!-- Embedded media: buku cerita bergambar, audio, audiovisual -->
				{#if story.media.length > 0}
					<div class="space-y-10 mb-10">
						{#each story.media as entry, i (`${entry.kind}-${i}`)}
							<section>
								<p class="label text-tanah mb-3">{MEDIA_BLOCK_LABELS[entry.kind]}</p>
								<MediaBlock {entry} title={story.title} />
							</section>
						{/each}
					</div>
				{/if}

				<!-- Moral message -->
				{#if story.moralMessage}
					<blockquote class="border-l-4 border-padi bg-padi/10 rounded-r-lg p-6 my-8">
						<p class="label text-padi-dark mb-2">PESAN MORAL</p>
						<p class="font-display italic text-lg text-bark">{story.moralMessage}</p>
					</blockquote>
				{/if}

				<!-- Source ref -->
				{#if story.sourceRef}
					<div class="border-t border-kulit/30 pt-6 mt-8">
						<p class="label mb-2">SUMBER</p>
						<p class="prose-body text-sm text-bark/60">{story.sourceRef}</p>
					</div>
				{/if}

				<!-- Reactions -->
				<div class="border-t border-kulit/30 pt-8 mt-8">
					<p class="label mb-4">REAKSIMU</p>
					<ReactionBar storyId={story.id} />
				</div>

				<!-- Share -->
				<div class="border-t border-kulit/30 pt-6 mt-6">
					<p class="label mb-4">BAGIKAN CERITA INI</p>
					<div class="flex gap-3">
						<a
							href="https://wa.me/?text={encodeURIComponent(story.title)}"
							target="_blank"
							rel="noopener noreferrer"
							class="btn-soft btn-sm flex items-center gap-2"
						>
							<i class="i-ph-whatsapp-logo text-lg" aria-hidden="true"></i>
							WhatsApp
						</a>
						<button
							onclick={() => {
								if (typeof navigator !== 'undefined') {
									navigator.clipboard.writeText(window.location.href);
								}
							}}
							class="btn-soft btn-sm flex items-center gap-2"
						>
							<i class="i-ph-link text-lg" aria-hidden="true"></i>
							Salin Tautan
						</button>
					</div>
				</div>

				<!-- Discussion placeholder -->
				<div class="border-t border-kulit/30 pt-8 mt-8">
					<h2 class="heading text-xl mb-6">Diskusi</h2>
					<div class="bg-parchment rounded-lg p-6 text-center">
						<p class="prose-body text-bark/60 mb-4">
							<a href={resolve('/masuk')} class="text-tanah font-semibold hover:underline">Masuk</a>
							untuk ikut berdiskusi →
						</p>
					</div>
				</div>
			</article>

			<!-- Sidebar -->
			<aside>
				<div class="sticky top-24 space-y-6">
					<div class="card p-5 space-y-4">
						<h3 class="heading text-sm">Detail Cerita</h3>
						<div class="space-y-3">
							<div>
								<div class="label text-kulit mb-1">Bahasa</div>
								<div class="font-sans text-sm text-bark">
									{languageLabels[story.language] ?? story.language}
								</div>
							</div>
							<div>
								<div class="label text-kulit mb-1">Wilayah</div>
								<div class="font-sans text-sm text-bark">
									{regionLabels[story.region] ?? story.region}
								</div>
							</div>
							{#if story.tags?.length}
								<div>
									<div class="label text-kulit mb-2">Tag</div>
									<div class="flex flex-wrap gap-1.5">
										{#each story.tags as tag, i (i)}
											<a
												href={resolve(`/cerita?q=${encodeURIComponent(tag)}`)}
												class="chip chip-teks text-xs hover:bg-padi/30 transition-colors">{tag}</a
											>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</aside>
		</div>

		<!-- Related stories -->
		{#if related.length > 0}
			<section class="mt-16 pt-12 border-t border-kulit/30">
				<h2 class="heading text-xl mb-6">Cerita yang Mungkin Kamu Suka</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each related as relStory (relStory.id)}
						<DongengCardHorizontal story={relStory} />
					{/each}
				</div>
			</section>
		{/if}
	</div>
{:else}
	<div class="container-md py-20 text-center">
		<div class="w-20 h-20 rounded-full bg-parchment flex items-center justify-center mx-auto mb-6">
			<i class="i-ph-book-open text-3xl text-kulit" aria-hidden="true"></i>
		</div>
		<h1 class="heading text-2xl mb-3">Cerita tidak ditemukan.</h1>
		<p class="prose-body text-bark/60 mb-6">Mungkin cerita ini sudah dipindah atau dihapus.</p>
		<a href={resolve('/cerita')} class="btn-primary btn-md inline-flex">← Kembali ke Semua Cerita</a
		>
	</div>
{/if}
