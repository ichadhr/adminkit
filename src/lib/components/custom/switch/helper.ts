// src\lib\components\custom\switch\helper.ts

/**
 * Interface for managing checked items in a switch group
 * @interface CheckedChangeParams
 */
interface CheckedChangeParams {
	checked: boolean;
	id: string;
	items?: string[];
}

/**
 * Updates an array of checked item IDs based on a switch state change
 * @param {CheckedChangeParams} params - The parameters for handling checked state
 * @returns {string[]} Updated array of checked item IDs
 */
export const handleCheckedChange = ({ checked, id, items = [] }: CheckedChangeParams): string[] => {
	// Ensure items is always an array
	const safeItems = Array.isArray(items) ? items : [];

	return checked ? [...safeItems, id] : safeItems.filter((itemId) => itemId !== id);
};
