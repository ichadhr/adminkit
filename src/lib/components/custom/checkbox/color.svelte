<!-- src\lib\components\custom\checkbox\color.svelte -->
<script lang="ts">
	import {Checkbox} from '$lib/components/ui/checkbox';
	import {cn} from '$lib/utils';
	import type {CheckboxVariant} from '.';

	/**
	 * Interface for Color Checkbox component props
	 */
	interface ColorCheckboxProps {
		/** Checkbox checked state */
		checked?: boolean;
		/** Checkbox disabled state */
		disabled?: boolean;
		/** Unique identifier for the checkbox */
		id?: string;
		/** Callback function when checkbox state changes */
		onCheckedChange?: (checked: boolean) => void;
		/** Visual variant of the checkbox */
		variant?: CheckboxVariant;
	}

	/**
	 * Component props with default values
	 */
	export let checked = false;
	export let disabled = false;
	export let id: ColorCheckboxProps['id'] = undefined;
	export let onCheckedChange: ColorCheckboxProps['onCheckedChange'] = undefined;
	export let variant: ColorCheckboxProps['variant'] = 'default';

	/**
	 * Computed classes for styling based on variant and disabled state
	 */
	$: classes = cn(`checkbox-${variant}`, disabled && 'disabled');
</script>

<Checkbox {id} {checked} {disabled} {onCheckedChange} class={classes} />
