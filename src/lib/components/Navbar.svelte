<script lang="ts">
	import { base, resolve } from '$app/paths';
	import { page } from '$app/stores';
	interface Props {
		transparent?: boolean;
	}

	type RoutePath = '/cerita' | '/kontribusi' | '/tentang';
	interface NavLink {
		href: RoutePath;
		label: string;
	}

	let { transparent = false }: Props = $props();

	let scrolled = $state(false);
	let mobileOpen = $state(false);
	let profileOpen = $state(false);
	const navLinks: NavLink[] = [
		{ href: '/cerita', label: 'Cerita' },
		{ href: '/kontribusi', label: 'Kontributor' },
		{ href: '/tentang', label: 'Tentang' }
	];

	const role = $derived(
		($page.data.session?.user as { role?: string } | undefined)?.role ?? 'reader'
	);
	const showContributorActions = $derived(role !== 'reader');
	const showAdminLink = $derived(role === 'superadmin');
	// `panel.admin` is granted to both admin and superadmin (see $lib/server/rbac.ts).
	const showReviewLink = $derived(role === 'admin' || role === 'superadmin');

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}

	function toggleProfileMenu() {
		profileOpen = !profileOpen;
	}

	$effect(() => {
		const currentPathname = $page.url.pathname;
		mobileOpen = false;
		profileOpen = false;
		return () => {
			void currentPathname;
		};
	});
</script>

<svelte:window onscroll={handleScroll} />

<header
	class="sticky top-0 z-40 transition-all duration-slow
         {scrolled || !transparent ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}"
>
	<div class="container-md flex items-center h-18 gap-6 md:gap-8">
		<!-- Logo -->
		<a
			href={resolve('/')}
			class="flex items-center gap-2 flex-shrink-0 no-underline"
			aria-label="Ngadongeng — Beranda"
		>
			<img
				src={`${base}/assets/cropped-headermini.png`}
				alt="Ngadongeng"
				class="h-10 w-auto rounded-xl object-contain"
			/>
			<span class="sr-only">Ngadongeng</span>
		</a>

		<!-- Desktop nav -->
		<nav class="hidden md:flex items-center gap-6 flex-1" aria-label="Navigasi utama">
			{#each navLinks as link (link.href)}
				<a
					href={resolve(link.href)}
					class="font-sans text-sm font-medium transition-colors duration-fast no-underline
                 {$page.url.pathname.startsWith(link.href)
						? 'text-tanah underline underline-offset-4 decoration-2'
						: 'text-bark hover:text-tanah'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Desktop actions -->
		<div class="ml-auto flex items-center gap-3 relative">
			<a
				href={resolve('/cerita')}
				class="hidden md:flex items-center text-bark hover:text-tanah transition-colors"
				aria-label="Cari cerita"
			>
				<i class="i-ph-magnifying-glass text-xl" aria-hidden="true"></i>
			</a>
			{#if $page.data.session?.user}
				<div class="relative">
					<button
						type="button"
						onclick={toggleProfileMenu}
						class="inline-flex items-center gap-2 rounded-full border border-kulit/20 bg-cream px-3 py-1.5 text-sm font-medium text-bark shadow-sm transition hover:border-tanah"
						aria-label="Buka menu profil"
					>
						{#if $page.data.session.user.image}
							<img
								src={$page.data.session.user.image}
								alt={$page.data.session.user.name ?? 'Profil'}
								referrerpolicy="no-referrer"
								class="w-8 h-8 rounded-full object-cover border border-kulit/40"
							/>
						{/if}
						<span class="hidden md:inline">{$page.data.session.user.name ?? 'Profil'}</span>
						<i class="i-ph-caret-down text-lg" aria-hidden="true"></i>
					</button>

					{#if profileOpen}
						<div
							class="absolute right-0 mt-2 w-64 rounded-2xl border border-kulit/30 bg-cream p-4 shadow-2xl ring-1 ring-black/5 z-50"
						>
							<div class="mb-3 flex items-center gap-3 border-b border-kulit/10 pb-3">
								{#if $page.data.session.user.image}
									<img
										src={$page.data.session.user.image}
										alt={$page.data.session.user.name ?? 'Profil'}
										referrerpolicy="no-referrer"
										class="w-10 h-10 rounded-full object-cover border border-kulit/40"
									/>
								{/if}
								<div>
									<p class="font-medium text-bark">{$page.data.session.user.name ?? 'Profil'}</p>
									<p class="text-xs text-bark/60">Akses cepat</p>
								</div>
							</div>
							<div class="grid gap-2">
								{#if showContributorActions}
									<div class="grid grid-cols-2 gap-2">
										<a
											href={resolve('/dashboard')}
											class="btn-soft btn-xs w-full justify-center text-xs leading-none"
										>
											Dashboard
										</a>
										{#if showReviewLink}
											<a
												href={resolve('/ulasan')}
												class="btn-soft btn-xs w-full justify-center text-xs leading-none"
											>
												Ulasan
											</a>
										{/if}
										{#if showAdminLink}
											<a
												href={resolve('/admin')}
												class="btn-soft btn-xs w-full justify-center text-xs leading-none"
											>
												Admin
											</a>
										{/if}
									</div>
									<div class="mt-2 flex gap-2">
										<a
											href={resolve('/dashboard/cerita/baru')}
											class="btn-primary btn-sm flex-1 justify-center py-3"
										>
											Buat Cerita
										</a>
										<form method="post" action={resolve('/signout')} class="flex-1">
											<button
												type="submit"
												class="btn-soft btn-sm w-full justify-center py-3 text-rose"
											>
												Keluar
											</button>
										</form>
									</div>
								{:else}
									<div class="text-sm text-bark/70 mb-3">
										Akun Reader hanya dapat keluar dari sini. Hubungi kami untuk naik ke peran
										Kontributor.
									</div>
									<form method="post" action={resolve('/signout')} class="w-full">
										<button
											type="submit"
											class="btn-soft btn-sm w-full justify-center py-3 text-rose"
										>
											Keluar
										</button>
									</form>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<a href={resolve('/masuk')} class="btn-soft btn-sm hidden md:inline-flex">Masuk</a>
			{/if}
			<!-- Mobile hamburger -->
			<button
				class="md:hidden text-bark hover:text-tanah transition-colors"
				onclick={toggleMobile}
				aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
				aria-expanded={mobileOpen}
			>
				<i class={mobileOpen ? 'i-ph-x text-2xl' : 'i-ph-list text-2xl'} aria-hidden="true"></i>
			</button>
		</div>
	</div>
</header>

<!-- Mobile drawer overlay -->
{#if mobileOpen}
	<div
		class="fixed inset-0 bg-night/50 z-30 md:hidden"
		onclick={closeMobile}
		aria-hidden="true"
	></div>
	<!-- Drawer -->
	<div class="fixed top-0 right-0 bottom-0 w-72 bg-cream z-40 shadow-2xl md:hidden flex flex-col">
		<div class="flex items-center justify-between p-5 border-b border-kulit/30">
			<span class="font-display font-bold text-md text-bark">Menu</span>
			<button
				onclick={closeMobile}
				class="text-bark hover:text-tanah transition-colors"
				aria-label="Tutup menu"
			>
				<i class="i-ph-x text-xl" aria-hidden="true"></i>
			</button>
		</div>
		<nav class="flex flex-col p-5 gap-1 flex-1" aria-label="Navigasi mobile">
			{#each navLinks as link (link.href)}
				<a
					href={resolve(link.href)}
					class="font-sans font-medium py-3 px-4 rounded-md transition-colors no-underline
                 {$page.url.pathname.startsWith(link.href)
						? 'bg-tanah/10 text-tanah font-semibold'
						: 'text-bark hover:bg-parchment'}"
				>
					{link.label}
				</a>
			{/each}
			{#if showContributorActions}
				<a
					href={resolve('/dashboard')}
					class="font-sans font-medium py-3 px-4 rounded-md transition-colors no-underline
                 {$page.url.pathname === '/dashboard'
						? 'bg-tanah/10 text-tanah font-semibold'
						: 'text-bark hover:bg-parchment'}"
				>
					Dashboard
				</a>
			{/if}
			{#if showReviewLink}
				<a
					href={resolve('/ulasan')}
					class="font-sans font-medium py-3 px-4 rounded-md transition-colors no-underline
                 {$page.url.pathname.startsWith('/ulasan')
						? 'bg-tanah/10 text-tanah font-semibold'
						: 'text-bark hover:bg-parchment'}"
				>
					Ulasan
				</a>
			{/if}
			{#if showAdminLink}
				<a
					href={resolve('/admin')}
					class="font-sans font-medium py-3 px-4 rounded-md transition-colors no-underline
                 {$page.url.pathname.startsWith('/admin')
						? 'bg-tanah/10 text-tanah font-semibold'
						: 'text-bark hover:bg-parchment'}"
				>
					Admin
				</a>
			{/if}
		</nav>
		<div class="p-5 border-t border-kulit/30 flex flex-col gap-3">
			{#if $page.data.session?.user}
				{#if $page.data.session.user.image}
					<div class="flex items-center gap-3 px-1">
						<img
							src={$page.data.session.user.image}
							alt={$page.data.session.user.name ?? 'Profil'}
							referrerpolicy="no-referrer"
							class="w-9 h-9 rounded-full object-cover border border-kulit/40"
						/>
						<span class="font-sans text-sm font-medium text-bark truncate"
							>{$page.data.session.user.name}</span
						>
					</div>
				{/if}
				<form method="post" action={resolve('/signout')} class="btn-soft btn-md w-full text-center">
					<button type="submit" class="w-full">Keluar</button>
				</form>
			{:else}
				<a href={resolve('/masuk')} class="btn-soft btn-md w-full text-center">Masuk</a>
			{/if}
			{#if showContributorActions}
				<a href={resolve('/dashboard/cerita/baru')} class="btn-primary btn-md w-full text-center"
					>Bagikan Cerita</a
				>
			{/if}
		</div>
	</div>
{/if}
