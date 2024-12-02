<script lang="ts">
	const items = [
		{ content: 'Dashboard Item 1' },
		{ content: 'Dashboard Item 2' },
		{ content: 'Dashboard Item 3' }
	];
</script>

<main class="flex flex-1 flex-col gap-4 p-4 pt-0">
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
			<h1>Dashboard Content</h1>
			<!-- Add more dashboard-specific content -->
		</div>
	</div>
</main>
