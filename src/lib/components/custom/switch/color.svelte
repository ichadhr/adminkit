<script lang="ts">
    import { Switch } from '$lib/components/ui/switch';
    import { cn } from '$lib/utils';
    import type { SwitchVariant } from '.';
    
    export let checked = false;
    export let disabled = false;
    export let id: string | undefined = undefined;
    export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;
    export let variant: SwitchVariant = 'default';

    $: classes = cn(
        `switch-${variant}`,
        disabled && 'disabled'
    );
</script>

<Switch
    {id}
    {checked}
    {disabled}
    {onCheckedChange}
    class={classes}
/>