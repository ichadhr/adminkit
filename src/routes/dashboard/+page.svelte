<!-- src\routes\dashboard\+page.svelte -->

<script lang="ts">
	const items = [{ content: '' }, { content: '' }, { content: '' }];
</script>

<main class="mb-5 flex flex-1 flex-col gap-4 p-4 pt-0">
	<section class="grid auto-rows-min gap-4 md:grid-cols-3">
		{#each items as item}
			<div class="aspect-video rounded-xl bg-muted/50">
				{item.content}
			</div>
		{/each}
	</section>
	<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
		<!-- Your dashboard content here -->
		<div class="p-4">
			<!-- Add more dashboard-specific content -->
		</div>
	</div>
</main>
