<!-- src\lib\components\theme-toggle.svelte -->
<script lang="ts">
	import {Moon, Sun} from 'lucide-svelte';
	import {browser} from '$app/environment';
	import {buttonVariants} from '$lib/components/ui/button';
	import {onMount} from 'svelte';

	/**
	 * Represents the available theme options
	 */
	type Theme = 'light' | 'dark';

	/**
	 * Configuration for theme settings
	 */
	interface ThemeConfig {
		readonly defaultTheme: Theme;
		readonly storageKey: string;
		readonly darkClassName: string;
	}

	/**
	 * Theme configuration settings
	 */
	const themeConfig: ThemeConfig = {
		defaultTheme: 'light',
		storageKey: 'theme',
		darkClassName: 'dark'
	} as const;

	let currentTheme: Theme = themeConfig.defaultTheme;

	/**
	 * Type guard to check if a value is a valid theme
	 * @param value - The value to check
	 * @returns True if the value is a valid theme
	 */
	function isValidTheme(value: unknown): value is Theme {
		return value === 'light' || value === 'dark';
	}

	/**
	 * Safely retrieves theme from localStorage
	 * @returns The stored theme or null if invalid/not found
	 */
	function getStoredTheme(): Theme | null {
		if (!browser) return null;

		const stored = localStorage.getItem(themeConfig.storageKey);
		return isValidTheme(stored) ? stored : null;
	}

	/**
	 * Updates the DOM to reflect the current theme
	 * @param theme - The theme to apply
	 */
	function applyTheme(theme: Theme): void {
		if (!browser) return;

		const root = document.documentElement;
		const isDark = theme === 'dark';

		root.classList.toggle(themeConfig.darkClassName, isDark);
		root.setAttribute('data-theme', theme);
	}

	/**
	 * Initializes theme settings based on stored preferences
	 */
	function initializeTheme(): void {
		if (!browser) return;

		const storedTheme = getStoredTheme();
		currentTheme = storedTheme ?? themeConfig.defaultTheme;

		applyTheme(currentTheme);

		// Ensure theme preference is stored
		if (!storedTheme) {
			localStorage.setItem(themeConfig.storageKey, currentTheme);
		}
	}

	/**
	 * Toggles between light and dark themes
	 */
	function toggleTheme(): void {
		if (!browser) return;

		const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
		currentTheme = newTheme;

		applyTheme(currentTheme);
		localStorage.setItem(themeConfig.storageKey, currentTheme);
	}

	onMount(initializeTheme);
</script>

<button
	type="button"
	class={buttonVariants({
		variant: 'ghost',
		size: 'icon'
	})}
	on:click={toggleTheme}
	aria-label="Toggle theme"
>
	<Sun
		class="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0"
		aria-hidden="true"
	/>
	<Moon
		class="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
		aria-hidden="true"
	/>
	<span class="sr-only">Toggle theme</span>
</button>
