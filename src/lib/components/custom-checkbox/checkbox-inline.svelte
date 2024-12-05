<script lang="ts">
    import ColorCheckbox from './checkbox-color.svelte';
    import { Label } from '$lib/components/ui/label';
    import { cn } from '$lib/utils';
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

    $: checkboxId = `${position}-inline-${item.id}`;

    $: checkboxProps = {
        id: checkboxId,
        checked,
        disabled: item.disabled,
        onCheckedChange,
        variant
    };

    $: labelClasses = cn(
        'inline-flex items-center gap-2',
        position === 'right' && 'flex-row-reverse',
        item.disabled && 'opacity-50 cursor-not-allowed'
    );
</script>

<Label class={labelClasses} for={checkboxId}>
    <ColorCheckbox {...checkboxProps} />
    {item.label}
</Label>