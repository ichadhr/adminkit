<script lang="ts">
	import * as Checkbox from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	type CheckboxItem = {
		id: string;
		label: string;
	};

	const stacked: CheckboxItem[] = [
		{ id: 'checked', label: 'Checked' },
		{ id: 'unchecked', label: 'Unchecked' },
		{ id: 'checked-disabled', label: 'Checked disabled' },
		{ id: 'unchecked-disabled', label: 'Unchecked disabled' }
	];

	const inline: CheckboxItem[] = [
		{ id: 'checked', label: 'Checked' },
		{ id: 'unchecked', label: 'Unchecked' }
	];

	// initialize with default checked items
	let selectedItems = ['checked', 'checked-disabled'];
	let selectedItemsRight = ['checked', 'checked-disabled'];
	let selectedItemsInline = ['checked'];
	let selectedItemsRightInline = ['checked'];

	const handleCheckedChange = (checked: boolean, id: string, items: string[]) => {
		if (checked) {
			return [...items, id];
		}
		return items.filter((itemId) => itemId !== id);
	};
</script>

<main class="flex flex-1 flex-col gap-4 p-4 pt-0">
	<!-- heading section -->
	<section class="space-y-6">
		<h3 class="text-lg font-medium">Checkboxes</h3>
		<p class="text-sm">
			The HTML input <code>&lt;input type="checkbox"&gt;</code> is an input element to enter an
			array of different values. The value attribute is used to define the <code>value</code>
			submitted by the checkbox. The <code>checked</code> attribute is used to indicate whether this
			item is selected. The
			<code>indeterminate</code> attribute is used to indicate that the checkbox is in an indeterminate
			state (on most platforms, this draws a horizontal line across the checkbox).
		</p>
	</section>

	<!-- stacked checkboxes -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- left stacked -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left Stacked</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<div class="flex w-full items-center py-2">
							<Label class="flex items-center gap-2 font-normal" for={`left-${item.id}`}>
								<Checkbox.Root
									id={`left-${item.id}`}
									checked={selectedItems.includes(item.id)}
									disabled={item.id.includes('disabled')}
									onCheckedChange={(checked) => {
										selectedItems = handleCheckedChange(checked, item.id, selectedItems);
									}}
								/>
								{item.label}
							</Label>
						</div>
					{/each}
				</div>
			</div>

			<!-- right stacked -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right stacked stretched</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<div class="flex w-full items-center justify-between py-2">
							<Label class="font-normal" for={`right-${item.id}`}>
								{item.label}
							</Label>
							<Checkbox.Root
								id={`right-${item.id}`}
								checked={selectedItemsRight.includes(item.id)}
								disabled={item.id.includes('disabled')}
								onCheckedChange={(checked) => {
									selectedItemsRight = handleCheckedChange(checked, item.id, selectedItemsRight);
								}}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- inline checkboxes -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- left inline -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left Inline</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<div class="flex flex-wrap gap-4">
						{#each inline as item}
							<Label class="inline-flex items-center gap-2" for={`left-inline-${item.id}`}>
								<Checkbox.Root
									id={`left-inline-${item.id}`}
									checked={selectedItemsInline.includes(item.id)}
									onCheckedChange={(checked) => {
										selectedItemsInline = handleCheckedChange(
											checked,
											item.id,
											selectedItemsInline
										);
									}}
								/>
								{item.label}
							</Label>
						{/each}
					</div>
				</div>
			</div>

			<!-- right inline -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right Inline</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<div class="flex flex-wrap gap-4">
						{#each inline as item}
							<Label
								class="inline-flex flex-row-reverse items-center gap-2"
								for={`right-inline-${item.id}`}
							>
								<Checkbox.Root
									id={`right-inline-${item.id}`}
									checked={selectedItemsRightInline.includes(item.id)}
									onCheckedChange={(checked) => {
										selectedItemsRightInline = handleCheckedChange(
											checked,
											item.id,
											selectedItemsRightInline
										);
									}}
								/>
								{item.label}
							</Label>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
