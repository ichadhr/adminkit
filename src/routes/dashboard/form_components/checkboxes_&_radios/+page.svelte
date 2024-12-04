<script lang="ts">
	import InlineCheckbox from '$lib/components/custom-checkbox/checkbox-inline.svelte';
	import StackedCheckbox from '$lib/components/custom-checkbox/checkbox-stacked.svelte';

	export let data;
	const { stacked, inline, variants } = data.checkboxes;
	const { semantic, tailwind } = variants;

	// Initialize with checked items from the data
	let selectedItemsLeft = stacked.filter((item) => item.checked).map((item) => item.id);
	let selectedItemsLeftStretched = stacked.filter((item) => item.checked).map((item) => item.id);
	let selectedItemsRight = stacked.filter((item) => item.checked).map((item) => item.id);
	let selectedItemsRightStretched = stacked.filter((item) => item.checked).map((item) => item.id);
	let selectedItemsLeftInline = inline.filter((item) => item.checked).map((item) => item.id);
	let selectedItemsRightInline = inline.filter((item) => item.checked).map((item) => item.id);

	let selectedSemanticItems = semantic.filter((item) => item.checked).map((item) => item.id);
	let selectedTailwindItems = tailwind.filter((item) => item.checked).map((item) => item.id);

	const handleCheckedChange = (checked: boolean, id: string, items: string[]) => {
		if (checked) {
			return [...items, id];
		}
		return items.filter((itemId) => itemId !== id);
	};
</script>

<main class="flex flex-1 flex-col gap-4 p-4 pt-0">
	<!-- heading section Checkboxes -->
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
			<!-- Left stacked section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left Stacked</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<StackedCheckbox
							{item}
							checked={selectedItemsLeft.includes(item.id)}
							onCheckedChange={(checked) => {
								selectedItemsLeft = handleCheckedChange(checked, item.id, selectedItemsLeft);
							}}
							position={'left'}
						/>
					{/each}
				</div>
			</div>

			<!-- Right stacked stretched section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right stacked stretched</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<StackedCheckbox
							{item}
							checked={selectedItemsRightStretched.includes(item.id)}
							onCheckedChange={(checked) => {
								selectedItemsRightStretched = handleCheckedChange(checked, item.id, selectedItemsRightStretched);
							}}
							position={'right-stretched'}
						/>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- stacked checkboxes -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Right stacked section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right Stacked</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<StackedCheckbox
							{item}
							checked={selectedItemsRight.includes(item.id)}
							onCheckedChange={(checked) => {
								selectedItemsRight = handleCheckedChange(checked, item.id, selectedItemsRight);
							}}
							position={'right'}
						/>
					{/each}
				</div>
			</div>

			<!-- Left stacked stretched section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left stacked stretched</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<StackedCheckbox
							{item}
							checked={selectedItemsLeftStretched.includes(item.id)}
							onCheckedChange={(checked) => {
								selectedItemsLeftStretched = handleCheckedChange(checked, item.id, selectedItemsLeftStretched);
							}}
							position={'left-stretched'}
						/>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- inline checkboxes -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Left inline section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left Inline</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<div class="flex flex-wrap gap-4">
						{#each inline as item}
							<InlineCheckbox
								{item}
								checked={selectedItemsLeftInline.includes(item.id)}
								onCheckedChange={(checked) => {
									selectedItemsLeftInline = handleCheckedChange(
										checked,
										item.id,
										selectedItemsLeftInline
									);
								}}
								position="left"
							/>
						{/each}
					</div>
				</div>
			</div>

			<!-- Right inline section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right Inline</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<div class="flex flex-wrap gap-4">
						{#each inline as item}
							<InlineCheckbox
								{item}
								checked={selectedItemsRightInline.includes(item.id)}
								onCheckedChange={(checked) => {
									selectedItemsRightInline = handleCheckedChange(
										checked,
										item.id,
										selectedItemsRightInline
									);
								}}
								position="right"
							/>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- heading section Checkboxes -->
	<section class="space-y-6 pt-5">
		<h3 class="text-lg font-medium">Checkboxes colors</h3>
		<p class="text-sm">
			Checkboxes can have a custom color based on Tailwind's color palette, allowing you to match
			your application's design system and create visually consistent user interfaces. You can
			choose from a wide range of predefined colors or customize them to meet your specific needs.
		</p>
	</section>

	<!-- semantic checkboxes colors -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- semantic section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Semantic colors</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each semantic as item}
						<StackedCheckbox
							{item}
							checked={selectedSemanticItems.includes(item.id)}
							onCheckedChange={(checked) => {
								selectedSemanticItems = handleCheckedChange(
									checked,
									item.id,
									selectedSemanticItems
								);
							}}
							position={'left'}
							variant={item.variant}
						/>
					{/each}
				</div>
			</div>

			<!-- Tailwind colors section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Tailwind colors</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					<div class="flex flex-wrap gap-4">
						{#each tailwind as item}
							<InlineCheckbox
								{item}
								checked={selectedTailwindItems.includes(item.id)}
								onCheckedChange={(checked) => {
									selectedTailwindItems = handleCheckedChange(
										checked,
										item.id,
										selectedTailwindItems
									);
								}}
								position={'left'}
								variant={item.variant}
							/>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
