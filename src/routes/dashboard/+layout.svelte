<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/stores';
	let { children } = $props();

	// formatting
	function formatSegment(segment: string): string {
		return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');
	}

	// get the page title from the last URL segment
	const pageTitle = $derived(
		formatSegment($page.url.pathname.split('/').filter(Boolean).pop() || 'Home')
	);

	// generate breadcrumb items from URL using $derived
	const breadcrumbs = $derived(
		$page.url.pathname
			.split('/')
			.filter((segment) => segment) // remove empty segments
			.map((segment, index, array) => ({
				label: formatSegment(segment),
				href: '/' + array.slice(0, index + 1).join('/'),
				isLast: index === array.length - 1
			}))
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2">
			<nav class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each breadcrumbs as crumb, i}
							{#if i > 0}
								<Breadcrumb.Separator class="hidden md:block" />
							{/if}
							<Breadcrumb.Item class="hidden md:block">
								{#if crumb.isLast}
									<Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
								{:else}
									<Breadcrumb.Link href={crumb.href}>{crumb.label}</Breadcrumb.Link>
								{/if}
							</Breadcrumb.Item>
						{/each}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</nav>
		</header>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
