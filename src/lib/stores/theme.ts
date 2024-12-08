import { writable, type Writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
    // Get initial theme from localStorage or default to 'light'
    const initialTheme: Theme = (localStorage.getItem('theme') as Theme) || 'light';
    
    // Initialize store with saved theme
    const { subscribe, set, update } = writable<Theme>(initialTheme);

    // Apply initial theme to document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    const setTheme = (value: Theme) => {
        document.documentElement.classList.toggle('dark', value === 'dark');
        localStorage.setItem('theme', value);
        set(value);
    };

    return {
        subscribe,
        set: setTheme,
        update,
        toggle: () => {
            update(current => {
                const newTheme = current === 'light' ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', newTheme);
                return newTheme;
            });
        }
    };
}

export const theme = createThemeStore();