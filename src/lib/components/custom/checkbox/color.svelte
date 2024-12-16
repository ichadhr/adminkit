<!-- src\lib\components\custom\checkbox\color.svelte -->
<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { cn } from '$lib/utils';
	import type { CheckboxVariant } from './index';

	// Exported props with TypeScript types
	export let id: string | undefined = undefined;
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let variant: CheckboxVariant = 'default';

	/** Computed classes for styling based on variant and disabled state */
	$: classes = cn(`checkbox-${variant}`, disabled && 'disabled');
</script>

<Checkbox {id} bind:checked {disabled} class={classes} />
