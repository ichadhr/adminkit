<script lang="ts">
    import ColorCheckbox from '@/lib/components/custom-checkbox/checkbox-color.svelte';
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
</script>

<Label
    class={cn(
        "inline-flex items-center gap-2",
        position === 'right' && "flex-row-reverse",
        item.disabled && "opacity-50 cursor-not-allowed"
    )}
    for={`${position}-inline-${item.id}`}
>
    <ColorCheckbox
        id={`${position}-inline-${item.id}`}
        {checked}
        disabled={item.disabled}
        {onCheckedChange}
        {variant}
    />
    {item.label}
</Label>