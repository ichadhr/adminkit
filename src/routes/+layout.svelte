<script lang="ts">
	import Progress from '$lib/components/Progress.svelte';
	import '../app.scss';
	let { children } = $props();
</script>

<Progress />

{@render children()}
