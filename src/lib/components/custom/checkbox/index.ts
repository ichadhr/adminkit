// src\lib\components\custom\checkbox\index.ts

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
export type CheckboxVariant = ColorVariant;

// Props Interface
export interface CheckboxLayoutProps {
	id: string;
	label: string;
	disabled?: boolean;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	layout?: Layout;
	color?: CheckboxVariant;
}

// Component and helper exports
export {default as ColorCheckbox} from './color.svelte';
export {default as CheckboxLayout} from './layout.svelte';
export {handleCheckedChange};
