<!-- src\lib\components\custom\radio\color.svelte -->

<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { cn } from '$lib/utils';
	import { isColorVariant } from '../variants';
	import type { ColorVariant } from './index';

	// Exported props with TypeScript types
	export let value: string;
	export let id: string;
	export let disabled: boolean = false;
	export let variant: ColorVariant = 'default';

	/** Validate required props and types */
	$: {
		if (!value) {
			throw new Error('Radio value is required');
		}
		if (!id) {
			throw new Error('Radio id is required');
		}
		if (!isColorVariant(variant)) {
			throw new Error(`Invalid color variant: ${variant}`);
		}
	}

	/** Computes CSS classes for the radio component */
	$: radioClasses = cn('radio-item', `radio-${variant}`, disabled && 'disabled');
</script>

<RadioGroup.Item {value} {id} {disabled} class={radioClasses} />
