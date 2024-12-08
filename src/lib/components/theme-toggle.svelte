<script lang="ts">
    import { Moon, Sun } from 'lucide-svelte';
    import { browser } from '$app/environment';
    import { buttonVariants } from "$lib/components/ui/button";

    // Initialize theme when component mounts
    if (browser) {
        const root = document.documentElement;
        // Get stored theme, explicitly default to 'light'
        const storedTheme = localStorage.getItem('theme');
        const defaultTheme = 'light';
        const theme = storedTheme || defaultTheme;
        
        // Remove dark class by default
        root.classList.remove('dark');
        
        // Only add dark class if explicitly stored as dark
        if (theme === 'dark') {
            root.classList.add('dark');
        }
        
        root.setAttribute('data-theme', theme);
        
        // Ensure light theme is stored if no theme preference exists
        if (!storedTheme) {
            localStorage.setItem('theme', defaultTheme);
        }
    }

    const toggleTheme = () => {
        if (!browser) return;
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        root.classList.toggle('dark');
        root.setAttribute('data-theme', newTheme);
        
        // Save theme preference to localStorage
        localStorage.setItem('theme', newTheme);
    };
</script>

<button 
    type="button"
    class={buttonVariants({ 
        variant: "ghost", 
        size: "icon" 
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