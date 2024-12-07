<script lang="ts">
    import { Label } from '$lib/components/ui/label/index.js';
    import { RadioColor } from '@/lib/components/custom/radio';
    import type { ColorVariant, Layout } from '.';
    import { cn } from '$lib/utils';

    export let value: string;
    export let id: string;
    export let label: string;
    export let disabled: boolean = false;
    export let layout: Layout = 'left';
    export let color: ColorVariant = 'default';

    $: config = {
        'left-inline': {
            containerClass: 'radio-inline-container',
            labelClass: cn('radio-inline-label', disabled && 'disabled'),
            isInline: true,
            labelFirst: false
        },
        'right-inline': {
            containerClass: 'radio-inline-container',
            labelClass: cn('radio-inline-label', disabled && 'disabled'),
            isInline: true,
            labelFirst: true
        },
        'left-stretched': {
            containerClass: cn('radio-stacked-container', 'stretched'),
            labelClass: cn('radio-stacked-label', disabled && 'disabled'),
            isInline: false,
            isStretched: true,
            labelFirst: false
        },
        'right-stretched': {
            containerClass: cn('radio-stacked-container', 'stretched'),
            labelClass: cn('radio-stacked-label', disabled && 'disabled'),
            isInline: false,
            isStretched: true,
            labelFirst: true
        },
        'right': {
            containerClass: 'radio-stacked-container',
            labelClass: cn('radio-stacked-label', disabled && 'disabled'),
            isInline: false,
            isStretched: false,
            labelFirst: true
        },
        'left': {
            containerClass: 'radio-stacked-container',
            labelClass: cn('radio-stacked-label', disabled && 'disabled'),
            isInline: false,
            isStretched: false,
            labelFirst: false
        }
    }[layout];

    $: radioProps = {
        value,
        id,
        disabled,
        variant: color
    };
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