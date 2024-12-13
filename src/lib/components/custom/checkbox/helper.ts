// src\lib\components\custom\checkbox\helper.ts

/**
 * Updates an array of selected items based on checkbox state
 * @param checked - The checkbox state
 * @param id - The item identifier to add or remove
 * @param items - Array of currently selected items
 * @returns A new array with updated selected items
 * @throws Will not throw, returns safe array copy for invalid inputs
 */
export const handleCheckedChange = (
	checked: boolean,
	id: string,
	items: readonly string[] = []
): string[] => {
	if (!id) return Array.from(items);

	const safeItems = Array.from(items);

	if (checked) {
		const itemExists = safeItems.find((item) => item === id);
		return itemExists ? safeItems : [...safeItems, id];
	}

	return safeItems.filter((item) => item !== id);
};
