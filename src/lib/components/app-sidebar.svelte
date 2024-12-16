<!-- src\lib\components\app-sidebar.svelte -->

<script lang="ts" module>
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Bot from 'lucide-svelte/icons/bot';
	import ChartPie from 'lucide-svelte/icons/chart-pie';
	import Frame from 'lucide-svelte/icons/frame';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import Map from 'lucide-svelte/icons/map';
	import Send from 'lucide-svelte/icons/send';
	import SquareTerminal from 'lucide-svelte/icons/square-terminal';
	import House from 'lucide-svelte/icons/house';

	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/favicon.png'
		},
		navMain: [
			{
				title: 'Forms',
				items: [
					{
						title: 'Dashboard',
						url: '/dashboard',
						icon: House
					},
					{
						title: 'Form components',
						url: '##',
						icon: SquareTerminal,
						// isActive: true,
						items: [
							{
								title: 'Input fields',
								url: '/dashboard/form_components/input'
							},
							{
								title: 'Checkboxes & radios',
								url: '/dashboard/form_components/checkboxes_&_radios'
							},
							{
								title: 'Switch',
								url: '/dashboard/form_components/switch'
							}
						]
					},
					{
						title: 'Pickers',
						url: '#',
						icon: Bot,
						items: [
							{
								title: 'Genesis',
								url: '#'
							},
							{
								title: 'Explorer',
								url: '#'
							},
							{
								title: 'Quantum',
								url: '#'
							}
						]
					},
					{
						title: 'Form layouts',
						url: '#',
						icon: BookOpen,
						items: [
							{
								title: 'Introduction',
								url: '#'
							},
							{
								title: 'Get Started',
								url: '#'
							},
							{
								title: 'Tutorials',
								url: '#'
							},
							{
								title: 'Changelog',
								url: '#'
							}
						]
					}
				]
			}
		],
		navSecondary: [
			{
				title: 'Support',
				url: '#',
				icon: LifeBuoy
			},
			{
				title: 'Feedback',
				url: '#',
				icon: Send
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: Frame
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPie
			},
			{
				name: 'Travel',
				url: '#',
				icon: Map
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from '$lib/components/nav-main.svelte';
	import NavProjects from '$lib/components/nav-projects.svelte';
	import NavSecondary from '$lib/components/nav-secondary.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Radiation from 'lucide-svelte/icons/Radiation';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<Radiation class="size-5" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">Svelte Kit</span>
								<span class="truncate text-xs">Application</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain groupItems={data.navMain} />
		<NavProjects projects={data.projects} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
