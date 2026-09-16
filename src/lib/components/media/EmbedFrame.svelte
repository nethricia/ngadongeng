<script lang="ts">
	import type { EmbedAspect } from '$lib/media';

	interface Props {
		src: string;
		title: string;
		aspect?: EmbedAspect;
	}

	let { src, title, aspect = 'video' }: Props = $props();

	// Komik needs vertical room to read a scrollable document; the audio widgets
	// have a fixed 166px height of their own; video keeps its native 16:9.
	const aspectClass: Record<EmbedAspect, string> = {
		video: 'aspect-video',
		comic: 'h-[75vh] min-h-[400px]',
		audio: 'h-[166px]'
	};

	let frameClass = $derived(aspectClass[aspect]);
</script>

<div class="space-y-2">
	<iframe
		{src}
		{title}
		class="w-full {frameClass} rounded-lg border border-kulit/40 bg-parchment block"
		loading="lazy"
		allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
		referrerpolicy="no-referrer-when-downgrade"
	></iframe>

	<!--
		Always offered, never conditional: Drive returns a permission error page
		inside the frame when a file is not shared publicly, and iOS Safari will
		not render a PDF inline at all.
	-->
	<!-- eslint-disable svelte/no-navigation-without-resolve -- external provider URL, not an app route -->
	<a
		href={src}
		target="_blank"
		rel="noopener noreferrer"
		class="inline-flex items-center gap-1.5 font-mono text-xs text-bark/50 hover:text-tanah transition-colors"
	>
		<i class="i-ph-arrow-square-out" aria-hidden="true"></i>
		Buka di tab baru
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
</div>
