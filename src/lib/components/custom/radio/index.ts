// src\lib\components\custom\radio\index.ts

import type { ColorVariant } from '../variants';
import { SEMANTIC_VARIANTS, GRAYSCALE_COLORS, COLORS } from '../variants';
import { isColorVariant } from '../variants';

/**
 * Available layout options for radio components
 * @readonly
 */
export const LAYOUTS = [
	'left',
	'right',
	'left-inline',
	'right-inline',
	'left-stretched',
	'right-stretched'
] as const;

/**
 * Layout options type derived from LAYOUTS constant
 */
export type Layout = typeof LAYOUTS[number];

/**
 * Type guard to check if a value is a valid Layout
 * @param value - The value to check
 */
export function isLayout(value: unknown): value is Layout {
	return typeof value === 'string' && LAYOUTS.includes(value as Layout);
}

/**
 * Props interface for radio layout components
 */
export interface RadioLayoutProps {
	/** Unique value for the radio input */
	value: string;
	/** Unique identifier for the radio input */
	id: string;
	/** Label text to display */
	label: string;
	/** Whether the radio input is disabled */
	disabled?: boolean;
	/** Layout style for the radio component */
	layout?: Layout;
	/** Color variant for the radio component */
	color?: ColorVariant;
}

/**
 * Interface for RadioColor component props
 */
export interface RadioColorProps {
	/** Unique value for the radio input */
	value: string;
	/** Unique identifier for the radio input */
	id: string;
	/** Whether the radio input is disabled */
	disabled?: boolean;
	/** Color variant for the radio component */
	variant?: ColorVariant;
}

/**
 * Interface for radio layout styles and behavior
 */
export interface LayoutConfig {
	containerClass: string;
	labelClass: string;
	isInline: boolean;
	isStretched?: boolean;
	labelFirst: boolean;
}

/**
 * Validates RadioLayoutProps
 * @param props - The props to validate
 * @throws Error if validation fails
 */
export function validateRadioProps(props: RadioLayoutProps): void {
	if (!props.value) {
		throw new Error('Radio value is required');
	}
	if (!props.id) {
		throw new Error('Radio id is required');
	}
	if (!props.label) {
		throw new Error('Radio label is required');
	}
	if (props.layout && !isLayout(props.layout)) {
		throw new Error('Invalid layout value');
	}
	if (props.color && !isColorVariant(props.color)) {
		throw new Error('Invalid color variant');
	}
}

export { default as RadioColor } from './color.svelte';
export { default as RadioLayout } from './layout.svelte';
export { SEMANTIC_VARIANTS, GRAYSCALE_COLORS, COLORS };
export type { ColorVariant };