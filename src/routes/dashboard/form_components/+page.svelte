<!-- src\routes\dashboard\form_components\+page.svelte -->

<script lang="ts">
	import { browser } from '$app/environment';
	if (browser) {
		// to prevent error window is not defined, because it's SSR
		window.location.href = '/dashboard/form_components/input';
	}
</script>
