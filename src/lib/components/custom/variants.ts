// src\lib\components\custom\variants.ts

/**
 * Semantic variants for UI components
 * @readonly
 */
export const SEMANTIC_VARIANTS = {
	default: '',
	error: 'error',
	success: 'success',
	info: 'info',
	warning: 'warning'
} as const;

/**
 * Grayscale color palette options
 * @readonly
 */
export const GRAYSCALE_COLORS = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const;

/**
 * Main color palette options
 * @readonly
 */
export const COLORS = [
	'red',
	'orange',
	'amber',
	'yellow',
	'lime',
	'green',
	'emerald',
	'teal',
	'cyan',
	'sky',
	'blue',
	'indigo',
	'violet',
	'purple',
	'fuchsia',
	'pink',
	'rose'
] as const;

/**
 * All possible color variants combining semantic variants, grayscale colors, and main colors
 * @readonly
 */
const ALL_VARIANTS = [
	...Object.keys(SEMANTIC_VARIANTS),
	...GRAYSCALE_COLORS,
	...COLORS
] as const;

/**
 * Union type representing all possible color variants
 */
export type ColorVariant = (typeof ALL_VARIANTS)[number];

/**
 * Type guard to check if a value is a valid ColorVariant
 * @param value - The value to check
 * @returns True if the value is a valid ColorVariant
 */
export function isColorVariant(value: unknown): value is ColorVariant {
	return typeof value === 'string' && ALL_VARIANTS.includes(value);
}