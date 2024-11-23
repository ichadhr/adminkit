<script lang="ts">
	import CodeBlock from '@/lib/components/CodeBlock.svelte';
	import * as Card from '@/lib/components/ui/card';

	const items = [
		{ content: 'Dashboard Item 1' },
		{ content: 'Dashboard Item 2' },
		{ content: 'Dashboard Item 3' }
	];

	const sampleCode = `function example() {
	console.log("Hello World!");
}`;
</script>

<main class="flex flex-1 flex-col gap-4 p-4 pt-0">
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
					The HTML input <code class="font-mono">&lt;input type="checkbox"&gt;</code> is an input element to enter an array
					of different values. The value attribute is used to define the value submitted by the checkbox.
					The checked attribute is used to indicate whether this item is selected. The indeterminate
					attribute is used to indicate that the checkbox is in an indeterminate state (on most platforms,
					this draws a horizontal line across the checkbox).
				</p>
				<CodeBlock
					code={sampleCode}
					language="javascript"
					theme="github-dark"
					showLineNumbers={true}
					highlightLines={[2]}
					wordWrap={false}
				/>
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
