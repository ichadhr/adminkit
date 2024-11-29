<script lang="ts">
	import CodeBlock from '$lib/components/code-block.svelte';
	import typescript from 'svelte-highlight/languages/typescript';
	import rust from 'svelte-highlight/languages/rust';

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

<main class="flex flex-1 flex-col gap-4 p-4 pt-0">
	<section class="space-y-6">
		<CodeBlock code={rustExample} language={rust} showLineNumbers={false} />
		<CodeBlock
			code={cbLeftStacked}
			language={typescript}
			showLineNumbers={true}
			wrapLines={true}
			hideBorder={true}
			highlightedLines={[1, 3, 5]}
		/>
	</section>
</main>
