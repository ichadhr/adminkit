<script lang="ts">
    import { Checkbox } from '$lib/components/ui/checkbox';
    import type { CheckboxVariant } from '$lib/components/custom-checkbox';
    import { cn } from '$lib/utils';
    
    export let checked = false;
    export let disabled = false;
    export let id: string | undefined = undefined;
    export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;
    export let variant: CheckboxVariant = 'default';

    // Separate semantic and color variants for better organization
    const VARIANTS = {
        semantic: {
            default: "",
            danger: "destructive",
            success: "success",
            info: "info",
            warning: "warning"
        },
        colors: [
            'slate', 'gray', 'zinc', 'neutral', 'stone',
            'red', 'orange', 'amber', 'yellow', 'lime',
            'green', 'emerald', 'teal', 'cyan', 'sky',
            'blue', 'indigo', 'violet', 'purple',
            'fuchsia', 'pink', 'rose'
        ]
    } as const;

    const styles = {
        base: "w-4 h-4 transition-colors",
        state: {
            disabled: "opacity-50 cursor-not-allowed",
            hover: "hover:border-opacity-80",
            checked: "text-white"
        },
        getVariantClass: (variant: CheckboxVariant) => {
            // Handle semantic variants
            if (variant in VARIANTS.semantic) {
                const semanticColor = VARIANTS.semantic[variant as keyof typeof VARIANTS.semantic];
                return semanticColor ? `data-[state=checked]:bg-${semanticColor} data-[state=checked]:border-${semanticColor}` : "";
            }
            
            // Handle color variants
            if (VARIANTS.colors.includes(variant as any)) {
                return `data-[state=checked]:bg-${variant}-500 data-[state=checked]:border-${variant}-500`;
            }
            
            return "";
        }
    } as const;
    
    $: classes = cn(
        styles.base,
        styles.getVariantClass(variant),
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