<script lang="ts">
	interface Props {
		src?: string;
		name: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		badge?: 'tbm' | 'komunitas' | 'kurator' | 'individu';
	}

	const sizeMap: Record<string, string> = {
		sm: 'w-7 h-7 text-xs',
		md: 'w-10 h-10 text-sm',
		lg: 'w-16 h-16 text-base',
		xl: 'w-24 h-24 text-lg'
	};

	const badgeColorMap: Record<string, string> = {
		tbm: 'bg-tanah',
		komunitas: 'bg-cai',
		kurator: 'bg-padi'
	};

	let { src, name, size = 'md', badge }: Props = $props();

	let sizeClass = $derived(sizeMap[size]);

	let initials = $derived(
		name
			.trim()
			.split(/\s+/)
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase()
	);
</script>

<span
	class="relative inline-flex items-center justify-center rounded-full border-2 border-kulit overflow-hidden flex-shrink-0 {sizeClass}"
>
	{#if src}
		<!-- Avatars are Google-hosted profile images; the navbar already requests the
		     same URLs with referrerpolicy="no-referrer". -->
		<img {src} alt={name} referrerpolicy="no-referrer" class="w-full h-full object-cover" />
	{:else}
		<span
			class="bg-parchment text-tanah font-semibold w-full h-full flex items-center justify-center"
		>
			{initials}
		</span>
	{/if}
	{#if badge}
		<span
			class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-cream {badgeColorMap[
				badge
			]}"
			aria-label={badge}
		></span>
	{/if}
</span>
