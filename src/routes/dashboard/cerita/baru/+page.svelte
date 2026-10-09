<script lang="ts">
	import { resolve } from '$app/paths';
	import { MediaBlock } from '$lib/components/media';
	import {
		isHttpUrl,
		BUKU_CERITA_BERGAMBAR_SOURCE_LABELS,
		AUDIO_SOURCE_LABELS,
		VIDEO_SOURCE_LABELS
	} from '$lib/media';
	import type { AudioSource, BukuCeritaBergambarSource, StoryMedia, VideoSource } from '$lib/types';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	// Each block is optional; the server derives the story's primary format from
	// whichever blocks are filled in.
	let enabled = $state({
		teks: true,
		bukuCeritaBergambar: false,
		audio: false,
		audiovisual: false
	});

	let bukuCeritaBergambarSource = $state<BukuCeritaBergambarSource>('gdrive');
	let bukuCeritaBergambarUrl = $state('');
	let audioSource = $state<AudioSource>('soundcloud');
	let audioUrl = $state('');
	let videoSource = $state<VideoSource>('youtube');
	let videoUrl = $state('');

	const CATEGORY_OPTIONS = [
		{ value: 'binatang', label: 'Binatang' },
		{ value: 'dewa-dewi', label: 'Dewa-Dewi' },
		{ value: 'manusia', label: 'Manusia' },
		{ value: 'asal-usul', label: 'Asal-Usul' },
		{ value: 'sejarah', label: 'Sejarah' },
		{ value: 'jenaka', label: 'Jenaka' },
		{ value: 'legenda', label: 'Legenda' }
	];
	const GENRE_OPTIONS = [
		{ value: 'fabel', label: 'Fabel' },
		{ value: 'legenda', label: 'Legenda' },
		{ value: 'mite', label: 'Mite' },
		{ value: 'sage', label: 'Sage' },
		{ value: 'dongeng-anak', label: 'Dongeng Anak' },
		{ value: 'pantun', label: 'Pantun' },
		{ value: 'guguritan', label: 'Guguritan' },
		{ value: 'parabel', label: 'Parabel' },
		{ value: 'lainnya', label: 'Lainnya' }
	];
	const LANGUAGE_OPTIONS = [
		{ value: 'sunda', label: 'Sunda' },
		{ value: 'sunda-buhun', label: 'Sunda Buhun' },
		{ value: 'indonesia', label: 'Indonesia' },
		{ value: 'sunda-indonesia', label: 'Sunda & Indonesia' }
	];
	const BUKU_CERITA_BERGAMBAR_SOURCE_OPTIONS = Object.entries(BUKU_CERITA_BERGAMBAR_SOURCE_LABELS);
	const AUDIO_SOURCE_OPTIONS = Object.entries(AUDIO_SOURCE_LABELS);
	const VIDEO_SOURCE_OPTIONS = Object.entries(VIDEO_SOURCE_LABELS);

	/** Guidance under each URL field, so contributors paste the right link shape. */
	const HINTS: Record<string, string> = {
		'buku-cerita-bergambar:gdrive':
			'Tempel tautan bagikan berkas PDF dari Google Drive. Pastikan aksesnya "siapa saja yang memiliki tautan".',
		'buku-cerita-bergambar:pdf':
			'Tautan langsung ke berkas .pdf, misalnya https://situs.contoh/buku-cerita-bergambar.pdf',
		'buku-cerita-bergambar:canva':
			'Tempel tautan desain Canva yang sudah dibagikan untuk dilihat publik.',
		'buku-cerita-bergambar:other': 'Tautan dokumen lain yang dapat ditampilkan di dalam halaman.',
		'audio:soundcloud': 'Tempel tautan trek SoundCloud.',
		'audio:spotify': 'Tempel tautan episode atau trek Spotify.',
		'audio:archive': 'Tempel tautan item Archive.org (…/details/…).',
		'audio:gdrive':
			'Google Drive kurang andal untuk audio — sering tidak dapat diputar di komputer.',
		'audio:direct': 'Tautan berkas .mp3, .ogg, atau .wav.',
		'audiovisual:youtube': 'Tempel tautan YouTube (watch, youtu.be, atau Shorts).',
		'audiovisual:vimeo': 'Tempel tautan Vimeo.',
		'audiovisual:gdrive': 'Tempel tautan bagikan berkas video dari Google Drive.',
		'audiovisual:direct': 'Tautan berkas .mp4 atau .webm.',
		'audiovisual:other': 'Tautan video lain yang dapat ditampilkan di dalam halaman.'
	};

	// Live previews — contributors can confirm a link actually embeds before submitting.
	let bukuCeritaBergambarPreview = $derived<StoryMedia | null>(
		isHttpUrl(bukuCeritaBergambarUrl)
			? {
					kind: 'buku-cerita-bergambar',
					source: bukuCeritaBergambarSource,
					url: bukuCeritaBergambarUrl.trim()
				}
			: null
	);
	let audioPreview = $derived<StoryMedia | null>(
		isHttpUrl(audioUrl) ? { kind: 'audio', source: audioSource, url: audioUrl.trim() } : null
	);
	let videoPreview = $derived<StoryMedia | null>(
		isHttpUrl(videoUrl) ? { kind: 'audiovisual', source: videoSource, url: videoUrl.trim() } : null
	);
</script>

<div class="space-y-6">
	<div>
		<h1 class="heading text-2xl">Kirim Cerita Baru</h1>
		<p class="label mt-1">Lengkapi detail cerita lalu kirim untuk ditinjau.</p>
	</div>

	{#if form?.error}
		<div class="bg-danger/10 border border-danger/30 text-danger rounded-lg px-4 py-3 text-sm">
			{form.error}
		</div>
	{/if}

	<form method="POST" class="space-y-5">
		<!-- Basic Info -->
		<section class="panel-card p-6 space-y-5">
			<h2 class="heading text-base border-b border-kulit/30 pb-3">Informasi Dasar</h2>

			<div class="space-y-1.5">
				<label for="title" class="block text-sm font-semibold text-bark">Judul Cerita *</label>
				<input
					id="title"
					name="title"
					type="text"
					required
					placeholder="Contoh: Si Kancil dan Buaya"
					class="input-base"
				/>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="space-y-1.5">
					<label for="category" class="block text-sm font-semibold text-bark">Kategori *</label>
					<select id="category" name="category" required class="input-base">
						{#each CATEGORY_OPTIONS as opt (opt.value)}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
				<div class="space-y-1.5">
					<label for="language" class="block text-sm font-semibold text-bark">Bahasa *</label>
					<select id="language" name="language" required class="input-base">
						{#each LANGUAGE_OPTIONS as opt (opt.value)}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="space-y-1.5">
					<label for="genre" class="block text-sm font-semibold text-bark">Genre</label>
					<select id="genre" name="genre" class="input-base">
						<option value="">— Pilih genre —</option>
						{#each GENRE_OPTIONS as opt (opt.value)}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
				<div class="space-y-1.5">
					<label for="region" class="block text-sm font-semibold text-bark">Asal Daerah</label>
					<input
						id="region"
						name="region"
						type="text"
						placeholder="Contoh: Sumedang, Priangan Timur"
						class="input-base"
					/>
				</div>
			</div>
		</section>

		<!-- Synopsis & Moral -->
		<section class="panel-card p-6 space-y-5">
			<h2 class="heading text-base border-b border-kulit/30 pb-3">Deskripsi & Pesan</h2>
			<div class="space-y-1.5">
				<label for="synopsis" class="block text-sm font-semibold text-bark">Sinopsis</label>
				<textarea
					id="synopsis"
					name="synopsis"
					rows="3"
					placeholder="Ringkasan singkat isi cerita..."
					class="input-base resize-y"
				></textarea>
			</div>
			<div class="space-y-1.5">
				<label for="moral" class="block text-sm font-semibold text-bark">Pesan Moral</label>
				<textarea
					id="moral"
					name="moral"
					rows="2"
					placeholder="Nilai atau pesan yang terkandung dalam cerita..."
					class="input-base resize-y"
				></textarea>
			</div>
			<div class="space-y-1.5">
				<label for="tags" class="block text-sm font-semibold text-bark">Tag</label>
				<input
					id="tags"
					name="tags"
					type="text"
					placeholder="kancil, binatang, jenaka (pisahkan dengan koma)"
					class="input-base"
				/>
				<p class="font-mono text-xs text-bark/50 mt-1">Pisahkan tag dengan koma.</p>
			</div>
		</section>

		<!-- Content -->
		<section class="panel-card p-6 space-y-5">
			<div class="border-b border-kulit/30 pb-3">
				<h2 class="heading text-base">Konten Cerita</h2>
				<p class="font-mono text-xs text-bark/50 mt-1">
					Satu cerita boleh memuat beberapa format sekaligus. Semua media ditautkan, bukan diunggah.
				</p>
			</div>

			<!-- Teks -->
			<div class="border border-kulit/40 rounded-lg p-4 space-y-3">
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						name="teks_enabled"
						bind:checked={enabled.teks}
						class="w-4 h-4 accent-tanah"
					/>
					<i class="i-ph-book-open text-tanah" aria-hidden="true"></i>
					<span class="font-sans font-semibold text-sm text-bark">Teks</span>
				</label>
				<div class:hidden={!enabled.teks} class="space-y-1.5">
					<textarea
						id="content"
						name="content"
						rows="18"
						placeholder="Tulis atau tempel teks cerita di sini. Markdown didukung."
						class="input-base font-mono text-sm resize-y"
					></textarea>
				</div>
			</div>

			<!-- Buku cerita bergambar -->
			<div class="border border-kulit/40 rounded-lg p-4 space-y-3">
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						name="buku_cerita_bergambar_enabled"
						bind:checked={enabled.bukuCeritaBergambar}
						class="w-4 h-4 accent-tanah"
					/>
					<i class="i-ph-paint-brush text-tanah" aria-hidden="true"></i>
					<span class="font-sans font-semibold text-sm text-bark"
						>Buku Cerita Bergambar (dokumen)</span
					>
				</label>
				<div class:hidden={!enabled.bukuCeritaBergambar} class="space-y-4">
					<div class="space-y-1.5">
						<label for="buku_cerita_bergambar_source" class="block text-sm font-semibold text-bark"
							>Sumber</label
						>
						<select
							id="buku_cerita_bergambar_source"
							name="buku_cerita_bergambar_source"
							bind:value={bukuCeritaBergambarSource}
							class="input-base"
						>
							{#each BUKU_CERITA_BERGAMBAR_SOURCE_OPTIONS as [value, label] (value)}
								<option {value}>{label}</option>
							{/each}
						</select>
					</div>
					<div class="space-y-1.5">
						<label for="buku_cerita_bergambar_url" class="block text-sm font-semibold text-bark"
							>URL Buku Cerita Bergambar</label
						>
						<input
							id="buku_cerita_bergambar_url"
							name="buku_cerita_bergambar_url"
							type="url"
							bind:value={bukuCeritaBergambarUrl}
							placeholder="https://..."
							class="input-base"
						/>
						<p class="font-mono text-xs text-bark/50 mt-1">
							{HINTS[`buku-cerita-bergambar:${bukuCeritaBergambarSource}`]}
						</p>
					</div>
					{#if bukuCeritaBergambarPreview}
						<div class="space-y-2">
							<p class="label">Pratinjau</p>
							<MediaBlock
								entry={bukuCeritaBergambarPreview}
								title="Pratinjau buku cerita bergambar"
							/>
						</div>
					{/if}
				</div>
			</div>

			<!-- Audio -->
			<div class="border border-kulit/40 rounded-lg p-4 space-y-3">
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						name="audio_enabled"
						bind:checked={enabled.audio}
						class="w-4 h-4 accent-tanah"
					/>
					<i class="i-ph-microphone text-tanah" aria-hidden="true"></i>
					<span class="font-sans font-semibold text-sm text-bark">Audio</span>
				</label>
				<div class:hidden={!enabled.audio} class="space-y-4">
					<div class="space-y-1.5">
						<label for="audio_source" class="block text-sm font-semibold text-bark">Sumber</label>
						<select
							id="audio_source"
							name="audio_source"
							bind:value={audioSource}
							class="input-base"
						>
							{#each AUDIO_SOURCE_OPTIONS as [value, label] (value)}
								<option {value}>{label}</option>
							{/each}
						</select>
					</div>
					<div class="space-y-1.5">
						<label for="audio_url" class="block text-sm font-semibold text-bark">URL Audio</label>
						<input
							id="audio_url"
							name="audio_url"
							type="url"
							bind:value={audioUrl}
							placeholder="https://..."
							class="input-base"
						/>
						<p class="font-mono text-xs text-bark/50 mt-1">{HINTS[`audio:${audioSource}`]}</p>
					</div>
					<div class="space-y-1.5">
						<label for="audio_transcript" class="block text-sm font-semibold text-bark"
							>Transkrip</label
						>
						<textarea
							id="audio_transcript"
							name="audio_transcript"
							rows="5"
							placeholder="Teks transkrip untuk aksesibilitas..."
							class="input-base resize-y"
						></textarea>
					</div>
					{#if audioPreview}
						<div class="space-y-2">
							<p class="label">Pratinjau</p>
							<MediaBlock entry={audioPreview} title="Pratinjau audio" />
						</div>
					{/if}
				</div>
			</div>

			<!-- Audiovisual -->
			<div class="border border-kulit/40 rounded-lg p-4 space-y-3">
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						name="video_enabled"
						bind:checked={enabled.audiovisual}
						class="w-4 h-4 accent-tanah"
					/>
					<i class="i-ph-video-camera text-tanah" aria-hidden="true"></i>
					<span class="font-sans font-semibold text-sm text-bark">Audiovisual / Video</span>
				</label>
				<div class:hidden={!enabled.audiovisual} class="space-y-4">
					<div class="space-y-1.5">
						<label for="video_source" class="block text-sm font-semibold text-bark">Sumber</label>
						<select
							id="video_source"
							name="video_source"
							bind:value={videoSource}
							class="input-base"
						>
							{#each VIDEO_SOURCE_OPTIONS as [value, label] (value)}
								<option {value}>{label}</option>
							{/each}
						</select>
					</div>
					<div class="space-y-1.5">
						<label for="video_url" class="block text-sm font-semibold text-bark">URL Video</label>
						<input
							id="video_url"
							name="video_url"
							type="url"
							bind:value={videoUrl}
							placeholder="https://..."
							class="input-base"
						/>
						<p class="font-mono text-xs text-bark/50 mt-1">{HINTS[`audiovisual:${videoSource}`]}</p>
					</div>
					<div class="space-y-1.5">
						<label for="video_poster_url" class="block text-sm font-semibold text-bark"
							>URL Gambar Sampul Video</label
						>
						<input
							id="video_poster_url"
							name="video_poster_url"
							type="url"
							placeholder="https://..."
							class="input-base"
						/>
						<p class="font-mono text-xs text-bark/50 mt-1">
							Opsional — hanya untuk berkas video langsung.
						</p>
					</div>
					{#if videoPreview}
						<div class="space-y-2">
							<p class="label">Pratinjau</p>
							<MediaBlock entry={videoPreview} title="Pratinjau video" />
						</div>
					{/if}
				</div>
			</div>

			<div class="space-y-1.5">
				<label for="coverImageUrl" class="block text-sm font-semibold text-bark"
					>URL Gambar Sampul</label
				>
				<input
					id="coverImageUrl"
					name="coverImageUrl"
					type="url"
					placeholder="https://..."
					class="input-base"
				/>
				<p class="font-mono text-xs text-bark/50 mt-1">URL gambar publik untuk thumbnail cerita.</p>
			</div>
		</section>

		<!-- Actions -->
		<div
			class="panel-card px-5 py-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-3"
		>
			<a href={resolve('/dashboard')} class="btn-soft btn-sm w-full sm:w-auto justify-center">
				← Batal
			</a>
			<div class="flex gap-3 w-full sm:w-auto">
				<button
					type="submit"
					name="_action"
					value="save"
					class="btn-soft btn-sm flex-1 sm:flex-none"
				>
					Simpan Draf
				</button>
				<button
					type="submit"
					name="_action"
					value="submit"
					class="btn-primary btn-sm flex-1 sm:flex-none"
				>
					Kirim untuk Ditinjau
				</button>
			</div>
		</div>
	</form>
</div>
