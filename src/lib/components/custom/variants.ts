// src\lib\components\custom\variants.ts

/**
 * Semantic variants for UI components
 * @readonly
 */
export const SEMANTIC_VARIANTS = {
	default: '',
	danger: 'danger',
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
 * Union type representing all possible color variants
 * Combines semantic variants, grayscale colors, and main colors
 */
export type ColorVariant =
	| keyof typeof SEMANTIC_VARIANTS
	| (typeof GRAYSCALE_COLORS)[number]
	| (typeof COLORS)[number];

/**
 * Type guard to check if a value is a valid ColorVariant
 * @param value - The value to check
 * @returns True if the value is a valid ColorVariant
 */
export function isColorVariant(value: unknown): value is ColorVariant {
	if (typeof value !== 'string') return false;

	return (
		value in SEMANTIC_VARIANTS ||
		GRAYSCALE_COLORS.includes(value as (typeof GRAYSCALE_COLORS)[number]) ||
		COLORS.includes(value as (typeof COLORS)[number])
	);
}
