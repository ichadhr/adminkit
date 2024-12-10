<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import {Separator} from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import {breadcrumbs, pageTitle} from '@/lib/utils';
	import ThemeToggle from '$lib/components/theme-toggle.svelte'; // adjust path as needed
	import {browser} from '$app/environment';
	import {onMount} from 'svelte';

	let {children} = $props();

	onMount(() => {
		if (browser) {
			if (
				localStorage.theme === 'dark' ||
				(!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2">
			<nav class="flex flex-1 items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each $breadcrumbs as crumb, i}
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
				<div class="ml-auto">
					<ThemeToggle />
				</div>
			</nav>
		</header>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
