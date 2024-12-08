<script lang="ts">
	import Progress from '@/lib/components/progress.svelte';
	import '../app.scss';
	let { children } = $props();
</script>

<Progress />

{@render children()}
