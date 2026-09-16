<script lang="ts">
	import PanelLayout from '$lib/components/PanelLayout.svelte';

	let { children } = $props();

	const navItems = [
		{ href: '/admin', label: 'Ikhtisar', icon: 'i-ph-chart-bar-bold' },
		{ href: '/admin/pengguna', label: 'Pengguna', icon: 'i-ph-users-bold' },
		{ href: '/ulasan', label: 'Antrian Ulasan', icon: 'i-ph-stack-bold' }
	];
</script>

<PanelLayout
	title="Panel Superadmin"
	accentClass="bg-night"
	accentTextClass="text-cream"
	{navItems}
>
	{@render children()}
</PanelLayout>
