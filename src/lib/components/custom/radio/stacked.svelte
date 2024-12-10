<script lang="ts">
	import {Label} from '$lib/components/ui/label/index.js';
	import RadioColor from '@/lib/components/custom/radio/color.svelte';
	import type {RadioProps, ColorVariant, Position} from '@/lib/components/custom/radio/index';
	import {POSITIONS} from '@/lib/components/custom/radio/index';
	import {cn} from '$lib/utils';

	interface StackedRadioProps {
		value: string;
		id: string;
		label: string;
		position?: Position;
		disabled?: RadioProps['disabled'];
		variant?: ColorVariant;
	}

	export let value: StackedRadioProps['value'];
	export let id: StackedRadioProps['id'];
	export let label: StackedRadioProps['label'];
	export let position: StackedRadioProps['position'] = 'left';
	export let disabled: StackedRadioProps['disabled'] = false;
	export let variant: StackedRadioProps['variant'] = 'default';

	// Validate position
	$: if (position && !POSITIONS.includes(position)) {
		console.warn(`Invalid position: ${position}. Must be one of: ${POSITIONS.join(', ')}`);
	}

	// Compute layout properties
	$: layout = {
		isStretched: position?.includes('stretched'),
		isLeftPosition: position?.startsWith('left')
	};

	$: containerClasses = cn('radio-stacked-container', layout.isStretched && 'stretched');
	$: labelClasses = cn('radio-stacked-label', disabled && 'disabled');
</script>

<div class={containerClasses}>
	{#if layout.isLeftPosition}
		<RadioColor {value} {id} {disabled} {variant} />
		<Label for={id} class={labelClasses}>{label}</Label>
	{:else}
		<Label for={id} class={labelClasses}>{label}</Label>
		<RadioColor {value} {id} {disabled} {variant} />
	{/if}
</div>
