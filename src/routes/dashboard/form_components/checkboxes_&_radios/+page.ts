// src/routes/+page.ts
import type { PageLoad } from './$types';

interface CheckboxItem {
	id: string;
	label: string;
}

interface CheckboxData {
	stacked: CheckboxItem[];
	inline: CheckboxItem[];
}

interface PageData {
	checkboxes: CheckboxData;
}

export const load: PageLoad = async ({ fetch }): Promise<PageData> => {
	const response = await fetch('/api/checkbox_radio.json');
	const data: CheckboxData = await response.json();

	return {
		checkboxes: data
	};
};
