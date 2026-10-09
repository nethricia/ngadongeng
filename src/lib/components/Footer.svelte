<script lang="ts">
</script>

<footer class="bg-bark text-cream/80 font-sans">
	<div class="container-md py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
		<!-- Brand column -->
		<div class="md:col-span-2">
			<div class="w-8 h-8 rounded-full bg-tanah flex items-center justify-center mb-3">
				<i class="i-ph-book-open text-cream text-sm" aria-hidden="true"></i>
			</div>
			<p class="font-display font-bold text-lg text-cream mb-2">Ngadongeng</p>
			<p class="text-sm leading-relaxed text-cream/60 max-w-sm">
				Platform berbagi dongeng dan cerita rakyat Sunda.<br />
				Dikelola oleh TBM Pabukon Ngadongeng, Sumedang.
			</p>
			<p class="font-mono text-xs text-cream/40 mt-4 italic">
				"Carita hirup dina ucapan, abadi dina tulisan."
			</p>
		</div>

		<!-- Jelajahi links -->
		<div>
			<h3 class="label text-cream/40 mb-4">Jelajahi</h3>
			<ul class="space-y-2 text-sm">
				{#each [['/', 'Beranda'], ['/cerita', 'Semua Cerita'], ['/cerita?format=teks', 'Cerita Teks'], ['/cerita?format=buku-cerita-bergambar', 'Buku Cerita Bergambar'], ['/cerita?format=audio', 'Audio'], ['/cerita?format=audiovisual', 'Audiovisual']] as [href, label]}
					<li>
						<a {href} class="text-cream/60 hover:text-cream transition-colors no-underline"
							>{label}</a
						>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Tentang links -->
		<div>
			<h3 class="label text-cream/40 mb-4">Tentang</h3>
			<ul class="space-y-2 text-sm">
				{#each [['/tentang', 'Tentang Kami'], ['/kontribusi', 'Cara Berkontribusi'], ['/kontak', 'Kontak']] as [href, label]}
					<li>
						<a {href} class="text-cream/60 hover:text-cream transition-colors no-underline"
							>{label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Bottom bar -->
	<div class="border-t border-cream/10">
		<div
			class="container-md py-5 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/40"
		>
			<p>
				© {new Date().getFullYear()} TBM Pabukon Ngadongeng. Konten dilisensikan CC BY-NC-SA 4.0.
			</p>
			<p>Dibuat dengan ❤ dari Sumedang, Jawa Barat.</p>
		</div>
	</div>
</footer>
