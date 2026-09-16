<script lang="ts">
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';
	import { resolveMedia } from '$lib/media';
	import type { StoryMedia } from '$lib/types';
	import EmbedFrame from './EmbedFrame.svelte';

	interface Props {
		entry: StoryMedia;
		/** Story title — becomes the accessible name of the embedded frame. */
		title: string;
	}

	let { entry, title }: Props = $props();

	let resolved = $derived(resolveMedia(entry));
</script>

{#if resolved.render === 'iframe'}
	<EmbedFrame src={resolved.src} {title} aspect={resolved.aspect} />
{:else if resolved.render === 'audio'}
	<AudioPlayer src={resolved.src} {title} transcript={resolved.transcript} />
{:else if resolved.render === 'video'}
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		src={resolved.src}
		poster={resolved.poster}
		controls
		preload="metadata"
		class="w-full aspect-video rounded-lg border border-kulit/40 bg-night block"
	></video>
{:else}
	<div class="bg-parchment border border-kulit/40 rounded-lg p-5 flex items-start gap-3">
		<i class="i-ph-warning-circle text-xl text-padi-dark flex-shrink-0" aria-hidden="true"></i>
		<div class="min-w-0">
			<p class="font-sans text-sm text-bark mb-1">Media ini tidak dapat ditampilkan di halaman.</p>
			<a
				href={resolved.url}
				target="_blank"
				rel="noopener noreferrer"
				class="font-mono text-xs text-tanah hover:underline break-all"
			>
				{resolved.url}
			</a>
		</div>
	</div>
{/if}
