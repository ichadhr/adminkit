// src/routes/+page.ts
import type { PageLoad } from './$types';

type SemanticVariant = 'danger' | 'info' | 'success' | 'warning';
type TailwindVariant = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 
    'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 
    'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

interface CheckboxItem {
    readonly id: string;
    readonly label: string;
    readonly disabled?: boolean;
    readonly checked?: boolean;
    readonly variant?: SemanticVariant | TailwindVariant;
}

interface CheckboxVariants {
    readonly semantic: readonly CheckboxItem[];
    readonly tailwind: readonly CheckboxItem[];
}

interface CheckboxData {
    readonly stacked: readonly CheckboxItem[];
    readonly inline: readonly CheckboxItem[];
    readonly variants: CheckboxVariants;
}

interface PageData {
    readonly checkboxes: CheckboxData;
}

const defaultCheckboxData: CheckboxData = {
    stacked: [],
    inline: [],
    variants: {
        semantic: [],
        tailwind: []
    }
};

export const load: PageLoad = async ({ fetch }): Promise<PageData> => {
    try {
        const response = await fetch('/api/checkbox_radio.json');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch checkbox data: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        return {
            checkboxes: data
        };

    } catch (error) {
        console.error('Error loading checkbox data:', error);
        return {
            checkboxes: defaultCheckboxData
        };
    }
};