<!-- src\lib\components\custom\textareea-autosize\layout.svelte -->

<script lang="ts">
	import {Textarea} from '$lib/components/ui/textarea';
	import {onMount} from 'svelte';
	import {cn} from '$lib/utils';

	export let value: string = '';
	export let placeholder: string = '';
	export let rows: number = 3;

	let textareaRef: any;

	function adjustHeight() {
		setTimeout(() => {
			if (!textareaRef) return;
			const textarea = textareaRef.querySelector('textarea');
			if (!textarea) return;
			textarea.style.height = 'auto';
			const newHeight = textarea.scrollHeight;
			textarea.style.height = `${newHeight}px`;
		}, 0);
	}

	$: if (value !== undefined) adjustHeight();

	onMount(() => {
		adjustHeight();
	});
</script>

<div bind:this={textareaRef} on:input={() => adjustHeight()} class="auto-textarea-wrapper">
	<Textarea
		bind:value
		{rows}
		{placeholder}
		class={cn('scrollbar-none overflow-hidden', $$restProps.class)}
		{...$$restProps}
	/>
</div>