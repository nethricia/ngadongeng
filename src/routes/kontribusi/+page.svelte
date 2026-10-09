<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Cara Berkontribusi — Ngadongeng</title>
</svelte:head>

<div class="bg-parchment/60 border-b border-kulit/30 py-16">
	<div class="container-md max-w-3xl">
		<p class="label text-tanah mb-3">BERKONTRIBUSI</p>
		<h1 class="heading text-4xl md:text-5xl mb-4">Ayo Berbagi Ceritamu kepada Ngadongeng</h1>
		<p class="prose-body text-bark/70 text-md">
			Tidak perlu jadi penulis. Tidak perlu punya studio rekaman. Yang kamu butuhkan hanya sebuah
			cerita — dan keinginan untuk berbagi.
		</p>
	</div>
</div>

<div class="container-md max-w-3xl py-16 space-y-16">
	<!-- Steps -->
	<section>
		<div class="rounded-xl border border-kulit/20 bg-cream p-5 mb-8">
			<p class="font-medium text-bark mb-2">Penting</p>
			<p class="prose-body text-sm text-bark/80">
				Semua pengguna baru yang login pertama kali akan mendapatkan peran default <strong
					>Reader</strong
				>. Untuk mendapatkan akses mengirim cerita, hubungi tim kami agar akun Anda dapat dikonversi
				menjadi
				<strong>Kontributor</strong>.
			</p>
		</div>
		<h2 class="heading text-2xl mb-8">Langkah-langkah Berkontribusi</h2>
		<ol class="space-y-6">
			{#each [['Buat akun gratis', 'Masuk sekali dengan Google; akun akan dibuat otomatis dan langsung dapat digunakan.'], ['Pilih format cerita', 'Teks, buku cerita bergambar, audio, atau video — satu cerita boleh memuat beberapa format sekaligus.'], ['Isi informasi cerita', 'Judul, kategori, bahasa, wilayah asal cerita, dan sinopsis singkat.'], ['Tautkan kontenmu', 'Teks ditulis langsung di editor. Buku cerita bergambar, audio, dan video ditautkan dari layanan penyimpanan — tidak ada berkas yang diunggah.'], ['Pratinjau dan kirim', 'Cek pratinjau setiap media, lalu kirim untuk ditinjau kurator.'], ['Ceritamu tayang', 'Setelah disetujui, ceritamu akan langsung bisa dibaca dan dinikmati semua orang.']] as [title, body], i (title)}
				<li class="flex gap-5">
					<div
						class="w-9 h-9 rounded-full bg-tanah text-cream flex items-center justify-center flex-shrink-0 font-display font-bold text-sm mt-0.5"
					>
						{i + 1}
					</div>
					<div>
						<h3 class="heading text-base mb-1">{title}</h3>
						<p class="prose-body text-sm text-bark/70">{body}</p>
					</div>
				</li>
			{/each}
		</ol>
		<div class="mt-10">
			<a href={resolve('/daftar')} class="btn-primary btn-md inline-flex">Mulai Sekarang →</a>
		</div>
	</section>

	<!-- Format guides -->
	<section>
		<h2 class="heading text-2xl mb-8">Panduan Format</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each [{ icon: 'i-ph-text-aa', title: 'TEKS', items: ['Cara: tulis atau tempel langsung di editor', 'Format: Markdown atau teks biasa', 'Panjang: Tidak ada batasan minimum/maksimum', 'Tips: Sertakan pengantar singkat tentang asal-usul cerita'] }, { icon: 'i-ph-paint-brush', title: 'BUKU CERITA BERGAMBAR', items: ['Cara: tautkan dokumen PDF', 'Sumber: Google Drive, tautan .pdf langsung, atau Canva', 'Tips: Pastikan berkas dapat dilihat publik — "siapa saja yang memiliki tautan"', 'Tips: Beri jeda halaman yang jelas di dalam dokumen'] }, { icon: 'i-ph-microphone', title: 'AUDIO', items: ['Cara: tautkan rekaman audio', 'Sumber: SoundCloud, Archive.org, Spotify, Google Drive, atau berkas .mp3/.ogg/.wav langsung', 'Tips: Sertakan transkrip teks agar dapat diakses semua pengguna', 'Catatan: Google Drive kurang andal untuk audio'] }, { icon: 'i-ph-video-camera', title: 'AUDIOVISUAL', items: ['Cara: tautkan video', 'Sumber: YouTube, Vimeo, Google Drive, atau berkas .mp4/.webm langsung', 'Tips: Sertakan subtitle (.vtt) bila tersedia'] }] as fmt (fmt.title)}
				<div class="card p-5">
					<div class="flex items-center gap-3 mb-4">
						<i class="{fmt.icon} text-xl text-tanah" aria-hidden="true"></i>
						<span class="label text-tanah">{fmt.title}</span>
					</div>
					<ul class="space-y-2">
						{#each fmt.items as item (item)}
							<li class="prose-body text-sm text-bark/70 flex gap-2">
								<i class="i-ph-check text-success flex-shrink-0 mt-0.5" aria-hidden="true"></i>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- License -->
	<section class="bg-parchment rounded-xl p-8">
		<h2 class="heading text-xl mb-4">Lisensi Konten</h2>
		<p class="prose-body text-bark/80 mb-4">
			Semua cerita yang dibagikan di Ngadongeng dilisensikan di bawah
			<strong>Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)</strong>,
			kecuali ada perjanjian khusus dengan kontributor.
		</p>
		<ul class="space-y-2">
			{#each [['check-circle', 'Orang lain boleh membagikan dan mengadaptasi ceritamu', true], ['check-circle', 'Nama kamu tetap tercantum sebagai kontributor', true], ['x-circle', 'Tidak boleh digunakan untuk kepentingan komersial tanpa izin', false]] as [icon, text, ok] (text)}
				<li class="flex items-start gap-2 prose-body text-sm text-bark/80">
					<i
						class="i-ph-{icon} {ok ? 'text-success' : 'text-danger'} flex-shrink-0 mt-0.5"
						aria-hidden="true"
					></i>
					{text}
				</li>
			{/each}
		</ul>
	</section>
</div>
