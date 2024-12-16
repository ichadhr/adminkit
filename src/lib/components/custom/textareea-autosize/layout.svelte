<!-- src\lib\components\custom\textareea-autosize\layout.svelte -->
<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	/**
	 * Props interface for the autosize textarea component
	 */
	interface AutosizeTextareaProps extends HTMLTextareaAttributes {
		/** Text content of the textarea */
		value?: string;
		/** Placeholder text when empty */
		placeholder?: string;
		/** Initial number of rows */
		rows?: number;
		/** Additional CSS classes */
		class?: string;
	}

	/**
	 * Component props with type checking
	 */
	export let value: AutosizeTextareaProps['value'] = '';
	export let placeholder: AutosizeTextareaProps['placeholder'] = '';
	export let rows: AutosizeTextareaProps['rows'] = 3;

	/**
	 * DOM reference to the textarea wrapper
	 * @type {HTMLDivElement | null}
	 */
	let textareaRef: HTMLDivElement | null = null;

	/**
	 * Safely queries and returns the textarea element
	 * @returns {HTMLTextAreaElement | null} The textarea element or null if not found
	 */
	function getTextareaElement(): HTMLTextAreaElement | null {
		if (!textareaRef) return null;
		const textarea = textareaRef.querySelector<HTMLTextAreaElement>('textarea');
		return textarea;
	}

	/**
	 * Updates the textarea height to match its content
	 * @throws {Error} When textarea manipulation fails
	 */
	function updateTextareaHeight(): void {
		const textarea = getTextareaElement();
		if (!textarea) {
			console.warn('Textarea element not found');
			return;
		}

		try {
			// Store current scroll position
			const scrollPos = window.scrollY;

			// Update height
			textarea.style.height = 'auto';
			const newHeight = textarea.scrollHeight;
			textarea.style.height = `${newHeight}px`;

			// Restore scroll position to prevent page jump
			window.scrollTo(0, scrollPos);
		} catch (error) {
			console.error('Failed to update textarea height:', error);
			throw new Error('Textarea height adjustment failed');
		}
	}

	/**
	 * Adjusts the height of the textarea using RAF for better performance
	 * @param {boolean} immediate - Whether to skip RAF and update immediately
	 */
	function adjustHeight(immediate: boolean = false): void {
		if (!textareaRef) return;

		if (immediate) {
			updateTextareaHeight();
		} else {
			requestAnimationFrame(updateTextareaHeight);
		}
	}

	/**
	 * Handles input events on the textarea
	 * @param {Event} event - The form event object
	 */
	function handleInput(event: Event & { currentTarget: EventTarget & HTMLDivElement }): void {
		adjustHeight();
	}

	// Reactive height adjustment when value changes
	$: if (value !== undefined) {
		// Use immediate update for value changes to prevent flicker
		adjustHeight(true);
	}

	// Initialize height on mount and cleanup on destroy
	onMount(() => {
		adjustHeight(true);

		return () => {
			textareaRef = null;
		};
	});
</script>

<div bind:this={textareaRef} on:input={handleInput} class="auto-textarea-wrapper">
	<Textarea
		bind:value
		{rows}
		{placeholder}
		class={cn('scrollbar-none overflow-hidden', $$restProps.class)}
		{...$$restProps}
	/>
</div>
