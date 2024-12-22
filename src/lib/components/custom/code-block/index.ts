// src\lib\components\custom\code-block\index.ts

export { default as CodeBlock } from './layout.svelte';

export interface ThemeBackgrounds {
	readonly dark: string;
	readonly light: string;
}

export interface CodeBlockProps {
	code: string;
	language: any;
	showLanguageTag?: boolean;
	showLineNumbers?: boolean;
	wrapLines?: boolean;
	hideBorder?: boolean;
	theme?: string;
	startingLineNumber?: number;
	highlightedLines?: number[];
	highlightedBackground?: string;
	copyTimeout?: number;
	forceLoading?: boolean;
}

export type ThemePattern = RegExp;
