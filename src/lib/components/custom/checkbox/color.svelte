<!-- src\lib\components\custom\checkbox\color.svelte -->

<script lang="ts">
	import {Checkbox} from '$lib/components/ui/checkbox';
	import {cn} from '$lib/utils';
	import type {CheckboxVariant} from '.';

	export let checked = false;
	export let disabled = false;
	export let id: string | undefined = undefined;
	export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;
	export let variant: CheckboxVariant = 'default';

	$: classes = cn(`checkbox-${variant}`, disabled && 'disabled');
</script>

<Checkbox {id} {checked} {disabled} {onCheckedChange} class={classes} />
