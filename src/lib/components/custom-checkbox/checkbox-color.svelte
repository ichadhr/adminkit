<script lang="ts">
    import { Checkbox } from '$lib/components/ui/checkbox';
    import { cn } from '$lib/utils';
    import type { CheckboxVariant } from '.';
    
    export let checked = false;
    export let disabled = false;
    export let id: string | undefined = undefined;
    export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;
    export let variant: CheckboxVariant = 'default';

    const baseClasses = {
        root: "w-4 h-4 transition-colors",
        disabled: "opacity-50 cursor-not-allowed",
        hover: "hover:border-opacity-80",
        checked: "text-white"
    } as const;
    
    const variantClasses = {
        // Semantic variants
        default: "",
        danger: "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive",
        success: "data-[state=checked]:bg-success data-[state=checked]:border-success",
        info: "data-[state=checked]:bg-info data-[state=checked]:border-info",
        warning: "data-[state=checked]:bg-warning data-[state=checked]:border-warning",
        
        // Gray scale variants
        slate: "data-[state=checked]:bg-slate-500 data-[state=checked]:border-slate-500",
        gray: "data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500",
        zinc: "data-[state=checked]:bg-zinc-500 data-[state=checked]:border-zinc-500",
        neutral: "data-[state=checked]:bg-neutral-500 data-[state=checked]:border-neutral-500",
        stone: "data-[state=checked]:bg-stone-500 data-[state=checked]:border-stone-500",
        
        // Color variants
        red: "data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500",
        orange: "data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500",
        amber: "data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500",
        yellow: "data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500",
        lime: "data-[state=checked]:bg-lime-500 data-[state=checked]:border-lime-500",
        green: "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
        emerald: "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500",
        teal: "data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500",
        cyan: "data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500",
        sky: "data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500",
        blue: "data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500",
        indigo: "data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500",
        violet: "data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500",
        purple: "data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500",
        fuchsia: "data-[state=checked]:bg-fuchsia-500 data-[state=checked]:border-fuchsia-500",
        pink: "data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500",
        rose: "data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
    } as const;
    
    $: classes = cn(
        baseClasses.root,
        disabled && baseClasses.disabled,
        variantClasses[variant],
        !disabled && baseClasses.hover,
        checked && baseClasses.checked
    );
</script>

<Checkbox
    {id}
    {checked}
    {disabled}
    {onCheckedChange}
    class={classes}
/>