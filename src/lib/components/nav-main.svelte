<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	interface SubMenuItem {
		title: string;
		url: string;
	}

	interface MenuItem {
		title: string;
		url: string;
		icon: typeof import('lucide-svelte').Icon;
		isActive?: boolean;
		items?: SubMenuItem[];
	}

	interface GroupItem {
		title: string;
		items: MenuItem[];
	}

	let { groupItems }: { groupItems: GroupItem[] } = $props();
</script>

{#each groupItems as group}
	<Sidebar.Group>
		<Sidebar.GroupLabel>{group.title.toUpperCase()}</Sidebar.GroupLabel>
		<Sidebar.Menu>
			{#each group.items as menuNav (menuNav.title)}
				<Collapsible.Root open={menuNav.isActive}>
					{#snippet child({ props })}
						<Sidebar.MenuItem {...props}>
							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuButton {...props}>
										<menuNav.icon />
										<span>{menuNav.title}</span>
										{#if menuNav.items?.length}
											<span class="collapsible-trigger-indicator">
												<ChevronRight class="h-4 w-4" />
												<span class="sr-only">Toggle</span>
											</span>
										{/if}
									</Sidebar.MenuButton>
								{/snippet}
							</Collapsible.Trigger>
							{#if menuNav.items?.length}
								<Collapsible.Content class="collapsible-content">
									<Sidebar.MenuSub>
										{#each menuNav.items as subItem (subItem.title)}
											<Sidebar.MenuSubItem>
												<Sidebar.MenuSubButton href={subItem.url}>
													<span>{subItem.title}</span>
												</Sidebar.MenuSubButton>
											</Sidebar.MenuSubItem>
										{/each}
									</Sidebar.MenuSub>
								</Collapsible.Content>
							{/if}
						</Sidebar.MenuItem>
					{/snippet}
				</Collapsible.Root>
			{/each}
		</Sidebar.Menu>
	</Sidebar.Group>
{/each}
