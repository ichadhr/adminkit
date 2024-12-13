<!-- src\lib\components\custom\checkbox\layout.svelte -->

<script lang="ts">
	import {Label} from '$lib/components/ui/label';
	import {ColorCheckbox} from '$lib/components/custom/checkbox';
	import type {CheckboxVariant, Layout} from '.';
	import {cn} from '$lib/utils';

	export let id: string;
	export let label: string;
	export let disabled: boolean = false;
	export let checked: boolean;
	export let onCheckedChange: (checked: boolean) => void;
	export let layout: Layout = 'left';
	export let color: CheckboxVariant = 'default';

	$: checkboxId = `checkbox-${layout}-${id}`;

	$: checkboxProps = {
		id: checkboxId,
		checked,
		disabled,
		onCheckedChange,
		variant: color
	};

	$: config = {
		'left-inline': {
			wrapperClass: 'flex flex-wrap gap-4',
			containerClass: '',
			labelClass: cn(
				'inline-flex items-center gap-2 font-normal',
				disabled && 'opacity-50 cursor-not-allowed'
			),
			isInline: true,
			labelFirst: false
		},
		'right-inline': {
			wrapperClass: 'flex flex-wrap gap-4',
			containerClass: '',
			labelClass: cn(
				'inline-flex items-center gap-2 font-normal flex-row-reverse',
				disabled && 'opacity-50 cursor-not-allowed'
			),
			isInline: true,
			labelFirst: false
		},
		'left-stretched': {
			containerClass: cn('checkbox-layout-container', 'stretched'),
			labelClass: cn('checkbox-layout-label-default', disabled && 'disabled'),
			isInline: false,
			isStretched: true,
			labelFirst: false
		},
		'right-stretched': {
			containerClass: cn('checkbox-layout-container', 'stretched'),
			labelClass: cn('checkbox-layout-label-default', disabled && 'disabled'),
			isInline: false,
			isStretched: true,
			labelFirst: true
		},
		right: {
			containerClass: 'checkbox-layout-container',
			labelClass: cn('checkbox-layout-label-right', disabled && 'disabled'),
			isInline: false,
			isStretched: false,
			labelFirst: true
		},
		left: {
			containerClass: 'checkbox-layout-container',
			labelClass: cn('checkbox-layout-label-inline', disabled && 'disabled'),
			isInline: false,
			isStretched: false,
			labelFirst: false
		}
	}[layout];
</script>

{#if config.isInline}
	<div class={config.wrapperClass}>
		<Label class={config.labelClass} for={checkboxId}>
			<ColorCheckbox {...checkboxProps} />
			{label}
		</Label>
	</div>
{:else}
	<div class={config.containerClass}>
		{#if config.isStretched}
			{#if config.labelFirst}
				<Label class={config.labelClass} for={checkboxId}>
					{label}
				</Label>
				<ColorCheckbox {...checkboxProps} />
			{:else}
				<ColorCheckbox {...checkboxProps} />
				<Label class={config.labelClass} for={checkboxId}>
					{label}
				</Label>
			{/if}
		{:else}
			<Label class={config.labelClass} for={checkboxId}>
				{#if config.labelFirst}
					{label}
					<ColorCheckbox {...checkboxProps} />
				{:else}
					<ColorCheckbox {...checkboxProps} />
					{label}
				{/if}
			</Label>
		{/if}
	</div>
{/if}
