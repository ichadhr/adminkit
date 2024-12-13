// src\lib\components\custom\switch\helper.ts

export const handleCheckedChange = (
	checked: boolean,
	id: string,
	items: string[] = []
): string[] => {
	if (!Array.isArray(items)) {
		items = [];
	}

	if (checked) {
		return [...items, id];
	}
	return items.filter((itemId) => itemId !== id);
};
