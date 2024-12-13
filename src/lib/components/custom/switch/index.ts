// src\lib\components\custom\switch\index.ts

import type {ColorVariant} from '../variants';

/**
 * Valid layout positions for the switch component
 * @constant {readonly string[]}
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
 * Layout positions type derived from LAYOUTS constant
 */
export type Layout = (typeof LAYOUTS)[number];

/**
 * Color variant type for the switch component
 */
export type SwitchVariant = ColorVariant;

/**
 * Interface for switch component props
 * @interface SwitchLayoutProps
 * @property {string} id - Unique identifier for the switch
 * @property {string} label - Display label for the switch
 * @property {boolean} [disabled] - Whether the switch is disabled
 * @property {boolean} checked - Current state of the switch
 * @property {(checked: boolean) => void} onCheckedChange - Callback when switch state changes
 * @property {Layout} [layout] - Layout position of the switch
 * @property {SwitchVariant} [color] - Color variant of the switch
 */
export interface SwitchLayoutProps {
	id: string;
	label: string;
	disabled?: boolean;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	layout?: Layout;
	color?: SwitchVariant;
}

/**
 * Handles the change in checked state for multiple switches
 * @param {boolean} checked - New checked state
 * @param {string} id - Switch identifier
 * @param {string[]} items - Current array of checked switch IDs
 * @returns {string[]} Updated array of checked switch IDs
 */
export const handleCheckedChange = (
	checked: boolean,
	id: string,
	items: string[] = []
): string[] => {
	if (!Array.isArray(items)) {
		return checked ? [id] : [];
	}

	return checked ? [...items, id] : items.filter((itemId) => itemId !== id);
};

export {default as ColorSwitch} from './color.svelte';
export {default as SwitchLayout} from './layout.svelte';
