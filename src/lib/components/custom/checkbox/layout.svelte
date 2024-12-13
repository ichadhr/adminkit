<!-- src\lib\components\custom\checkbox\layout.svelte -->

<script lang="ts">
	import {Label} from '$lib/components/ui/label';
	import {ColorCheckbox} from '$lib/components/custom/checkbox';
	import type {CheckboxVariant, Layout} from '.';
	import {cn} from '$lib/utils';

	/**
	 * Configuration interface for checkbox layout styles and behavior
	 * @interface LayoutConfig
	 */
	interface LayoutConfig {
		wrapperClass?: string;
		containerClass: string;
		labelClass: string;
		isInline: boolean;
		isStretched?: boolean;
		labelFirst: boolean;
	}

	/**
	 * Component props interface with TypeScript types
	 * @interface CheckboxLayoutProps
	 */
	interface CheckboxLayoutProps {
		/** Unique identifier for the checkbox */
		id: string;
		/** Label text content */
		label: string;
		/** Whether the checkbox is disabled */
		disabled?: boolean;
		/** Current checked state */
		checked: boolean;
		/** Callback function when checked state changes */
		onCheckedChange: (checked: boolean) => void;
		/** Layout configuration for the checkbox */
		layout: Layout;
		/** Color variant of the checkbox */
		color?: CheckboxVariant;
	}

	/** Default layout configuration */
	const defaultLayout: Layout = 'left';

	/** Component props */
	const props = $props();

	/** Destructured props with default values */
	const {
		id,
		label,
		checked,
		onCheckedChange,
		disabled = false,
		layout: rawLayout = defaultLayout,
		color = 'default'
	} = props;

	/** Common disabled style */
	const disabledStyle = 'opacity-50 cursor-not-allowed';

	/**
	 * Creates layout configurations based on disabled state
	 * @param {boolean} isDisabled - Whether the checkbox is disabled
	 * @returns {Record<Layout, LayoutConfig>} Layout configuration object
	 */
	const createLayoutConfigs = (isDisabled: boolean): Record<Layout, LayoutConfig> => ({
		'left-inline': {
			wrapperClass: 'flex flex-wrap gap-4',
			containerClass: '',
			labelClass: cn('inline-flex items-center gap-2 font-normal', isDisabled && disabledStyle),
			isInline: true,
			labelFirst: false
		},
		'right-inline': {
			wrapperClass: 'flex flex-wrap gap-4',
			containerClass: '',
			labelClass: cn(
				'inline-flex items-center gap-2 font-normal flex-row-reverse',
				isDisabled && disabledStyle
			),
			isInline: true,
			labelFirst: false
		},
		'left-stretched': {
			containerClass: cn('checkbox-layout-container', 'stretched'),
			labelClass: cn('checkbox-layout-label-default', isDisabled && disabledStyle),
			isInline: false,
			isStretched: true,
			labelFirst: false
		},
		'right-stretched': {
			containerClass: cn('checkbox-layout-container', 'stretched'),
			labelClass: cn('checkbox-layout-label-default', isDisabled && disabledStyle),
			isInline: false,
			isStretched: true,
			labelFirst: true
		},
		right: {
			containerClass: 'checkbox-layout-container',
			labelClass: cn('checkbox-layout-label-right', isDisabled && disabledStyle),
			isInline: false,
			isStretched: false,
			labelFirst: true
		},
		left: {
			containerClass: 'checkbox-layout-container',
			labelClass: cn('checkbox-layout-label-inline', isDisabled && disabledStyle),
			isInline: false,
			isStretched: false,
			labelFirst: false
		}
	});

	/** Reactive layout configurations based on disabled state */
	const layoutConfigs = $derived(createLayoutConfigs(disabled));

	/**
	 * Validated and typed layout value
	 * Falls back to default layout if provided layout is invalid
	 */
	const layout: Layout = $derived(
		Object.keys(layoutConfigs).includes(rawLayout) ? (rawLayout as Layout) : defaultLayout
	);

	/** Unique ID for the checkbox input */
	const checkboxId = $derived(`checkbox-${layout}-${id}`);

	/** Props for the ColorCheckbox component */
	const checkboxProps = $derived({
		id: checkboxId,
		checked,
		disabled,
		onCheckedChange,
		variant: color
	});

	/** Current layout configuration */
	const config = $derived(layoutConfigs[layout]);
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
