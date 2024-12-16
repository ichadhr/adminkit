<!-- src\lib\components\custom\checkbox\color.svelte -->

<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { cn } from '$lib/utils';
	import type { CheckboxVariant } from '.';

	/**
	 * Unique identifier for the checkbox.
	 */
	export let id: string | undefined = undefined;

	/**
	 * Determines whether the checkbox is checked.
	 *
	 * @default false
	 */
	export let checked: boolean = false;

	/**
	 * Determines whether the checkbox is disabled.
	 *
	 * @default false
	 */
	export let disabled: boolean = false;

	/**
	 * Visual variant of the checkbox.
	 *
	 * @default 'default'
	 */
	export let variant: CheckboxVariant = 'default';

	/**
	 * Computed classes for styling based on variant and disabled state.
	 */
	$: classes = cn(`checkbox-${variant}`, disabled ? 'disabled' : undefined);
</script>

<Checkbox {id} bind:checked {disabled} class={classes} />
