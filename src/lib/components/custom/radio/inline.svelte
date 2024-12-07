<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import RadioColor from '@/lib/components/custom/radio/color.svelte';
	import type { RadioProps, ColorVariant } from '@/lib/components/custom/radio/index';
	import { cn } from '$lib/utils';

	type Position = 'left' | 'right';

	interface InlineRadioProps {
		value: string;
		id: string;
		label: string;
		position?: Position;
		disabled?: RadioProps['disabled'];
		variant?: ColorVariant;
	}

	export let value: InlineRadioProps['value'];
	export let id: InlineRadioProps['id'];
	export let label: InlineRadioProps['label'];
	export let position: InlineRadioProps['position'] = 'left';
	export let disabled: InlineRadioProps['disabled'] = false;
	export let variant: InlineRadioProps['variant'] = 'default';

	$: isLeftPosition = position === 'left';

	$: labelClasses = cn('radio-inline-label', disabled && 'disabled');
</script>

<div class="radio-inline-container">
	{#if isLeftPosition}
		<RadioColor {value} {id} {disabled} {variant} />
		<Label class={labelClasses} for={id}>{label}</Label>
	{:else}
		<Label class={labelClasses} for={id}>{label}</Label>
		<RadioColor {value} {id} {disabled} {variant} />
	{/if}
</div>
