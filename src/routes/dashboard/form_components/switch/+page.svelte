<script lang="ts">
	import { SwitchLayout, handleCheckedChange } from '$lib/components/custom/switch/index.js';

	export let data;
	const { stacked, inline, variants } = data.switches;
	const { semantic, tailwind } = variants;

	// Initialize with checked items from the data
	let selectedItemsLeft = stacked?.filter((item) => item.checked)?.map((item) => item.id) ?? [];
	let selectedItemsLeftStretched =
		stacked?.filter((item) => item.checked)?.map((item) => item.id) ?? [];
	let selectedItemsRight = stacked?.filter((item) => item.checked)?.map((item) => item.id) ?? [];
	let selectedItemsRightStretched =
		stacked?.filter((item) => item.checked)?.map((item) => item.id) ?? [];
	let selectedItemsLeftInline =
		inline?.filter((item) => item.checked)?.map((item) => item.id) ?? [];
	let selectedItemsRightInline =
		inline?.filter((item) => item.checked)?.map((item) => item.id) ?? [];
	let selectedSemanticItems =
		semantic?.filter((item) => item.checked)?.map((item) => item.id) ?? [];
	let selectedTailwindItems =
		tailwind?.filter((item) => item.checked)?.map((item) => item.id) ?? [];
</script>

<main class="flex flex-1 flex-col gap-4 p-4 pt-0">
	<!-- heading section Switches -->
	<section class="space-y-6">
		<h3 class="text-lg font-medium">Switches</h3>
		<p class="text-sm">
			The HTML input <code>&lt;input type="checkbox"&gt;</code> is an input element to enter an
			array of different values. The value attribute is used to define the <code>value</code>
			submitted by the checkbox. The <code>checked</code> attribute is used to indicate whether this
			item is selected. The
			<code>indeterminate</code> attribute is used to indicate that the checkbox is in an indeterminate
			state (on most platforms, this draws a horizontal line across the checkbox).
		</p>
	</section>

	<!-- stacked switches -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Left stacked section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left Stacked</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<SwitchLayout
							id={item.id}
							label={item.label}
							disabled={item.disabled}
							checked={selectedItemsLeft.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedItemsLeft = handleCheckedChange(checked, item.id, selectedItemsLeft);
							}}
							layout="left"
						/>
					{/each}
				</div>
			</div>

			<!-- Right stacked stretched section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right stacked stretched</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<SwitchLayout
							id={item.id}
							label={item.label}
							disabled={item.disabled}
							checked={selectedItemsRightStretched.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedItemsRightStretched = handleCheckedChange(
									checked,
									item.id,
									selectedItemsRightStretched
								);
							}}
							layout="right-stretched"
						/>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Right stacked and Left stacked stretched section -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right Stacked</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<SwitchLayout
							id={item.id}
							label={item.label}
							disabled={item.disabled}
							checked={selectedItemsRight.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedItemsRight = handleCheckedChange(checked, item.id, selectedItemsRight);
							}}
							layout="right"
						/>
					{/each}
				</div>
			</div>

			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left stacked stretched</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<SwitchLayout
							id={item.id}
							label={item.label}
							disabled={item.disabled}
							checked={selectedItemsLeftStretched.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedItemsLeftStretched = handleCheckedChange(
									checked,
									item.id,
									selectedItemsLeftStretched
								);
							}}
							layout="left-stretched"
						/>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- inline switches -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left Inline</p>
				<div class="flex flex-wrap gap-4 rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<!-- Added flex flex-wrap gap-4 -->
					{#each inline as item}
						<SwitchLayout
							id={item.id}
							label={item.label}
							disabled={item.disabled}
							checked={selectedItemsLeftInline.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedItemsLeftInline = handleCheckedChange(
									checked,
									item.id,
									selectedItemsLeftInline
								);
							}}
							layout="left-inline"
						/>
					{/each}
				</div>
			</div>

			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right Inline</p>
				<div class="flex flex-wrap gap-4 rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<!-- Added flex flex-wrap gap-4 -->
					{#each inline as item}
						<SwitchLayout
							id={item.id}
							label={item.label}
							disabled={item.disabled}
							checked={selectedItemsRightInline.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedItemsRightInline = handleCheckedChange(
									checked,
									item.id,
									selectedItemsRightInline
								);
							}}
							layout="right-inline"
						/>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Colors sections -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Semantic colors</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each semantic as item}
						<SwitchLayout
							id={item.id}
							label={item.label}
							checked={selectedSemanticItems.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedSemanticItems = handleCheckedChange(
									checked,
									item.id,
									selectedSemanticItems
								);
							}}
							color={item.variant}
						/>
					{/each}
				</div>
			</div>

			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Tailwind colors</p>
				<div class="flex flex-wrap gap-4 rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<!-- Added flex flex-wrap gap-4 -->
					{#each tailwind as item}
						<SwitchLayout
							id={item.id}
							label={item.label}
							checked={selectedTailwindItems.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedTailwindItems = handleCheckedChange(
									checked,
									item.id,
									selectedTailwindItems
								);
							}}
							layout="left-inline"
							color={item.variant}
						/>
					{/each}
				</div>
			</div>
		</div>
	</section>
</main>
