<!-- src/routes/+layout.svelte -->

<script lang="ts">
	import Progress from '@/lib/components/progress.svelte';
	import '../app.scss';
	import { theme } from '$lib/stores/theme';
	import { onDestroy } from 'svelte';

	// Define local types for data and props
	import type { LayoutData } from './$types';

	let { data, children } = $props<{
		data: LayoutData;
		children: () => unknown;
	}>();

	/**
	 * Subscribe to the theme store to update the class when the theme changes.
	 */
	const themeUnsubscribe = theme.subscribe((value) => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(value);
		}
	});

	onDestroy(() => {
		themeUnsubscribe();
	});
</script>

<Progress />

{@render children()}
