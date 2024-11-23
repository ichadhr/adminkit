<script lang="ts">
	import { onMount } from 'svelte';
	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import rehypePrettyCode from 'rehype-pretty-code';
	import rehypeStringify from 'rehype-stringify';
	import type { Options, LineElement } from 'rehype-pretty-code';

	export let code = '';
	export let language = '';
	export let theme: Options['theme'] = 'github-dark';
	export let showLineNumbers = true;
	export let highlightLines: number[] = [];
	export let wordWrap = false;

	let highlighted = '';
	let copying = false;

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			copying = true;
			setTimeout(() => {
				copying = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	}

	onMount(async () => {
		const options: Options = {
			theme,
			keepBackground: true,
			onVisitLine(element: LineElement) {
				const lineNumber = Number(element.properties?.['data-line'] ?? '0');
				if (highlightLines.includes(lineNumber)) {
					element.properties.className = ['highlighted-line'];
				}
				element.children.push({
					type: 'text',
					value: ' '
				});
			}
		};

		const result = await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypePrettyCode, options)
			.use(rehypeStringify)
			.process(
				'```' + language + (showLineNumbers ? ' showLineNumbers' : '') + '\n' + code + '\n```'
			);

		highlighted = String(result);
	});
</script>

<div class="code-block-wrapper">
	<div class="code-block" class:word-wrap={wordWrap}>
		{@html highlighted}
	</div>
	<span
		class="copy-text"
		on:click={copyCode}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Enter' && copyCode()}
	>
		{copying ? 'Copied!' : 'Copy'}
	</span>
</div>
