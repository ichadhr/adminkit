// src\lib\components\custom\checkbox\helper.ts

/**
 * Updates an array of selected item IDs based on the state of a checkbox.
 *
 * If the checkbox is checked, the ID is added to the array (if not already present).
 * If the checkbox is unchecked, the ID is removed from the array (if present).
 *
 * @param checked - The state of the checkbox; `true` if checked, `false` if unchecked.
 * @param id - The unique identifier of the item to add or remove.
 * @param items - The array of currently selected item IDs.
 * @returns A new array with the updated list of selected item IDs.
 */
export function handleCheckedChange(
	checked: boolean,
	id: string,
	items: readonly string[] = []
): string[] {
	if (!id) {
		// If the ID is falsy, return a shallow copy of the items array
		return [...items];
	}

	if (checked) {
		// If the ID is not already in the array, add it
		return items.includes(id) ? [...items] : [...items, id];
	} else {
		// If the ID is in the array, remove it
		return items.filter((item) => item !== id);
	}
}
