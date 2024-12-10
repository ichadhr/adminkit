<script lang="ts">
	import * as Card from '@/lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Checkbox from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import CodeBlock from '$lib/components/code-block.svelte';
	import typescript from 'svelte-highlight/languages/typescript';
	import rust from 'svelte-highlight/languages/rust';

	const items = [
		{ content: 'Dashboard Item 1' },
		{ content: 'Dashboard Item 2' },
		{ content: 'Dashboard Item 3' }
	];

	const checker = [
		{
			id: 'recents',
			label: 'Recents'
		},
		{
			id: 'home',
			label: 'Home'
		},
		{
			id: 'applications',
			label: 'Applications'
		},
		{
			id: 'desktop',
			label: 'Desktop'
		},
		{
			id: 'downloads',
			label: 'Downloads'
		},
		{
			id: 'documents',
			label: 'Documents'
		}
	] as const;

	let selectedItems: string[] = [];
	let selectedItemsRight: string[] = [];

	const sampleCode = `function example() {
	console.log("Hello World!");
}`;

	const cbLeftStacked = `<div class="rounded border border-b p-1 px-2 pb-2 shadow-sm lg:px-4">
	{#each checker as checItem}
		<div class="flex items-center justify-between w-full py-2">
			<Label class="font-normal" for={checItem.id}>
				{checItem.label}
			</Label>
			<Checkbox.Root
				id={checItem.id}
				checked={selectedItems.includes(checItem.id)}
				onCheckedChange={(checked) => {
					if (checked) {
						selectedItems = [...selectedItems, checItem.id];
					} else {
						selectedItems = selectedItems.filter((id) => id !== checItem.id);
					}
				}}
			/>
		</div>
	{/each}
</div>`;
	const rustExample = `fn main() {
	println!("Old line");
	println!("Made it here!");
	println!("New line");
}`;
</script>

<main class="flex flex-1 flex-col gap-4 p-4 pt-0 mb-5">
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

	<section class="grid auto-rows-min gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Left Column -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Left Stacked</p>
				<div class="rounded border border-b p-1 px-2 pb-2 shadow-sm lg:px-4">
					{#each checker as checItem}
						<div class="flex items-center space-x-2 py-2">
							<Checkbox.Root
								id={`left-${checItem.id}`}
								checked={selectedItems.includes(checItem.id)}
								onCheckedChange={(checked) => {
									if (checked) {
										selectedItems = [...selectedItems, checItem.id];
									} else {
										selectedItems = selectedItems.filter((id) => id !== checItem.id);
									}
								}}
							/>
							<Label class="font-normal" for={`left-${checItem.id}`}>
								{checItem.label}
							</Label>
						</div>
					{/each}

					<!-- Optimized CodeBlock containers -->
					<div class="space-y-4">
						<div class="w-[calc(100vw-3rem)] overflow-x-auto md:w-auto">
							<div class="min-w-max">
								<CodeBlock code={rustExample} language={rust} showLineNumbers={false} />
							</div>
						</div>

						<div class="w-[calc(100vw-3rem)] overflow-x-auto md:w-auto">
							<div class="min-w-max">
								<CodeBlock
									code={cbLeftStacked}
									language={typescript}
									showLineNumbers={true}
									wrapLines={true}
									hideBorder={true}
									highlightedLines={[1, 3, 5]}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Column -->
			<div class="space-y-2">
				<p class="text-md pl-100 font-medium">Right stacked stretched</p>
				<div class="overflow-hidden rounded border border-b p-1 px-2 pb-2 shadow-sm lg:px-4">
					{#each checker as checItem}
						<div class="flex w-full items-center justify-between py-2">
							<Label class="font-normal" for={`right-${checItem.id}`}>
								{checItem.label}
							</Label>
							<Checkbox.Root
								id={`right-${checItem.id}`}
								checked={selectedItemsRight.includes(checItem.id)}
								onCheckedChange={(checked) => {
									if (checked) {
										selectedItemsRight = [...selectedItemsRight, checItem.id];
									} else {
										selectedItemsRight = selectedItemsRight.filter((id) => id !== checItem.id);
									}
								}}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="grid auto-rows-min gap-4 md:grid-cols-3">
		{#each items as item}
			<div class="aspect-video rounded-xl bg-muted/50">
				{item.content}
			</div>
		{/each}
	</section>
	<div class="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
		<Card.Root>
			<Card.Header class="pb-3">
				<Card.Title>Checkboxes</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-1">
				<p>
					The HTML input <code>&lt;input type="checkbox"&gt;</code> is an input element to enter an
					array of different values. The value attribute is used to define the <code>value</code>
					submitted by the checkbox. The <code>checked</code> attribute is used to indicate whether
					this item is selected. The
					<code>indeterminate</code> attribute is used to indicate that the checkbox is in an indeterminate
					state (on most platforms, this draws a horizontal line across the checkbox).
				</p>
				<div
					class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
				>
					<div class="space-y-1">
						<p class="text-sm font-medium leading-none">Everything</p>
						<p class="text-sm text-muted-foreground">Email digest, mentions & all activity.</p>
					</div>
				</div>
				<div
					class="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all"
				>
					<div class="space-y-1">
						<p class="text-sm font-medium leading-none">Available</p>
						<p class="text-sm text-muted-foreground">Only mentions and comments.</p>
					</div>
				</div>
				<div
					class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
				>
					<div class="space-y-1">
						<p class="text-sm font-medium leading-none">Ignoring</p>
						<p class="text-sm text-muted-foreground">Turn off all notifications.</p>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</main>
