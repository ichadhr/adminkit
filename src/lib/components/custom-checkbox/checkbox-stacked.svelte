<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import ColorCheckbox from '@/lib/components/custom-checkbox/checkbox-color.svelte';
	import type { CheckboxVariant } from '.';
	import { cn } from '$lib/utils';

	export let item: {
		id: string;
		label: string;
		disabled?: boolean;
	};

	export let checked: boolean;
	export let onCheckedChange: (checked: boolean) => void;
	export let position: 'left' | 'right' | 'left-stretched' | 'right-stretched' = 'left';
	export let variant: CheckboxVariant = 'default';

	// Common props for ColorCheckbox
	$: checkboxProps = {
		id: `checkbox-${position}-${item.id}`, // Updated ID to include position
		checked,
		disabled: item.disabled,
		onCheckedChange,
		variant
	};

	// Layout configurations
	const layouts = {
		base: 'flex w-full items-center py-2',
		stretched: 'justify-between',
		label: {
			default: 'font-normal text-foreground',
			inline: 'flex items-center gap-2 font-normal text-foreground',
			right: 'flex items-center gap-2 font-normal ml-auto text-foreground'
		}
	};

	// Add disabled class handling
	$: labelClasses = (baseClass: string) =>
		cn(baseClass, item.disabled && 'opacity-50 cursor-not-allowed');

	// Position configurations
	$: config = {
		'left-stretched': {
			containerClass: `${layouts.base} ${layouts.stretched}`,
			labelClass: layouts.label.default,
			isStretched: true,
			labelFirst: false
		},
		'right-stretched': {
			containerClass: `${layouts.base} ${layouts.stretched}`,
			labelClass: layouts.label.default,
			isStretched: true,
			labelFirst: true
		},
		right: {
			containerClass: layouts.base,
			labelClass: layouts.label.right,
			isStretched: false,
			labelFirst: true
		},
		left: {
			containerClass: layouts.base,
			labelClass: layouts.label.inline,
			isStretched: false,
			labelFirst: false
		}
	}[position];
</script>

<div class={config.containerClass}>
	{#if config.isStretched}
		{#if config.labelFirst}
			<Label class={labelClasses(config.labelClass)} for={checkboxProps.id}>
				{item.label}
			</Label>
			<ColorCheckbox {...checkboxProps} />
		{:else}
			<ColorCheckbox {...checkboxProps} />
			<Label class={labelClasses(config.labelClass)} for={checkboxProps.id}>
				{item.label}
			</Label>
		{/if}
	{:else}
		<Label class={labelClasses(config.labelClass)} for={checkboxProps.id}>
			{#if config.labelFirst}
				{item.label}
				<ColorCheckbox {...checkboxProps} />
			{:else}
				<ColorCheckbox {...checkboxProps} />
				{item.label}
			{/if}
		</Label>
	{/if}
</div>
