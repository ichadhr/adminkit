<script lang="ts">
    import { onDestroy } from 'svelte';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import defaultTheme from 'svelte-highlight/styles/github-dark';
	import { browser } from '$app/environment';

	// Constants
	const DEFAULT_COPY_TIMEOUT = 2000;
	const SKELETON_BACKGROUNDS = {
		dark: 'rgba(0, 0, 0, 0.1)',
		light: 'rgba(255, 255, 255, 0.1)'
	};

	// Props with default values
	export let code: string;
	export let language: any = null;
	export let showLanguageTag = true;
	export let showLineNumbers = true;
	export let wrapLines = true;
	export let hideBorder = false;
	export let theme = defaultTheme;
	export let startingLineNumber = 1;
	export let highlightedLines: number[] = [];
	export let highlightedBackground = 'rgba(158, 158, 158, 0.2)';
	export let copyTimeout = DEFAULT_COPY_TIMEOUT;

	// State
	let isCopied = false;
	let copyTimeoutId: ReturnType<typeof setTimeout>;

	// Memoized theme background patterns
	const themePatterns = [
		/background(?:-color)?:\s*hsl\(([^)]+)\)/,
		/background(?:-color)?:\s*(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})/,
		/background(?:-color)?:\s*rgb\((\s*\d+\s*,\s*\d+\s*,\s*\d+\s*)\)/
	];

	// Utilities
	function getThemeBackground(themeCSS: string): string {
		const defaultBackground = 'hsl(var(--background))';

		try {
			for (const pattern of themePatterns) {
				const match = themeCSS.match(pattern);
				if (!match?.[1]) continue;

				const color = match[1];
				if (color.includes('var(--')) return `hsl(${color})`;
				if (color.startsWith('rgb')) {
					const [r, g, b] = color.split(',').map(n => parseInt(n.trim()));
					return `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}`;
				}
				return color;
			}
		} catch (error) {
			console.warn('Failed to parse theme background color:', error);
		}
		return defaultBackground;
	}

	function shouldUseDarkText(hexColor: string): boolean {
		const color = hexColor.replace('#', '').trim();
		if (color.length !== 6) return false;

		try {
			const [r, g, b] = [0, 2, 4].map(i => parseInt(color.substring(i, i + 2), 16));
			return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
		} catch {
			return false;
		}
	}

	async function copyToClipboard(): Promise<void> {
		try {
			await navigator.clipboard.writeText(code);
			clearTimeout(copyTimeoutId);
			isCopied = true;
			copyTimeoutId = setTimeout(() => (isCopied = false), copyTimeout);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	// Cleanup
	onDestroy(() => {
		clearTimeout(copyTimeoutId);
	});

	// Reactive declarations
	$: languageTag = showLanguageTag && language?.name ? language.name : null;
	$: shouldRender = browser;
	$: numberOfLines = code.split('\n').length;
	$: themeBackground = getThemeBackground(theme);
	$: textColor = shouldUseDarkText(themeBackground) ? 'text-gray-800' : 'text-white';
	$: skeletonBackground = shouldUseDarkText(themeBackground)
		? SKELETON_BACKGROUNDS.dark
		: SKELETON_BACKGROUNDS.light;
</script>

<svelte:head>
	{@html theme}
</svelte:head>

{#if shouldRender}
	<div class="code-block relative w-full">
		<div class="w-full overflow-hidden rounded" style:background-color={themeBackground}>
			<!-- Copy Button and Language Tag -->
			<div class="absolute right-0 top-0 z-20 flex items-center rounded">
				{#if languageTag}
					<div class="px-2 py-1 text-xs {textColor}">{languageTag}</div>
				{/if}
				<div class="rounded transition-colors duration-200 hover:bg-white/10">
					<button class="p-2" on:click={copyToClipboard} aria-label="Copy code">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 {isCopied ? 'text-green-400' : textColor}"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							{#if isCopied}
								<polyline points="20 6 9 17 4 12" />
							{:else}
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
								<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
							{/if}
						</svg>
					</button>
				</div>
			</div>

			<!-- Code Content -->
			<div class="overflow-x-auto pt-2">
				<div class="min-w-max">
					{#if showLineNumbers}
						<Highlight {language} {code} let:highlighted>
							<LineNumbers
								{highlighted}
								{wrapLines}
								{hideBorder}
								{startingLineNumber}
								{highlightedLines}
								style="--highlighted-background: {highlightedBackground}"
							/>
						</Highlight>
					{:else}
						<Highlight {language} {code} />
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else}
	<div
		class="code-block relative w-full rounded"
		data-language={languageTag}
		style:background-color={themeBackground}
	>
		<div class="p-4">
			{#each Array(numberOfLines) as _, i (i)}
				<div
					class="skeleton-line my-1 h-[1.2em] rounded {textColor}"
					style="width: {85 + Math.random() * 15}%; background-color: {skeletonBackground}"></div>
			{/each}
		</div>
	</div>
{/if}