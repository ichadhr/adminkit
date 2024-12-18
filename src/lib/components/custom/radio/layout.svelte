<!-- src\lib\components\custom\radio\layout.svelte -->

<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { RadioColor } from '@/lib/components/custom/radio';
	import { cn } from '$lib/utils';
	import type { Layout, ColorVariant, LayoutConfig } from '.';

	// Exported props with TypeScript types
	export let value: string;
	export let id: string;
	export let label: string;
	export let disabled: boolean = false;
	export let layout: Layout = 'left';
	export let color: ColorVariant = 'default';

	/** Common disabled style */
	const disabledStyle = 'opacity-50 cursor-not-allowed';

	/**
	 * Creates layout configurations based on the disabled state.
	 *
	 * @param isDisabled - Current disabled state of the radio
	 * @returns Record of layout configurations for each layout type
	 */
	function createLayoutConfigs(isDisabled: boolean): Record<Layout, LayoutConfig> {
		const baseInlineConfig = {
			containerClass: 'radio-inline-container',
			isInline: true
		};

		const baseStackedConfig = {
			containerClass: 'radio-stacked-container',
			isInline: false,
			isStretched: false
		};

		const stretchedConfig = {
			...baseStackedConfig,
			containerClass: cn(baseStackedConfig.containerClass, 'stretched'),
			isStretched: true
		};

		return {
			'left-inline': {
				...baseInlineConfig,
				labelClass: cn('radio-inline-label', isDisabled && disabledStyle),
				labelFirst: false
			},
			'right-inline': {
				...baseInlineConfig,
				labelClass: cn('radio-inline-label', isDisabled && disabledStyle),
				labelFirst: true
			},
			'left-stretched': {
				...stretchedConfig,
				labelClass: cn('radio-stacked-label', isDisabled && disabledStyle),
				labelFirst: false
			},
			'right-stretched': {
				...stretchedConfig,
				labelClass: cn('radio-stacked-label', isDisabled && disabledStyle),
				labelFirst: true
			},
			left: {
				...baseStackedConfig,
				labelClass: cn('radio-stacked-label', isDisabled && disabledStyle),
				labelFirst: false
			},
			right: {
				...baseStackedConfig,
				labelClass: cn('radio-stacked-label', isDisabled && disabledStyle),
				labelFirst: true
			}
		};
	}

	/** Reactive layout configuration */
	$: config = createLayoutConfigs(disabled)[layout];

	// Validate required props
	$: {
		if (!value) throw new Error('Radio "value" prop is required');
		if (!id) throw new Error('Radio "id" prop is required');
		if (!label) throw new Error('Radio "label" prop is required');
	}
</script>

<div class={config.containerClass}>
	{#if config.labelFirst}
		<Label class={config.labelClass} for={id}>{label}</Label>
		<RadioColor {value} {id} {disabled} variant={color} />
	{:else}
		<RadioColor {value} {id} {disabled} variant={color} />
		<Label class={config.labelClass} for={id}>{label}</Label>
	{/if}
</div>
