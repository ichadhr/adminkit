// src\lib\components\custom\checkbox\index.ts

import type {ColorVariant} from '../variants';
import {handleCheckedChange} from './helper';

/**
 * Available layout options for checkbox positioning
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
 * Layout type derived from LAYOUTS constant
 */
export type Layout = (typeof LAYOUTS)[number];

/**
 * Checkbox variant type inherited from ColorVariant
 */
export type CheckboxVariant = ColorVariant;

/**
 * Props interface for checkbox layout component
 */
export interface CheckboxLayoutProps {
	/** Unique identifier for the checkbox */
	id: string;
	/** Label text to display */
	label: string;
	/** Whether the checkbox is disabled */
	disabled?: boolean;
	/** Current checked state */
	checked: boolean;
	/** Callback function when checkbox state changes */
	onCheckedChange: (checked: boolean) => void;
	/** Layout positioning of the checkbox */
	layout?: Layout;
	/** Color variant of the checkbox */
	color?: CheckboxVariant;
}

export {default as ColorCheckbox} from './color.svelte';
export {default as CheckboxLayout} from './layout.svelte';
export {handleCheckedChange};
