// src/routes/dashboard/form_components/checkboxes_&_radios/+page.ts

import type { PageLoad } from './$types';

/**
 * Semantic color variants for form elements
 */
type SemanticVariant = 'danger' | 'info' | 'success' | 'warning';

/**
 * Tailwind color variants for form elements
 */
type TailwindVariant =
	| 'slate'
	| 'gray'
	| 'zinc'
	| 'neutral'
	| 'stone'
	| 'red'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'emerald'
	| 'teal'
	| 'cyan'
	| 'sky'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'purple'
	| 'fuchsia'
	| 'pink'
	| 'rose';

/**
 * Single checkbox item configuration
 */
interface CheckboxItem {
	readonly id: string;
	readonly label: string;
	readonly disabled?: boolean;
	readonly checked?: boolean;
	readonly variant?: SemanticVariant | TailwindVariant;
}

/**
 * Checkbox variants grouping
 */
interface CheckboxVariants {
	readonly semantic: readonly CheckboxItem[];
	readonly tailwind: readonly CheckboxItem[];
}

/**
 * Complete checkbox data structure
 */
interface CheckboxData {
	readonly stacked: readonly CheckboxItem[];
	readonly inline: readonly CheckboxItem[];
	readonly variants: CheckboxVariants;
}

/**
 * Page data structure
 */
interface PageData {
	readonly checkboxes: CheckboxData;
}

/**
 * Default checkbox data
 */
const defaultCheckboxData: CheckboxData = {
	stacked: [],
	inline: [],
	variants: {
		semantic: [],
		tailwind: []
	}
};

/**
 * SvelteKit load function for checkbox data
 */
export const load: PageLoad = async ({ fetch }): Promise<PageData> => {
	try {
		const response = await fetch('/api/checkbox_radio.json');

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Failed to fetch checkbox data: ${response.status} - ${errorText}`);
		}

		const data = await response.json();
		return { checkboxes: data };
	} catch (error) {
		console.error(
			'Error loading checkbox data:',
			error instanceof Error ? error.message : String(error)
		);
		return { checkboxes: defaultCheckboxData };
	}
};
