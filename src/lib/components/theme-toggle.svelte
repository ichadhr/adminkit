<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { theme } from '$lib/stores/theme';
	import type { Theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	let currentTheme: Theme = 'light';
	let unsubscribe: () => void;

	if (browser) {
		// Subscribe to the theme store and update currentTheme
		unsubscribe = theme.subscribe((value) => {
			currentTheme = value;
		});

		// Cleanup the subscription when the component is destroyed
		onDestroy(() => {
			unsubscribe();
		});
	}

	/**
	 * Handles theme toggle when the button is clicked.
	 */
	function handleThemeToggle(): void {
		if (browser) {
			theme.toggle();
		}
	}

	const buttonClasses = buttonVariants({
		variant: 'ghost',
		size: 'icon'
	});

	const sunIconClasses =
		'h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0';
	const moonIconClasses =
		'absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100';
</script>

<button type="button" class={buttonClasses} on:click={handleThemeToggle} aria-label="Toggle theme">
	<Sun class={sunIconClasses} aria-hidden="true" />
	<Moon class={moonIconClasses} aria-hidden="true" />
	<span class="sr-only">Toggle theme</span>
</button>
