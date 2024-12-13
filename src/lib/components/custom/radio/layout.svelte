<!-- src\lib\components\custom\radio\layout.svelte -->
<script lang="ts">
	import {Label} from '$lib/components/ui/label/index.js';
	import {RadioColor} from '@/lib/components/custom/radio';
	import type {ColorVariant, Layout} from '.';
	import {cn} from '$lib/utils';

	/**
	 * Configuration interface for radio layout styles and behavior
	 */
	interface LayoutConfig {
		containerClass: string;
		labelClass: string;
		isInline: boolean;
		isStretched?: boolean;
		labelFirst: boolean;
	}

	/**
	 * Props interface for the RadioLayout component
	 */
	interface RadioLayoutProps {
		/** Unique value identifier for the radio input */
		value: string;
		/** HTML id attribute for the radio input */
		id: string;
		/** Label text to display */
		label: string;
		/** Controls whether the radio input is disabled */
		disabled?: boolean;
		/** Layout configuration for the radio and label */
		layout?: Layout;
		/** Visual style variant of the radio input */
		color?: ColorVariant;
	}

	/**
	 * Props interface for the RadioColor subcomponent
	 */
	interface RadioColorProps {
		value: string;
		id: string;
		disabled: boolean;
		variant: ColorVariant;
	}

	const props = $props();

	// Reactive props with type assertions and defaults
	const value = $derived(props.value as string);
	const id = $derived(props.id as string);
	const label = $derived(props.label as string);
	const disabled = $derived((props.disabled as boolean) ?? false);
	const layout = $derived((props.layout as Layout) ?? 'left');
	const color = $derived((props.color as ColorVariant) ?? 'default');

	/**
	 * Creates layout configurations based on disabled state
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
				labelClass: cn('radio-inline-label', isDisabled && 'disabled'),
				labelFirst: false
			},
			'right-inline': {
				...baseInlineConfig,
				labelClass: cn('radio-inline-label', isDisabled && 'disabled'),
				labelFirst: true
			},
			'left-stretched': {
				...stretchedConfig,
				labelClass: cn('radio-stacked-label', isDisabled && 'disabled'),
				labelFirst: false
			},
			'right-stretched': {
				...stretchedConfig,
				labelClass: cn('radio-stacked-label', isDisabled && 'disabled'),
				labelFirst: true
			},
			left: {
				...baseStackedConfig,
				labelClass: cn('radio-stacked-label', isDisabled && 'disabled'),
				labelFirst: false
			},
			right: {
				...baseStackedConfig,
				labelClass: cn('radio-stacked-label', isDisabled && 'disabled'),
				labelFirst: true
			}
		};
	}

	// Reactive layout configuration
	const config = $derived(createLayoutConfigs(disabled)[layout]);

	// Reactive props for RadioColor component
	const radioProps = $derived({
		value,
		id,
		disabled,
		variant: color
	} satisfies RadioColorProps);

	// Validate required props
	$effect(() => {
		if (!value) throw new Error('Radio value is required');
		if (!id) throw new Error('Radio id is required');
		if (!label) throw new Error('Radio label is required');
	});
</script>

<div class={config.containerClass}>
	{#if config.labelFirst}
		<Label class={config.labelClass} for={id}>{label}</Label>
		<RadioColor {...radioProps} />
	{:else}
		<RadioColor {...radioProps} />
		<Label class={config.labelClass} for={id}>{label}</Label>
	{/if}
</div>
