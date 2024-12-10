<script lang="ts">
	import { CheckboxLayout, handleCheckedChange } from '$lib/components/custom/checkbox/index.js';
	import { RadioLayout } from '@/lib/components/custom/radio/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';

	export let data;
	const { stacked, inline, variants } = data.checkboxes;
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

	$: radioEnabledItems = stacked?.filter((item) => !item.disabled) ?? [];
	$: radioDisabledItems = stacked?.filter((item) => item.disabled) ?? [];
</script>

<main class="flex flex-1 flex-col gap-4 p-4 pt-0 mb-5">
	<!-- heading section Checkboxes -->
	<section class="space-y-6">
		<h3 class="text-2xl font-medium">Checkboxes</h3>
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
						<CheckboxLayout
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
						<CheckboxLayout
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

	<!-- stacked checkboxes -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Right stacked section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right Stacked</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<CheckboxLayout
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

			<!-- Left stacked stretched section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left stacked stretched</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each stacked as item}
						<CheckboxLayout
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

	<!-- inline checkboxes -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Left inline section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left Inline</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<div class="flex flex-wrap gap-4">
						{#each inline as item}
							<CheckboxLayout
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
			</div>

			<!-- Right inline section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right Inline</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<div class="flex flex-wrap gap-4">
						{#each inline as item}
							<CheckboxLayout
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
		</div>
	</section>

	<!-- heading section Checkboxes colors -->
	<section class="space-y-6 pt-5">
		<p class="text-sm">
			Checkboxes can have a custom color based on Tailwind's color palette, allowing you to match
			your application's design system and create visually consistent user interfaces. You can
			choose from a wide range of predefined colors or customize them to meet your specific needs.
		</p>
	</section>

	<!-- checkboxes colors -->
	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- semantic section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Semantic colors</p>
				<div class="rounded border border-b p-1 px-2 py-1 shadow-sm lg:px-4">
					{#each semantic as item}
						<CheckboxLayout
							id={item.id}
							label={item.label}
							disabled={item.disabled}
							checked={selectedSemanticItems.includes(item.id)}
							onCheckedChange={(checked: boolean) => {
								selectedSemanticItems = handleCheckedChange(
									checked,
									item.id,
									selectedSemanticItems
								);
							}}
							layout="left"
							color={item.variant}
						/>
					{/each}
				</div>
			</div>

			<!-- Tailwind colors section -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Tailwind colors</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<div class="flex flex-wrap gap-4">
						{#each tailwind as item}
							<CheckboxLayout
								id={item.id}
								label={item.label}
								disabled={item.disabled}
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
		</div>
	</section>

	<!-- heading section Radios -->
	<section class="space-y-6 pt-10">
		<h3 class="text-2xl font-medium">Radios</h3>
		<p class="text-sm">
			Radio button is an element that can be turned on and off. Radio buttons are almost always
			grouped together in groups. Only one radio button within the same <code>radiogroup</code> may
			be selected at a time. The user can switch which radio button is turned on by selecting it
			with the mouse or keyboard. Other radio buttons in the same group are turned off. A label,
			specified with the <code>label</code> attribute may be added beside the radio button.
		</p>
	</section>

	<section>
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Left stacked -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left stacked</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioEnabledItems.find((item) => item.checked)?.id || ''}
						name="left-enabled"
					>
						{#each radioEnabledItems as item (item.id)}
							<RadioLayout value={item.id} id={item.id} label={item.label} layout="left" />
						{/each}
					</RadioGroup.Root>
				</div>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioDisabledItems.find((item) => item.checked)?.id || ''}
						name="left-disabled"
					>
						{#each radioDisabledItems as item (item.id)}
							<RadioLayout
								value={item.id}
								id={item.id}
								label={item.label}
								layout="left"
								disabled={item.disabled}
							/>
						{/each}
					</RadioGroup.Root>
				</div>
			</div>

			<!-- Right stacked stretched -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right stacked stretched</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioEnabledItems.find((item) => item.checked)?.id || ''}
						name="right-stacked-enabled"
					>
						{#each radioEnabledItems as item (item.id)}
							<RadioLayout
								value={item.id}
								id={item.id}
								label={item.label}
								layout="right-stretched"
							/>
						{/each}
					</RadioGroup.Root>
				</div>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioDisabledItems.find((item) => item.checked)?.id || ''}
						name="right-stacked-disabled"
					>
						{#each radioDisabledItems as item (item.id)}
							<RadioLayout
								value={item.id}
								id={item.id}
								label={item.label}
								layout="right-stretched"
								disabled={item.disabled}
							/>
						{/each}
					</RadioGroup.Root>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Right stacked -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right stacked</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioEnabledItems.find((item) => item.checked)?.id || ''}
						name="right-enabled"
					>
						{#each radioEnabledItems as item (item.id)}
							<RadioLayout value={item.id} id={item.id} label={item.label} layout="right" />
						{/each}
					</RadioGroup.Root>
				</div>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioDisabledItems.find((item) => item.checked)?.id || ''}
						name="right-disabled"
					>
						{#each radioDisabledItems as item (item.id)}
							<RadioLayout
								value={item.id}
								id={item.id}
								label={item.label}
								layout="right"
								disabled={item.disabled}
							/>
						{/each}
					</RadioGroup.Root>
				</div>
			</div>

			<!-- Left stacked stretched -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left stacked stretched</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioEnabledItems.find((item) => item.checked)?.id || ''}
						name="left-stretched-enabled"
					>
						{#each radioEnabledItems as item (item.id)}
							<RadioLayout
								value={item.id}
								id={item.id}
								label={item.label}
								layout="left-stretched"
							/>
						{/each}
					</RadioGroup.Root>
				</div>

				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioDisabledItems.find((item) => item.checked)?.id || ''}
						name="left-stretched-disabled"
					>
						{#each radioDisabledItems as item (item.id)}
							<RadioLayout
								value={item.id}
								id={item.id}
								label={item.label}
								layout="left-stretched"
								disabled={item.disabled}
							/>
						{/each}
					</RadioGroup.Root>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Left inline -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left inline</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioEnabledItems.find((item) => item.checked)?.id || ''}
						name="inline-disabled"
					>
						<div class="flex flex-wrap gap-4">
							{#each radioEnabledItems as item (item.id)}
								<RadioLayout value={item.id} id={item.id} label={item.label} color={item.variant} />
							{/each}
						</div>
					</RadioGroup.Root>
				</div>
			</div>

			<!-- Right inline -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right inline</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={radioDisabledItems.find((item) => item.checked)?.id || ''}
						name="inline-enabled"
					>
						<div class="flex flex-wrap gap-4">
							{#each radioDisabledItems as item (item.id)}
								<RadioLayout
									value={item.id}
									id={item.id}
									label={item.label}
									color={item.variant}
									disabled={item.disabled}
									layout={'right'}
								/>
							{/each}
						</div>
					</RadioGroup.Root>
				</div>
			</div>
		</div>
	</section>

	<!-- heading section Radios colors -->
	<section class="space-y-6 pt-5">
		<p class="text-sm">
			Radios can have a custom color based on Tailwind's color palette, allowing you to match
			your application's design system and create visually consistent user interfaces. You can
			choose from a wide range of predefined colors or customize them to meet your specific needs.
		</p>
	</section>

	<section>
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Semantic Colors -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Semantic Colors</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={semantic.find((item) => item.checked)?.id || ''}
						name="semantic-colors"
					>
						{#each semantic as item}
							<RadioLayout
								value={item.id}
								id={item.id}
								label={item.label}
								disabled={item.disabled}
								color={item.variant}
							/>
						{/each}
					</RadioGroup.Root>
				</div>
			</div>

			<!-- Tailwind Colors -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Tailwind Colors</p>
				<div class="rounded border border-b p-1 px-2 py-2 shadow-sm lg:px-4">
					<RadioGroup.Root
						value={tailwind.find((item) => item.checked)?.id || ''}
						name="inline-tailwind-colors"
					>
						<div class="flex flex-wrap gap-4">
							{#each tailwind as item (item.id)}
								<RadioLayout value={item.id} id={item.id} label={item.label} color={item.variant} />
							{/each}
						</div>
					</RadioGroup.Root>
				</div>
			</div>
		</div>
	</section>
</main>
