<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import ColorCheckbox from '@/lib/components/custom-checkbox/checkbox-color.svelte';
	import type { CheckboxVariant } from '.';

	export let item: { 
		id: string;
		label: string;
		disabled?: boolean;
	};
	export let checked: boolean;
	export let onCheckedChange: (checked: boolean) => void;
	export let position: 'left' | 'right' = 'left';
	export let variant: CheckboxVariant = 'default';
</script>

{#if position === 'left'}
	<div class="flex w-full items-center py-2">
		<Label class="flex items-center gap-2 font-normal" for={`left-${item.id}`}>
			<ColorCheckbox
				id={`left-${item.id}`}
				{checked}
				disabled={item.disabled}
				{onCheckedChange}
				{variant}
			/>
			{item.label}
		</Label>
	</div>
{:else}
	<div class="flex w-full items-center justify-between py-2">
		<Label class="font-normal" for={`right-${item.id}`}>
			{item.label}
		</Label>
		<ColorCheckbox
			id={`right-${item.id}`}
			{checked}
			disabled={item.disabled}
			{onCheckedChange}
			{variant}
		/>
	</div>
{/if}
