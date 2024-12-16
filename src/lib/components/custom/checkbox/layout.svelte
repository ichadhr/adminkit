<!-- src\lib\components\custom\checkbox\layout.svelte -->
<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { ColorCheckbox } from '$lib/components/custom/checkbox';
	import { cn } from '$lib/utils';
	import type { CheckboxVariant, Layout, LayoutConfigs, CheckboxLayoutProps } from '.';

	// Exported props with TypeScript types
	export let id: CheckboxLayoutProps['id'];
	export let label: CheckboxLayoutProps['label'];
	export let disabled: boolean = false;
	export let layout: Layout = 'left';
	export let color: CheckboxVariant = 'default';
	export let checked: boolean = false;
	export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;

	/** Internal variable to track the previous checked state */
	let previousChecked: boolean = checked;

	/** Computed classes for styling based on the disabled state */
	const disabledStyle = 'opacity-50 cursor-not-allowed';

	/**
	 * Creates layout configurations based on the disabled state.
	 *
	 * @param isDisabled - Indicates whether the checkbox is disabled.
	 * @returns A record mapping layouts to their configurations.
	 */
	function createLayoutConfigs(isDisabled: boolean): LayoutConfigs {
		return {
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
		};
	}

	/** Reactive layout configurations based on disabled state */
	$: layoutConfigs = createLayoutConfigs(disabled);

	/** Validated and typed layout value */
	$: validatedLayout = layout in layoutConfigs ? layout : 'left';

	/** Unique ID for the checkbox input */
	$: checkboxId = `checkbox-${validatedLayout}-${id}`;

	/** Current layout configuration */
	$: config = layoutConfigs[validatedLayout];

	/**
	 * Watcher for checked state changes to call onCheckedChange when provided.
	 */
	$: {
		if (checked !== previousChecked) {
			previousChecked = checked;
			if (typeof onCheckedChange === 'function') {
				onCheckedChange(checked);
			}
		}
	}

	/** Validate required props */
	$: {
		if (!id) {
			throw new Error('Checkbox "id" prop is required');
		}
		if (!label) {
			throw new Error('Checkbox "label" prop is required');
		}
	}
</script>

{#if config.isInline}
	<div class={config.wrapperClass}>
		<Label class={config.labelClass} for={checkboxId}>
			<ColorCheckbox id={checkboxId} bind:checked {disabled} variant={color} />
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
				<ColorCheckbox id={checkboxId} bind:checked {disabled} variant={color} />
			{:else}
				<ColorCheckbox id={checkboxId} bind:checked {disabled} variant={color} />
				<Label class={config.labelClass} for={checkboxId}>
					{label}
				</Label>
			{/if}
		{:else}
			<Label class={config.labelClass} for={checkboxId}>
				{#if config.labelFirst}
					{label}
					<ColorCheckbox id={checkboxId} bind:checked {disabled} variant={color} />
				{:else}
					<ColorCheckbox id={checkboxId} bind:checked {disabled} variant={color} />
					{label}
				{/if}
			</Label>
		{/if}
	</div>
{/if}
