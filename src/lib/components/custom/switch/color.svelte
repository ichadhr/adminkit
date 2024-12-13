<!-- src\lib\components\custom\switch\color.svelte -->

<script lang="ts">
	import {Switch} from '$lib/components/ui/switch';
	import {cn} from '$lib/utils';
	import type {SwitchVariant} from '.';

	/**
	 * Props interface for ColorSwitch component
	 * @interface ColorSwitchProps
	 */
	interface ColorSwitchProps {
		/** The checked state of the switch */
		checked?: boolean;
		/** Whether the switch is disabled */
		disabled?: boolean;
		/** Unique identifier for the switch */
		id?: string;
		/** Callback when switch state changes */
		onCheckedChange?: (checked: boolean) => void;
		/** Color variant of the switch */
		variant?: SwitchVariant;
	}

	/**
	 * Default values for props with type safety
	 * @constant {Readonly<Partial<ColorSwitchProps>>}
	 */
	const DEFAULT_PROPS = Object.freeze({
		checked: false,
		disabled: false,
		variant: 'default' as const
	} satisfies Partial<ColorSwitchProps>);

	/**
	 * Component props with type-safe defaults
	 * Using let for reactivity in Svelte 5
	 */
	let {
		checked = DEFAULT_PROPS.checked,
		disabled = DEFAULT_PROPS.disabled,
		id,
		onCheckedChange,
		variant = DEFAULT_PROPS.variant
	} = $props();

	/**
	 * Computes dynamic classes for the switch component
	 * Combines variant-specific styling with disabled state
	 * @returns {string} Combined CSS classes
	 */
	const switchClasses = $derived(() => cn(`switch-${variant}`, disabled && 'disabled'));
</script>

<Switch {id} {checked} {disabled} {onCheckedChange} class={switchClasses()} />
