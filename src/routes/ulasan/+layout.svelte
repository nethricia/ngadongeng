<script lang="ts">
	import PanelLayout from '$lib/components/PanelLayout.svelte';

	let { children } = $props();

	const navItems = [{ href: '/ulasan', label: 'Antrian Ulasan', icon: 'i-ph-stack-bold' }];
</script>

<PanelLayout title="Panel Ulasan" accentClass="bg-cai" accentTextClass="text-cream" {navItems}>
	{@render children()}
</PanelLayout>
