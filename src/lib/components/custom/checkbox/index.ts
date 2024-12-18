// src\lib\components\custom\checkbox\index.ts

import type { ColorVariant } from '../variants';

/**
 * Available layout options for checkbox positioning.
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
 * Type representing the layout positions for the checkbox.
 */
export type Layout = (typeof LAYOUTS)[number];

/**
 * Type representing the color variants available for the checkbox.
 */
export type CheckboxVariant = ColorVariant;

/**
 * Interface defining the props for the `CheckboxLayout` component.
 */
export interface CheckboxLayoutProps {
	/** Unique identifier for the checkbox. */
	id: string;
	/** Label text to display alongside the checkbox. */
	label: string;
	/** Determines if the checkbox is disabled. */
	disabled?: boolean;
	/** Current checked state of the checkbox. */
	checked: boolean;
	/** Callback function triggered when checkbox state changes. */
	onCheckedChange?: (checked: boolean) => void;
	/** Layout positioning of the checkbox. */
	layout?: Layout;
	/** Color variant of the checkbox. */
	color?: CheckboxVariant;
}

/**
 * Configuration interface for checkbox layout styles and behavior.
 */
export interface LayoutConfig {
	wrapperClass?: string;
	containerClass: string;
	labelClass: string;
	isInline: boolean;
	isStretched?: boolean;
	labelFirst: boolean;
}

/**
 * Type for the mapping of layout configurations.
 */
export type LayoutConfigs = Record<Layout, LayoutConfig>;

export { default as ColorCheckbox } from './color.svelte';
export { default as CheckboxLayout } from './layout.svelte';
