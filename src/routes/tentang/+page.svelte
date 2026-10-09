<script lang="ts">
	import { base, resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Tentang Ngadongeng</title>
</svelte:head>

<!-- Hero -->
<div class="bg-parchment/60 border-b border-kulit/30 py-16">
	<div class="container-md">
		<div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] items-center">
			<div class="max-w-3xl">
				<p class="label text-tanah mb-3">TENTANG KAMI</p>
				<h1 class="heading text-4xl md:text-5xl mb-4">Tentang Ngadongeng</h1>
				<p class="prose-body text-bark/70 text-md">
					Platform digital untuk mendokumentasikan, menyimpan, dan menyebarkan dongeng serta cerita
					rakyat Sunda.
				</p>
			</div>
			<div class="rounded-[2rem] border border-kulit/20 bg-cream p-6 shadow-xl self-start">
				<img
					src={`${base}/assets/cropped-headermini.png`}
					alt="Logo Ngadongeng"
					class="w-full h-auto object-contain"
				/>
			</div>
		</div>
	</div>
</div>

<div class="container-md max-w-3xl py-16 space-y-16">
	<!-- Section 1 -->
	<section>
		<h2 class="heading text-2xl mb-6">Apa itu Ngadongeng?</h2>
		<div class="prose-body space-y-4 text-bark/85">
			<p>
				Ngadongeng adalah platform digital untuk mendokumentasikan, menyimpan, dan menyebarkan
				dongeng serta cerita rakyat Sunda. Nama "Ngadongeng" berasal dari kata kerja dalam Bahasa
				Sunda yang berarti "bercerita" atau "mendongeng" — sebuah tradisi lisan yang telah mengalir
				lintas generasi di Tatar Sunda.
			</p>
			<p>
				Platform ini adalah kelanjutan digital dari TBM Pabukon Ngadongeng, taman bacaan masyarakat
				yang berdiri di Dusun Manglayang, Sukasari, Sumedang, Jawa Barat.
			</p>
			<p>
				Ketika kecil, kami sering mendengarkan berbagai dongeng dari orang tua, nenek, atau kakek.
				Setelah si pencerita tiada, kami merindukan kembali cerita yang dulu pernah didengar.
				Dongeng telah menemani kami hingga sekarang dan membangkitkan cinta pada kampung halaman.
			</p>
		</div>
	</section>

	<section>
		<h2 class="heading text-2xl mb-6">Perjalanan Ngadongeng</h2>
		<div class="prose-body space-y-4 text-bark/85">
			<p>
				Ngadongeng hadir sebagai respons nyata terhadap tradisi lisan yang rentan hilang. Masyarakat
				Sunda melalui budaya bertutur telah mentransformasikan pengetahuan dan nilai dalam dongeng,
				dan kami ingin menjaga agar warisan itu terus hidup.
			</p>
			<p>
				Kami mengajak masyarakat Sunda untuk menuliskan kembali cerita fabel, mite, dan legenda —
				khususnya yang masih jarang dikenal anak-anak dan generasi muda — supaya nilai budaya itu
				terus diwariskan.
			</p>
		</div>
	</section>

	<section>
		<h2 class="heading text-2xl mb-6">Makna Ngadongeng</h2>
		<div class="prose-body space-y-4 text-bark/85">
			<p>
				Ngadongéng diambil dari kata dongéng, yang berarti “carita baheula, biasana loba
				pamohalanana”. Dongeng adalah cerita zaman dahulu yang kadang irasional, namun penuh makna.
				Pendongeng sampaikan pesan tanpa menggurui.
			</p>
			<p>
				Ada beberapa cerita dari tradisi lisan Sunda yang sudah didokumentasikan oleh pelbagai
				penulis namun belum diketahui anak-anak. Semoga Ngadongeng membantu orang tua menyampaikan
				cerita kepada anak-anak dan menumbuhkan imajinasi mereka.
			</p>
			<p class="italic text-bark/70">Cikaracak ninggang batu, laun-laun jadi legok.</p>
		</div>
	</section>

	<!-- Section 2 -->
	<section>
		<h2 class="heading text-2xl mb-6">Mengapa Ini Penting?</h2>
		<div class="prose-body space-y-4 text-bark/85">
			<p>
				Tradisi lisan adalah bentuk budaya yang paling rentan hilang. Dongeng yang tidak dicatat,
				tidak direkam, dan tidak dibagikan bisa lenyap bersama penceritanya. Di sisi lain, Indonesia
				memiliki lebih dari 300 kelompok etnis, dan Sunda — dengan lebih dari 30 juta penutur —
				adalah salah satu yang terkaya dalam tradisi bertutur.
			</p>
			<p>
				Ngadongeng hadir sebagai respons nyata: sebuah arsip hidup yang tidak hanya menyimpan
				cerita, tapi juga mengundang komunitas untuk terus mengisi dan merawatnya.
			</p>
		</div>
	</section>

	<!-- Section 3 -->
	<section>
		<h2 class="heading text-2xl mb-6">Siapa yang Bisa Berkontribusi?</h2>
		<div class="prose-body text-bark/85">
			<p>
				Siapa pun. Guru, pelajar, pustakawan, orang tua, seniman, mahasiswa — atau sekadar seseorang
				yang ingat cerita yang pernah diceritakan neneknya.
			</p>
			<p class="mt-4">
				Kontribusi bisa berupa tulisan, buku cerita bergambar, rekaman suara, atau video. Tidak ada
				standar produksi minimum — yang penting adalah niat untuk menjaga agar cerita itu tidak
				hilang.
			</p>
			<div class="mt-6">
				<a href={resolve('/kontribusi')} class="btn-primary btn-md inline-flex"
					>Cara Berkontribusi →</a
				>
			</div>
		</div>
	</section>

	<section class="bg-parchment rounded-xl p-8">
		<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
			<div>
				<h2 class="heading text-2xl mb-2">TIM NGADONGENG</h2>
				<p class="prose-body text-bark/85 max-w-2xl">
					Komunitas Ngadongeng dibangun oleh orang-orang yang percaya bahwa cerita tradisi lisan
					Sunda harus terus hidup dan dijaga bersama.
				</p>
			</div>
			<a href={resolve('/kontak')} class="btn-primary btn-md inline-flex">Kontak Kami</a>
		</div>
		<div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div class="bg-cream rounded-xl border border-kulit/20 p-4">
				<p class="font-semibold text-bark">Kusnandar</p>
				<p class="text-sm text-bark/70">Pembina Komunitas Ngadongeng</p>
			</div>
			<div class="bg-cream rounded-xl border border-kulit/20 p-4">
				<p class="font-semibold text-bark">Evi Nursanti R.</p>
				<p class="text-sm text-bark/70">Founder Komunitas Ngadongeng</p>
			</div>
			<div class="bg-cream rounded-xl border border-kulit/20 p-4">
				<p class="font-semibold text-bark">Nurul Okta</p>
				<p class="text-sm text-bark/70">Graphic &amp; Design Ngadongeng</p>
			</div>
			<div class="bg-cream rounded-xl border border-kulit/20 p-4">
				<p class="font-semibold text-bark">Euis Yuningsih</p>
				<p class="text-sm text-bark/70">Editor Ngadongeng</p>
			</div>
			<div class="bg-cream rounded-xl border border-kulit/20 p-4">
				<p class="font-semibold text-bark">Chrisna Adhi</p>
				<p class="text-sm text-bark/70">Web Maintainer Ngadongeng</p>
			</div>
		</div>
	</section>

	<!-- Section 4: TBM info -->
	<section id="pabukon" class="bg-parchment rounded-xl p-8">
		<h2 class="heading text-2xl mb-6">TBM Pabukon Ngadongeng</h2>
		<div class="prose-body space-y-4 text-bark/85">
			<p>
				TBM Pabukon Ngadongeng adalah taman bacaan masyarakat yang berdiri pada Desember 2019 di
				Dusun Manglayang No. 1, RT/RW 2/01, Desa Mekarsari, Kecamatan Sukasari, Kabupaten Sumedang,
				Jawa Barat.
			</p>
			<p>
				TBM ini memiliki koleksi lebih dari 211 judul dan 514 eksemplar yang berfokus pada literasi
				anak dengan tema budaya Sunda. Koleksinya meliputi buku cerita bergambar, novel, cerita
				pendek, dan buku nonfiksi — termasuk buku klasik Sunda seperti
				<em>Roesdi djeung Misnem</em>.
			</p>
		</div>
		<div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm">
			<div class="flex items-start gap-3">
				<i class="i-ph-envelope text-tanah text-lg flex-shrink-0 mt-0.5" aria-hidden="true"></i>
				<div>
					<p class="label mb-1">Email</p>
					<a href="mailto:ngadongengsunda@gmail.com" class="text-tanah hover:underline"
						>ngadongengsunda@gmail.com</a
					>
				</div>
			</div>
			<div class="flex items-start gap-3">
				<i class="i-ph-phone text-tanah text-lg flex-shrink-0 mt-0.5" aria-hidden="true"></i>
				<div>
					<p class="label mb-1">Telepon</p>
					<a href="tel:081313237581" class="text-bark hover:text-tanah">081313237581</a>
				</div>
			</div>
			<div class="flex items-start gap-3 sm:col-span-2">
				<i class="i-ph-map-pin text-tanah text-lg flex-shrink-0 mt-0.5" aria-hidden="true"></i>
				<div>
					<p class="label mb-1">Alamat</p>
					<p class="text-bark">
						Dusun Manglayang No. 1, RT/RW 2/01, Desa Mekarsari, Kec. Sukasari, Kab. Sumedang, Jawa
						Barat
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
