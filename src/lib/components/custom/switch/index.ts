import type {ColorVariant} from '../variants';
import {handleCheckedChange} from './helper';

// Constants
export const LAYOUTS = [
	'left',
	'right',
	'left-inline',
	'right-inline',
	'left-stretched',
	'right-stretched'
] as const;

// Types
export type Layout = (typeof LAYOUTS)[number];
export type SwitchVariant = ColorVariant;

// Props Interface
export interface SwitchLayoutProps {
	id: string;
	label: string;
	disabled?: boolean;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	layout?: Layout;
	color?: SwitchVariant;
}

// Component and helper exports
export {default as ColorSwitch} from './color.svelte';
export {default as SwitchLayout} from './layout.svelte';
export {handleCheckedChange};
