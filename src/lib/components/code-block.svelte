<script lang="ts">
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import defaultTheme from 'svelte-highlight/styles/github-dark';
	import { browser } from '$app/environment';

	const themeBackgrounds: Record<string, string> = {
		'github-dark': '#0d1117',
		dracula: '#282a36',
		monokai: '#272822',
		nord: '#2e3440',
		'one-dark': '#282c34',
		github: '#ffffff',
		'arduino-light': '#ffffff',
		vs: '#ffffff'
	};

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

	let isCopied = false;
	const copyTimeout = 2000;

	function getThemeBackground(themePath: string) {
		const themeName = themePath.split('/').pop()?.replace('.css', '');
		return themeBackgrounds[themeName || ''] || themeBackgrounds['github-dark'];
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(code);
			isCopied = true;
			setTimeout(() => (isCopied = false), copyTimeout);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	$: languageTag = showLanguageTag && language?.name ? language.name : null;
	$: shouldRender = browser;
	$: numberOfLines = code.split('\n').length;
	$: themeBackground = getThemeBackground(theme);
</script>

<svelte:head>
	{@html theme}
</svelte:head>

{#if shouldRender}
	<div class="code-block relative w-full" data-language={languageTag}>
		<div class="w-full overflow-hidden rounded" style="background-color: {themeBackground}">
			<div
				class="absolute right-0 top-0 z-20 flex items-center rounded-bl"
				style="background-color: {themeBackground}"
			>
				{#if languageTag}
					<div class="px-2 py-1 text-xs text-white">{languageTag}</div>
				{/if}
				<button
					class="px-2 py-1 pt-2 hover:bg-white/20"
					on:click={copyToClipboard}
					aria-label="Copy code"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 {isCopied ? 'text-green-400' : 'text-white'}"
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

			<div class="overflow-x-auto">
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
		style="background-color: {themeBackground}"
	>
		<div class="p-4">
			{#each Array(numberOfLines) as _, i}
				<div
					class="skeleton-line my-1 h-[1.2em] rounded"
					style="width: {85 + Math.random() * 15}%"
				></div>
			{/each}
		</div>
	</div>
{/if}
