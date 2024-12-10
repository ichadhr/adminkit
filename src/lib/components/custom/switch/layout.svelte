<script lang="ts">
	import {Label} from '$lib/components/ui/label';
	import {ColorSwitch} from '$lib/components/custom/switch';
	import type {SwitchVariant, Layout} from '.';
	import {cn} from '$lib/utils';

	export let id: string;
	export let label: string;
	export let disabled: boolean = false;
	export let checked: boolean;
	export let onCheckedChange: (checked: boolean) => void;
	export let layout: Layout = 'left';
	export let color: SwitchVariant = 'default';

	$: switchId = `switch-${layout}-${id}`;

	$: switchProps = {
		id: switchId,
		checked,
		disabled,
		onCheckedChange,
		variant: color
	};

	// Base classes that are common across configurations
	const baseInlineClass = 'inline-flex items-center font-normal gap-2';
	const baseLayoutClass = 'font-normal gap-2 flex items-center';

	$: config = {
		'left-inline': {
			wrapperClass: 'inline-flex flex-wrap items-center gap-4',
			labelClass: cn(baseInlineClass, disabled && 'opacity-50 cursor-not-allowed'),
			isInline: true
		},
		'right-inline': {
			wrapperClass: 'inline-flex flex-wrap items-center gap-4',
			labelClass: cn(
				baseInlineClass,
				'flex-row-reverse',
				disabled && 'opacity-50 cursor-not-allowed'
			),
			isInline: true
		},
		'left-stretched': {
			containerClass: 'switch-layout-container stretched',
			labelClass: cn('switch-layout-label-default', baseLayoutClass, disabled && 'disabled'),
			isStretched: true
		},
		'right-stretched': {
			containerClass: 'switch-layout-container stretched',
			labelClass: cn('switch-layout-label-default', baseLayoutClass, disabled && 'disabled'),
			isStretched: true,
			labelFirst: true
		},
		right: {
			containerClass: 'switch-layout-container',
			labelClass: cn('switch-layout-label-inline', baseLayoutClass, disabled && 'disabled'),
			labelFirst: true
		},
		left: {
			containerClass: 'switch-layout-container',
			labelClass: cn('switch-layout-label-inline', baseLayoutClass, disabled && 'disabled')
		}
	}[layout];
</script>

{#if config.isInline}
	<div class={config.wrapperClass}>
		<Label class={config.labelClass} for={switchId}>
			<ColorSwitch {...switchProps} />
			{label}
		</Label>
	</div>
{:else}
	<div class={config.containerClass}>
		{#if config.isStretched}
			{#if config.labelFirst}
				<Label class={config.labelClass} for={switchId}>{label}</Label>
				<ColorSwitch {...switchProps} />
			{:else}
				<ColorSwitch {...switchProps} />
				<Label class={config.labelClass} for={switchId}>{label}</Label>
			{/if}
		{:else}
			<Label class={config.labelClass} for={switchId}>
				{#if config.labelFirst}
					{label}
					<ColorSwitch {...switchProps} />
				{:else}
					<ColorSwitch {...switchProps} />
					{label}
				{/if}
			</Label>
		{/if}
	</div>
{/if}
