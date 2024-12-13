// src\lib\components\custom\radio\index.ts

import type {ColorVariant} from '../variants';
import {SEMANTIC_VARIANTS, GRAYSCALE_COLORS, COLORS} from '../variants';

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

// Props Interface
export interface RadioLayoutProps {
	value: string;
	id: string;
	label: string;
	disabled?: boolean;
	layout?: Layout;
	color?: ColorVariant;
}

// Exports
export {default as RadioColor} from './color.svelte';
export {default as RadioLayout} from './layout.svelte';
export {SEMANTIC_VARIANTS, GRAYSCALE_COLORS, COLORS};
export type {ColorVariant};
