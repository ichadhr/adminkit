// $lib/components/custom/variants.ts
export const SEMANTIC_VARIANTS = {
    default: '',
    danger: 'destructive',
    success: 'success',
    info: 'info',
    warning: 'warning'
} as const;

export const GRAYSCALE_COLORS = [
    'slate', 'gray', 'zinc', 'neutral', 'stone'
] as const;

export const COLORS = [
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
    'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
    'fuchsia', 'pink', 'rose'
] as const;

export type ColorVariant =
    | keyof typeof SEMANTIC_VARIANTS
    | (typeof GRAYSCALE_COLORS)[number]
    | (typeof COLORS)[number];