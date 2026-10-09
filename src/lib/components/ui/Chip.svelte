<script lang="ts">
	import type { DongengFormat } from '$lib/types';

	interface Props {
		format: DongengFormat;
		label?: string;
	}

	const labels: Record<DongengFormat, string> = {
		teks: 'Teks',
		'buku-cerita-bergambar': 'Buku Cerita Bergambar',
		audio: 'Audio',
		audiovisual: 'Audiovisual'
	};

	const icons: Record<DongengFormat, string> = {
		teks: 'i-ph-book-open',
		'buku-cerita-bergambar': 'i-ph-paint-brush',
		audio: 'i-ph-microphone',
		audiovisual: 'i-ph-video-camera'
	};

	const chipClass: Record<DongengFormat, string> = {
		teks: 'chip-teks',
		'buku-cerita-bergambar': 'chip-buku-cerita-bergambar',
		audio: 'chip-audio',
		audiovisual: 'chip-av'
	};

	let { format, label }: Props = $props();
	let displayLabel = $derived(label ?? labels[format]);
	let cls = $derived(chipClass[format]);
	let icon = $derived(icons[format]);
</script>

<span class={cls}>
	<i class={icon} aria-hidden="true"></i>
	{displayLabel}
</span>
