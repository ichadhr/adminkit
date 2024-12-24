<!-- src\lib\components\custom\code-block\layout.svelte -->

<script lang="ts">
	import { onDestroy } from 'svelte';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import defaultTheme from 'svelte-highlight/styles/github-dark';
	import { browser } from '$app/environment';
	import type { CodeBlockProps, ThemeBackgrounds, ThemePattern } from '.';

	// Constants
	const DEFAULT_COPY_TIMEOUT = 2000;
	const SKELETON_BACKGROUNDS: ThemeBackgrounds = {
		dark: 'rgba(0, 0, 0, 0.1)',
		light: 'rgba(255, 255, 255, 0.1)'
	} as const;

	const THEME_PATTERNS: readonly ThemePattern[] = [
		/background(?:-color)?:\s*hsl\(([^)]+)\)/,
		/background(?:-color)?:\s*(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})/,
		/background(?:-color)?:\s*rgb\((\s*\d+\s*,\s*\d+\s*,\s*\d+\s*)\)/
	] as const;

	// Props
	export let code: CodeBlockProps['code'];
	export let language: CodeBlockProps['language'] = null;
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

	function getThemeBackground(themeCSS: string): string {
		const defaultBackground = 'hsl(var(--background))';

		try {
			for (const pattern of THEME_PATTERNS) {
				const match = themeCSS.match(pattern);
				if (!match?.[1]) continue;

				const color = match[1];
				if (color.includes('var(--')) return `hsl(${color})`;
				if (color.startsWith('rgb')) {
					const [r, g, b] = color.split(',').map((n) => parseInt(n.trim()));
					return `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`;
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
			const [r, g, b] = [0, 2, 4].map((i) => parseInt(color.substring(i, i + 2), 16));
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
			console.error('Failed to copy code:', err);
		}
	}

	onDestroy(() => clearTimeout(copyTimeoutId));

	// Reactive declarations
	$: languageTag = showLanguageTag && language?.name ? language.name : null;
	$: shouldRender = browser;
	$: themeBackground = getThemeBackground(theme);
	$: textColor = shouldUseDarkText(themeBackground) ? 'text-gray-800' : 'text-white';
	$: skeletonBackground = shouldUseDarkText(themeBackground)
		? SKELETON_BACKGROUNDS.dark
		: SKELETON_BACKGROUNDS.light;

	$: numberOfLines = code.split('\n').length;
	$: lineWidths = code.split('\n').map((line) => {
		const indentString = line.match(/^[\s\t]*/)?.[0] || '';
		const indentLevel =
			indentString.split('\t').length - 1 + (indentString.split(' ').length - 1) / 4;
		const baseLength = line.trimStart().length;
		const indentWidth = Math.pow(1.5, indentLevel) * 10;
		const effectiveLength = baseLength + indentWidth;
		return `${Math.max(20, Math.min(100, (effectiveLength / 80) * 100))}%`;
	});

	export let forceSkeleton = false;
</script>

<svelte:head>{@html theme}</svelte:head>

{#if shouldRender && !forceSkeleton}
	<div class="code-block">
		<!-- Move controls outside code-container but inside code-block -->
		<div class="controls-wrapper">
			<div class="controls">
				{#if languageTag}
					<div class="language-tag {textColor}">{languageTag}</div>
				{/if}
				<div class="copy-button-wrapper">
					<button class="copy-button" on:click={copyToClipboard} aria-label="Copy code">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class={textColor}
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
		</div>

		<div class="code-container" style:background-color={themeBackground}>
			<div class="code-content">
				<div class="code-inner">
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
	<div class="code-block">
		<div class="controls-wrapper">
			<div class="controls">
				{#if languageTag}
					<div class="language-tag">
						<div
							class="skeleton-line"
							style:background={skeletonBackground}
							style:width="3rem"
							style:height="1rem"
						></div>
					</div>
				{/if}
				<div class="copy-button-wrapper">
					<div class="copy-button">
						<div
							class="skeleton-line"
							style:background={skeletonBackground}
							style:width="1rem"
							style:height="1rem"
						></div>
					</div>
				</div>
			</div>
		</div>

		<div class="code-container" style:background-color={themeBackground}>
			<div class="code-content">
				<div class="code-inner">
					<div class="skeleton-container">
						{#if showLineNumbers}
							<div class="line-numbers-skeleton">
								{#each Array(numberOfLines) as _, i (i)}
									<div
										class="skeleton-line {textColor}"
										style:background-color={skeletonBackground}
									></div>
								{/each}
							</div>
						{/if}

						<div class="code-lines-skeleton">
							{#each Array(numberOfLines) as _, i (i)}
								<div
									class="skeleton-line {textColor}"
									style:background-color={skeletonBackground}
									style:width={lineWidths[i]}
								></div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
