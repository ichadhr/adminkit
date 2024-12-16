// src\lib\stores\theme.ts

import { writable, type Writable, get } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Type representing the possible theme values.
 */
export type Theme = 'light' | 'dark';

/**
 * Interface for the theme store.
 */
interface ThemeStore extends Writable<Theme> {
	/**
	 * Sets the theme to a specific value ('light' or 'dark').
	 *
	 * @param value - The new theme to set.
	 */
	set: (value: Theme) => void;
	/**
	 * Toggles the theme between 'light' and 'dark'.
	 */
	toggle: () => void;
}

/**
 * Creates a theme store that manages the application's theme state.
 * It handles theme toggling and persistence by storing the preference in a cookie.
 *
 * @returns A theme store with methods to subscribe, set, update, and toggle the theme.
 */
function createThemeStore(): ThemeStore {
	/**
	 * Retrieves the initial theme from the browser cookie or defaults to 'light'.
	 *
	 * @returns The initial theme.
	 */
	const getInitialTheme = (): Theme => {
		if (!browser) return 'light';
		const match = document.cookie.match(/(?:^|; )theme=(light|dark)/);
		const themeFromCookie = match?.[1] as Theme | undefined;
		return themeFromCookie ?? 'light';
	};

	const { subscribe, set, update } = writable<Theme>(getInitialTheme());

	/**
	 * Sets the theme in the store, updates the document's class list,
	 * and stores the preference in a cookie.
	 *
	 * @param theme - The new theme to set ('light' or 'dark').
	 */
	const setTheme = (theme: Theme): void => {
		if (!browser) return;
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
		document.cookie = `theme=${theme}; path=/; max-age=31536000;`;
		set(theme);
	};

	/**
	 * Toggles the theme between 'light' and 'dark'.
	 */
	const toggleTheme = (): void => {
		if (!browser) return;
		const currentTheme = get({ subscribe });
		const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	return {
		subscribe,
		set: setTheme,
		update,
		toggle: toggleTheme
	};
}

export const theme: ThemeStore = createThemeStore();
