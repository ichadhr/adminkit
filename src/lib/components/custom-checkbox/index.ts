export { default as InlineCheckbox } from './checkbox-inline.svelte';
export { default as StackedCheckbox } from './checkbox-stacked.svelte';
export { default as ColorCheckbox } from './checkbox-color.svelte';

export type CheckboxVariant = 
    | 'default'
    // Semantic variants
    | 'danger'
    | 'success'
    | 'info'
    | 'warning'
    // Gray scale variants
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    // Color variants
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';