<!-- src\lib\components\custom\radio\color.svelte -->

<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import {cn} from '$lib/utils';
	import type {RadioLayoutProps, ColorVariant} from './index';
	import {isColorVariant} from '../variants';

	/**
	 * Interface for RadioColor component props
	 * @interface RadioColorProps
	 */
	interface RadioColorProps {
		readonly value: string;
		readonly id: string;
		readonly disabled?: RadioLayoutProps['disabled'];
		readonly variant?: ColorVariant;
	}

	const props = $props();

	// Basic prop values with validation
	const value = $derived(props.value ?? '');
	const id = $derived(props.id ?? '');
	const disabled = $derived(props.disabled ?? false);
	const variant = $derived(props.variant ?? 'default');

	// Validate required props and types
	$effect(() => {
		if (!value) {
			throw new Error('Radio value is required');
		}
		if (!id) {
			throw new Error('Radio id is required');
		}
		if (!isColorVariant(variant)) {
			throw new Error(`Invalid color variant: ${variant}`);
		}
	});

	/**
	 * Computes CSS classes for the radio component
	 * Combines base styles with variant and disabled state
	 */
	const radioClasses = $derived(cn('radio-item', `radio-${variant}`, disabled && 'disabled'));
</script>

<RadioGroup.Item {value} {id} {disabled} class={radioClasses} />
