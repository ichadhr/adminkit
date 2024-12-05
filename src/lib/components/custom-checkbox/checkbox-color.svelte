<script lang="ts">
    import { Checkbox } from '$lib/components/ui/checkbox';
    import type { CheckboxVariant } from '$lib/components/custom-checkbox';
    import { cn } from '$lib/utils';
    
    export let checked = false;
    export let disabled = false;
    export let id: string | undefined = undefined;
    export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;
    export let variant: CheckboxVariant = 'default';

    const SEMANTIC_VARIANTS = {
        default: '',
        danger: 'destructive',
        success: 'success',
        info: 'info',
        warning: 'warning'
    } as const;

    const GRAYSCALE_COLORS = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const;
    const COLORS = [
        'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
        'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
        'fuchsia', 'pink', 'rose'
    ] as const;

    type VariantStyles = Record<CheckboxVariant, string>;

    const createSemanticVariants = (): Partial<VariantStyles> => 
        Object.entries(SEMANTIC_VARIANTS).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value ? `data-[state=checked]:bg-${value} data-[state=checked]:border-${value}` : ''
        }), {});

    const createColorVariants = (): Partial<VariantStyles> =>
        [...GRAYSCALE_COLORS, ...COLORS].reduce((acc, color) => ({
            ...acc,
            [color]: `data-[state=checked]:bg-${color}-500 data-[state=checked]:border-${color}-500`
        }), {});

    const styles = {
        base: "w-4 h-4 transition-colors",
        state: {
            disabled: "opacity-50 cursor-not-allowed",
            hover: "hover:border-opacity-80",
            checked: "text-white"
        },
        variants: {
            ...createSemanticVariants(),
            ...createColorVariants()
        }
    } as const;
    
    $: classes = cn(
        styles.base,
        styles.variants[variant],
        disabled && styles.state.disabled,
        !disabled && styles.state.hover,
        checked && styles.state.checked
    );
</script>

<Checkbox
    {id}
    {checked}
    {disabled}
    {onCheckedChange}
    class={classes}
/>