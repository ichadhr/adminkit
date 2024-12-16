<!-- src\lib\components\custom\switch\layout.svelte -->

<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { ColorSwitch } from '$lib/components/custom/switch';
	import type { SwitchVariant, Layout } from '.';
	import { cn } from '$lib/utils';

	/**
	 * Configuration interface for layout styling and behavior
	 */
	interface LayoutConfig {
		wrapperClass?: string;
		containerClass?: string;
		labelClass: string;
		isInline?: boolean;
		isStretched?: boolean;
		labelFirst?: boolean;
	}

	const {
		id,
		label,
		disabled = false,
		checked,
		onCheckedChange,
		layout = 'left' as const satisfies Layout,
		color = 'default' as const satisfies SwitchVariant
	} = $props<{
		id: string;
		label: string;
		disabled?: boolean;
		checked: boolean;
		onCheckedChange: (checked: boolean) => void;
		layout?: Layout;
		color?: SwitchVariant;
	}>();

	/**
	 * Base styling classes for consistent layout appearance
	 */
	const baseStyles = {
		inline: 'inline-flex items-center font-normal gap-2',
		layout: 'font-normal gap-2 flex items-center'
	} as const;

	/** Common disabled style */
	const disabledStyle = 'opacity-50 cursor-not-allowed';

	/**
	 * Computed unique identifier for the switch
	 */
	const switchId = $derived(`switch-${layout}-${id}`);

	/**
	 * Props passed to the ColorSwitch component
	 */
	const switchProps = $derived({
		id: switchId,
		checked,
		disabled,
		onCheckedChange,
		variant: color
	});

	/**
	 * Layout configurations for different switch layouts
	 */
	const layoutConfigs: Record<Layout, LayoutConfig> = {
		'left-inline': {
			wrapperClass: 'inline-flex flex-wrap items-center gap-4',
			labelClass: cn(baseStyles.inline, disabled && disabledStyle),
			isInline: true
		},
		'right-inline': {
			wrapperClass: 'inline-flex flex-wrap items-center gap-4',
			labelClass: cn(baseStyles.inline, 'flex-row-reverse', disabled && disabledStyle),
			isInline: true
		},
		'left-stretched': {
			containerClass: 'switch-layout-container stretched',
			labelClass: cn('switch-layout-label-default', baseStyles.layout, disabled && disabledStyle),
			isStretched: true
		},
		'right-stretched': {
			containerClass: 'switch-layout-container stretched',
			labelClass: cn('switch-layout-label-default', baseStyles.layout, disabled && disabledStyle),
			isStretched: true,
			labelFirst: true
		},
		right: {
			containerClass: 'switch-layout-container',
			labelClass: cn('switch-layout-label-inline', baseStyles.layout, disabled && disabledStyle),
			labelFirst: true
		},
		left: {
			containerClass: 'switch-layout-container',
			labelClass: cn('switch-layout-label-inline', baseStyles.layout, disabled && disabledStyle)
		}
	} as const;

	/**
	 * Current active layout configuration
	 */
	const config = $derived(layoutConfigs[layout as keyof typeof layoutConfigs]);
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
