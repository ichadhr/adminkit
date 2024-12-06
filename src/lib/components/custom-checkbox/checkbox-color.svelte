<script lang="ts">
    import { Checkbox } from '$lib/components/ui/checkbox';
    import { cn } from '$lib/utils';
    import type { CheckboxVariant } from '.';
    
    // Props with TypeScript types
    interface CheckboxProps {
        checked?: boolean;
        disabled?: boolean;
        id?: string;
        onCheckedChange?: (checked: boolean) => void;
        variant?: CheckboxVariant;
    }

    export let checked = false;
    export let disabled = false;
    export let id: string | undefined = undefined;
    export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;
    export let variant: CheckboxVariant = 'default';

    // Separate styling configurations
    const styles = {
        base: {
            root: "w-4 h-4 transition-colors",
            disabled: "opacity-50 cursor-not-allowed",
            hover: "hover:border-opacity-80",
            checked: "text-white"
        },
        
        variants: {
            semantic: {
                default: "",
                danger: "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive",
                success: "data-[state=checked]:bg-success data-[state=checked]:border-success",
                info: "data-[state=checked]:bg-info data-[state=checked]:border-info",
                warning: "data-[state=checked]:bg-warning data-[state=checked]:border-warning",
            },
            
            grayscale: {
                slate: createColorVariant('slate'),
                gray: createColorVariant('gray'),
                zinc: createColorVariant('zinc'),
                neutral: createColorVariant('neutral'),
                stone: createColorVariant('stone'),
            },
            
            colors: {
                red: createColorVariant('red'),
                orange: createColorVariant('orange'),
                amber: createColorVariant('amber'),
                yellow: createColorVariant('yellow'),
                lime: createColorVariant('lime'),
                green: createColorVariant('green'),
                emerald: createColorVariant('emerald'),
                teal: createColorVariant('teal'),
                cyan: createColorVariant('cyan'),
                sky: createColorVariant('sky'),
                blue: createColorVariant('blue'),
                indigo: createColorVariant('indigo'),
                violet: createColorVariant('violet'),
                purple: createColorVariant('purple'),
                fuchsia: createColorVariant('fuchsia'),
                pink: createColorVariant('pink'),
                rose: createColorVariant('rose'),
            }
        }
    } as const;

    // Helper function to create color variant classes
    function createColorVariant(color: string): string {
        return `data-[state=checked]:bg-${color}-500 data-[state=checked]:border-${color}-500`;
    }

    // Get variant class from the nested structure
    function getVariantClass(variant: CheckboxVariant): string {
        // Search in all variant categories
        for (const category of Object.values(styles.variants)) {
            if (variant in category) {
                return category[variant as keyof typeof category];
            }
        }
        return styles.variants.semantic.default;
    }

    // Reactive class computation
    $: classes = cn(
        styles.base.root,
        disabled && styles.base.disabled,
        getVariantClass(variant),
        !disabled && styles.base.hover,
        checked && styles.base.checked
    );
</script>

<Checkbox
    {id}
    {checked}
    {disabled}
    {onCheckedChange}
    class={classes}
/>