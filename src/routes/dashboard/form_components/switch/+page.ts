import type {PageLoad} from './$types';

type SemanticVariant = 'danger' | 'info' | 'success' | 'warning';
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

interface SwitchItem {
	readonly id: string;
	readonly label: string;
	readonly disabled?: boolean;
	readonly checked?: boolean;
	readonly variant?: SemanticVariant | TailwindVariant;
}

interface SwitchVariants {
	readonly semantic: readonly SwitchItem[];
	readonly tailwind: readonly SwitchItem[];
}

interface SwitchData {
	readonly stacked: readonly SwitchItem[];
	readonly inline: readonly SwitchItem[];
	readonly variants: SwitchVariants;
}

interface PageData {
	readonly switches: SwitchData;
}

const defaultSwitchData: SwitchData = {
	stacked: [],
	inline: [],
	variants: {
		semantic: [],
		tailwind: []
	}
};

export const load: PageLoad = async ({fetch}): Promise<PageData> => {
	try {
		const response = await fetch('/api/checkbox_radio.json');

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Failed to fetch switch data: ${response.status} - ${errorText}`);
		}

		const data = await response.json();

		return {
			switches: data
		};
	} catch (error) {
		console.error('Error loading switch data:', error);
		return {
			switches: defaultSwitchData
		};
	}
};
