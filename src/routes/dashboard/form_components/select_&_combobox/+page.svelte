<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Apple, Banana, Cherry, Grape, Citrus, Check, ChevronsUpDown, X } from 'lucide-svelte';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import VirtualList from 'svelte-virtual-scroll-list';
	import Combobox from '$lib/components/custom/combobox/layout.svelte';

	// Type for our fruits
	type Fruit = {
		value: string;
		label: string;
		icon: string;
		disabled?: boolean;
	};

	// Icon mapping
	const iconMap: Record<string, any> = {
		Apple,
		Banana,
		Cherry,
		Grape,
		Citrus
	};

	const fruits = [
		{ value: 'apple', label: 'Apple', icon: Apple },
		{ value: 'banana', label: 'Banana', icon: Banana, disabled: true },
		{ value: 'cherry', label: 'Cherry', icon: Cherry },
		{ value: 'grape', label: 'Grape', icon: Grape },
		{ value: 'citrus', label: 'Citrus', icon: Citrus, disabled: true }
	];

	const timezones = {
		northAmerica: [
			{ value: 'est', label: 'Eastern Standard Time (EST)' },
			{ value: 'cst', label: 'Central Standard Time (CST)' },
			{ value: 'mst', label: 'Mountain Standard Time (MST)' },
			{ value: 'pst', label: 'Pacific Standard Time (PST)' },
			{ value: 'akst', label: 'Alaska Standard Time (AKST)' },
			{ value: 'hst', label: 'Hawaii Standard Time (HST)' }
		],
		europeAfrica: [
			{ value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
			{ value: 'cet', label: 'Central European Time (CET)' },
			{ value: 'eet', label: 'Eastern European Time (EET)' },
			{ value: 'west', label: 'Western European Summer Time (WEST)' },
			{ value: 'cat', label: 'Central Africa Time (CAT)' },
			{ value: 'eat', label: 'East Africa Time (EAT)' }
		],
		asia: [
			{ value: 'msk', label: 'Moscow Time (MSK)' },
			{ value: 'ist', label: 'India Standard Time (IST)' },
			{ value: 'cst_china', label: 'China Standard Time (CST)' },
			{ value: 'jst', label: 'Japan Standard Time (JST)' },
			{ value: 'kst', label: 'Korea Standard Time (KST)' },
			{ value: 'ist_indonesia', label: 'Indonesia Central Standard Time (WITA)' }
		],
		australiaPacific: [
			{ value: 'awst', label: 'Australian Western Standard Time (AWST)' },
			{ value: 'acst', label: 'Australian Central Standard Time (ACST)' },
			{ value: 'aest', label: 'Australian Eastern Standard Time (AEST)' },
			{ value: 'nzst', label: 'New Zealand Standard Time (NZST)' },
			{ value: 'fjt', label: 'Fiji Time (FJT)' }
		],
		southAmerica: [
			{ value: 'art', label: 'Argentina Time (ART)' },
			{ value: 'bot', label: 'Bolivia Time (BOT)' },
			{ value: 'brt', label: 'Brasilia Time (BRT)' },
			{ value: 'clt', label: 'Chile Standard Time (CLT)' }
		]
	};

	// Separate state
	let basicValue = $state('apple');
	let basicHeaderWidthValue = $state('apple');
	let fixedWidthValue = $state('apple');
	let basicPlaceholderValue = $state('');
	let iconValue = $state('');
	let disableValue = $state('');
	let scrollableValue = $state('');
	let colorInfoValue = $state('');
	let colorSuccessValue = $state('');
	let colorWarningValue = $state('');
	let colorErrorValue = $state('');
	let colorBlueValue = $state('');

	// Separate trigger
	const basicTriggerContent = $derived(
		fruits.find((f) => f.value === basicValue)?.label ?? 'Select a fruit'
	);

	const basicheaderTriggerContent = $derived(
		fruits.find((f) => f.value === basicHeaderWidthValue)?.label ?? 'Select a fruit'
	);

	const fixedWidthTriggerContent = $derived(
		fruits.find((f) => f.value === fixedWidthValue)?.label ?? 'Select a fruit'
	);

	const basicPlaceholderTriggerContent = $derived(
		fruits.find((f) => f.value === basicPlaceholderValue)?.label ?? 'Select a fruit'
	);

	const iconTriggerContent = $derived(
		fruits.find((i) => i.value === iconValue)?.label ?? 'Select with icons'
	);

	const disableTriggerContent = $derived(
		fruits.find((i) => i.value === disableValue)?.label ?? 'Some items disabled'
	);

	const scrollableTriggerContent = $derived(
		Object.values(timezones)
			.flat()
			.find((tz) => tz.value === scrollableValue)?.label ?? 'Scrollable...'
	);

	const colorInfoTriggerContent = $derived(
		fruits.find((f) => f.value === colorInfoValue)?.label ?? 'Select a fruit'
	);

	const colorSuccessTriggerContent = $derived(
		fruits.find((f) => f.value === colorSuccessValue)?.label ?? 'Select a fruit'
	);

	const colorWarningTriggerContent = $derived(
		fruits.find((f) => f.value === colorWarningValue)?.label ?? 'Select a fruit'
	);

	const colorErrorTriggerContent = $derived(
		fruits.find((f) => f.value === colorErrorValue)?.label ?? 'Select a fruit'
	);

	const colorBlueTriggerContent = $derived(
		fruits.find((f) => f.value === colorBlueValue)?.label ?? 'Select a fruit'
	);

	const categories = [
		{
			category: 'Fruits',
			items: [
				{ label: 'Apple', value: 'apple' },
				{ label: 'Banana', value: 'banana' },
				{ label: 'Orange', value: 'orange' }
			]
		},
		{
			category: 'Vegetables',
			items: [
				{ label: 'Carrot', value: 'carrot' },
				{ label: 'Broccoli', value: 'broccoli' },
				{ label: 'Spinach', value: 'spinach' }
			]
		}
	];

	let comboBasicOpen = $state(false);
	let comboBasicValue = $state('');
	let comboBasicTriggerRef = $state<HTMLButtonElement>(null!);

	let comboHeaderOpen = $state(false);
	let comboHeaderValue = $state('');
	let comboHeaderTriggerRef = $state<HTMLButtonElement>(null!);

	let comboFixedOpen = $state(false);
	let comboFixedValue = $state('');
	let comboFixedTriggerRef = $state<HTMLButtonElement>(null!);

	let comboDisableItemOpen = $state(false);
	let comboDisableItemValue = $state('');
	let comboDisableItemTriggerRef = $state<HTMLButtonElement>(null!);

	let comboDisabledOpen = $state(false);
	let comboDisabledValue = $state('');
	let comboDisabledTriggerRef = $state<HTMLButtonElement>(null!);

	let comboScrollableOpen = $state(false);
	let comboScrollableValue = $state('');
	let comboScrollableTriggerRef = $state<HTMLButtonElement>(null!);

	let comboUnselectOpen = $state(false);
	let comboUnselectValue = $state('');
	let comboUnselectTriggerRef = $state<HTMLButtonElement>(null!);

	let comboFetchOpen = $state(false);
	let comboFetchValue = $state('');
	let comboFetchTriggerRef = $state<HTMLButtonElement>(null!);
	let fetchedFruits = $state<Fruit[]>([]);
	let isLoading = $state(false);

	const selectedValueBasic = $derived(fruits.find((f) => f.value === comboBasicValue)?.label);

	const selectedValueHeader = $derived(
		categories.flatMap((category) => category.items).find((item) => item.value === comboHeaderValue)
			?.label
	);

	const selectedValueFixed = $derived(fruits.find((f) => f.value === comboFixedValue)?.label);

	const selectedValueDisableItem = $derived(
		fruits.find((f) => f.value === comboDisableItemValue)?.label
	);

	let selectedValueDisabled = $derived(fruits.find((f) => f.value === comboDisabledValue)?.label);

	const selectedScrollableValue = $derived(
		Object.values(timezones)
			.flat()
			.find((tz) => tz.value === comboScrollableValue)?.label
	);

	const selectedValueUnselect = $derived(fruits.find((f) => f.value === comboUnselectValue)?.label);

	const selectedValueFetch = $derived(
		fetchedFruits.find((fruit) => fruit.value === comboFetchValue)
	);

	function closeAndFocusTriggerBasic() {
		comboBasicOpen = false;
		tick().then(() => {
			comboBasicTriggerRef.focus();
		});
	}

	function closeAndFocusTriggerHeader() {
		comboHeaderOpen = false;
		tick().then(() => {
			comboHeaderTriggerRef.focus();
		});
	}

	function closeAndFocusTriggerFixed() {
		comboFixedOpen = false;
		tick().then(() => {
			comboFixedTriggerRef.focus();
		});
	}

	function closeAndFocusTriggerDisableItem() {
		comboDisableItemOpen = false;
		tick().then(() => {
			comboDisableItemTriggerRef.focus();
		});
	}

	function closeAndFocusTriggerDisabled() {
		comboDisabledOpen = false;
		comboDisabledTriggerRef?.focus();
	}

	function closeAndFocusTriggerScrollable() {
		comboScrollableOpen = false;
		tick().then(() => {
			comboScrollableTriggerRef.focus();
		});
	}

	function closeAndFocusTriggerUnselect() {
		comboUnselectOpen = false;
		tick().then(() => {
			comboUnselectTriggerRef.focus();
		});
	}

	function closeAndFocusTriggerFetch() {
		comboFetchOpen = false;
		tick().then(() => {
			comboFetchTriggerRef.focus();
		});
	}

	async function fetchFruits(search: string = '') {
		isLoading = true;
		try {
			const response = await fetch('/api/fruits.json');
			const data: Fruit[] = await response.json();
			fetchedFruits = data.filter((fruit) =>
				fruit.label.toLowerCase().includes(search.toLowerCase())
			);
		} catch (error) {
			console.error('Error fetching fruits:', error);
			fetchedFruits = [];
		} finally {
			isLoading = false;
		}
	}

	function getIconComponent(iconName: string) {
		switch (iconName) {
			case 'Apple':
				return Apple;
			case 'Banana':
				return Banana;
			case 'Cherry':
				return Cherry;
			case 'Grape':
				return Grape;
			case 'Citrus':
				return Citrus;
			default:
				return null;
		}
	}

	// Initial fetch
	onMount(() => {
		fetchFruits();
	});
</script>

<content class="mb-5 flex flex-1 flex-col gap-4 p-4 pt-0">
	<!-- heading section select -->
	<section class="space-y-6">
		<h3 class="text-2xl font-medium">Select</h3>
		<p class="text-sm">
			A Select component is a user interface control element that presents a collapsible list of
			options from which users can choose one (or multiple) values. It's triggered by a button
			interaction, displaying options in a dropdown panel that overlays other content.
		</p>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Basic</h3>

		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Basic select</Label>
			</div>
			<div>
				<Select.Root type="single" name="basic" bind:value={basicValue}>
					<Select.Trigger>
						{basicTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Select with header</Label>
			</div>
			<div>
				<Select.Root type="single" name="basic" bind:value={basicHeaderWidthValue}>
					<Select.Trigger>
						{basicheaderTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Fruits</Select.GroupHeading>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Fixed select width</Label>
			</div>
			<div>
				<Select.Root type="single" name="fixed-width" bind:value={fixedWidthValue}>
					<Select.Trigger class="w-[380px]">
						{fixedWidthTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Select with placeholder</Label>
			</div>
			<div>
				<Select.Root type="single" name="placeholder" bind:value={basicPlaceholderValue}>
					<Select.Trigger>
						{basicPlaceholderTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Select with icons</Label>
			</div>
			<div>
				<Select.Root type="single" name="icons" bind:value={iconValue}>
					<Select.Trigger>
						{#if iconValue}
							{@const selectedIcon = fruits.find((f) => f.value === iconValue)}
							{#if selectedIcon}
								<div class="flex items-center gap-2">
									<selectedIcon.icon class="h-4 w-4" />
									<span>{iconTriggerContent}</span>
								</div>
							{/if}
						{:else}
							{iconTriggerContent}
						{/if}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Icons</Select.GroupHeading>
							{#each fruits as icon}
								<Select.Item value={icon.value} label={icon.label}>
									<div class="flex items-center gap-2">
										<icon.icon class="h-4 w-4" />
										<span>{icon.label}</span>
									</div>
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Scrollable select</Label>
			</div>
			<div>
				<Select.Root type="single" bind:value={scrollableValue}>
					<Select.Trigger>
						{scrollableTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>North America</Select.GroupHeading>
							{#each timezones.northAmerica as tz}
								<Select.Item value={tz.value} label={tz.label} />
							{/each}
						</Select.Group>

						<Select.Group>
							<Select.GroupHeading>Europe & Africa</Select.GroupHeading>
							{#each timezones.europeAfrica as tz}
								<Select.Item value={tz.value} label={tz.label} />
							{/each}
						</Select.Group>

						<Select.Group>
							<Select.GroupHeading>Asia</Select.GroupHeading>
							{#each timezones.asia as tz}
								<Select.Item value={tz.value} label={tz.label} />
							{/each}
						</Select.Group>

						<Select.Group>
							<Select.GroupHeading>Australia & Pacific</Select.GroupHeading>
							{#each timezones.australiaPacific as tz}
								<Select.Item value={tz.value} label={tz.label} />
							{/each}
						</Select.Group>

						<Select.Group>
							<Select.GroupHeading>South America</Select.GroupHeading>
							{#each timezones.southAmerica as tz}
								<Select.Item value={tz.value} label={tz.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Disabled items</Label>
			</div>
			<div>
				<Select.Root type="single" name="disable" bind:value={disableValue}>
					<Select.Trigger>
						{disableTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} disabled={fruit.disabled} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Disable select</Label>
			</div>
			<div>
				<Select.Root type="single" name="disable" bind:value={basicValue} disabled>
					<Select.Trigger>
						{basicTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Fruits</Select.GroupHeading>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Color</h3>

		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Info select</Label>
			</div>
			<div>
				<Select.Root type="single" name="info" bind:value={colorInfoValue}>
					<Select.Trigger class="border-info focus:ring-info/50 focus-visible:ring-info/30">
						{colorInfoTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Fruits</Select.GroupHeading>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Success select</Label>
			</div>
			<div>
				<Select.Root type="single" name="success" bind:value={colorSuccessValue}>
					<Select.Trigger
						class="border-success focus:ring-success/50 focus-visible:ring-success/30"
					>
						{colorSuccessTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Fruits</Select.GroupHeading>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Warning select</Label>
			</div>
			<div>
				<Select.Root type="single" name="warning" bind:value={colorWarningValue}>
					<Select.Trigger
						class="border-warning focus:ring-warning/50 focus-visible:ring-warning/30"
					>
						{colorWarningTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Fruits</Select.GroupHeading>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Error select</Label>
			</div>
			<div>
				<Select.Root type="single" name="error" bind:value={colorErrorValue}>
					<Select.Trigger class="border-error focus:ring-error/50 focus-visible:ring-error/30">
						{colorErrorTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Fruits</Select.GroupHeading>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Blue color select</Label>
			</div>
			<div>
				<Select.Root type="single" name="blue-500" bind:value={colorBlueValue}>
					<Select.Trigger
						class="border-blue-500 focus:ring-blue-500/50 focus-visible:ring-blue-500/30"
					>
						{colorBlueTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Fruits</Select.GroupHeading>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	</section>

	<!-- heading section combobox -->
	<section class="space-y-6 pt-10">
		<h3 class="text-2xl font-medium">Combobox</h3>
		<p class="text-sm">
			A Combobox combines an input field with a command palette, allowing users to search, filter
			and select from a list of suggestions.
		</p>
	</section>
	<section class="mt-7">
		<h3 class="font-medium leading-none">Basic</h3>
		<Separator class="my-4" />

		<!-- Combobox basic -->
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Basic combobox</Label>
			</div>
			<div>
				<Popover.Root bind:open={comboBasicOpen}>
					<Popover.Trigger bind:ref={comboBasicTriggerRef}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class="w-full justify-between"
								{...props}
								role="combobox"
								aria-expanded={comboBasicOpen}
							>
								<span
									class={selectedValueBasic ? 'font-normal' : 'font-normal text-muted-foreground'}
								>
									{selectedValueBasic || 'Select a fruit'}
								</span>
								<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0" align="start">
						<Command.Root>
							<Command.Input placeholder="Select fruit" />
							<Command.List>
								<Command.Empty>No fruit found.</Command.Empty>
								<Command.Group>
									{#each fruits as fruit}
										<Command.Item
											value={fruit.value}
											onSelect={() => {
												comboBasicValue = fruit.value;
												closeAndFocusTriggerBasic();
											}}
										>
											{fruit.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<!-- Combobox with header -->
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Combobox with header</Label>
			</div>
			<div>
				<Popover.Root bind:open={comboHeaderOpen}>
					<Popover.Trigger bind:ref={comboHeaderTriggerRef}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class="w-full justify-between"
								{...props}
								role="combobox"
								aria-expanded={comboHeaderOpen}
							>
								<span
									class={selectedValueHeader ? 'font-normal' : 'font-normal text-muted-foreground'}
								>
									{selectedValueHeader || 'Select option..'}
								</span>

								<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0" align="start">
						<Command.Root>
							<Command.Input placeholder="Search..." />
							<Command.List>
								<Command.Empty>No results found.</Command.Empty>
								{#each categories as category}
									<Command.Group>
										<div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
											{category.category}
										</div>
										{#each category.items as item}
											<Command.Item
												value={item.value}
												onSelect={() => {
													comboHeaderValue = item.value;
													closeAndFocusTriggerHeader();
												}}
											>
												<Check
													class={cn(
														'mr-2 size-4',
														comboHeaderValue !== item.value && 'text-transparent'
													)}
												/>
												{item.label}
											</Command.Item>
										{/each}
									</Command.Group>
									{#if category !== categories[categories.length - 1]}
										<Command.Separator />
									{/if}
								{/each}
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<!-- Combobox fixed width -->
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Fixed combobox width</Label>
			</div>
			<div>
				<Popover.Root bind:open={comboFixedOpen}>
					<Popover.Trigger bind:ref={comboFixedTriggerRef}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class="w-[380px] justify-between"
								{...props}
								role="combobox"
								aria-expanded={comboFixedOpen}
							>
								<span
									class={selectedValueFixed ? 'font-normal' : 'font-normal text-muted-foreground'}
								>
									{selectedValueFixed || 'Select a fruit'}
								</span>
								<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0" align="start" side="right">
						<Command.Root>
							<Command.Input placeholder="Select fruit" />
							<Command.List>
								<Command.Empty>No fruit found.</Command.Empty>
								<Command.Group>
									{#each fruits as fruit}
										<Command.Item
											value={fruit.value}
											onSelect={() => {
												comboFixedValue = fruit.value;
												closeAndFocusTriggerFixed();
											}}
										>
											<Check
												class={cn(
													'mr-2 size-4',
													comboFixedValue !== fruit.value && 'text-transparent'
												)}
											/>
											{fruit.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<!-- Combobox disable item -->
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Disabled items</Label>
			</div>
			<div>
				<Popover.Root bind:open={comboDisableItemOpen}>
					<Popover.Trigger bind:ref={comboDisableItemTriggerRef}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class="w-full justify-between"
								{...props}
								role="combobox"
								aria-expanded={comboDisableItemOpen}
							>
								<span
									class={selectedValueDisableItem
										? 'font-normal'
										: 'font-normal text-muted-foreground'}
								>
									{selectedValueDisableItem || 'Select a fruit'}
								</span>
								<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0" align="start">
						<Command.Root>
							<Command.Input placeholder="Select fruit" />
							<Command.List>
								<Command.Empty>No fruit found.</Command.Empty>
								<Command.Group>
									{#each fruits as fruit}
										<Command.Item
											value={fruit.value}
											onSelect={() => {
												comboDisableItemValue = fruit.value;
												closeAndFocusTriggerDisableItem();
											}}
											disabled={fruit.disabled}
										>
											{fruit.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<!-- Combobox disabled -->
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Disabled combobox</Label>
			</div>
			<div>
				<Popover.Root bind:open={comboDisabledOpen}>
					<Popover.Trigger bind:ref={comboDisabledTriggerRef}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class={cn(
									'w-full justify-between',
									'disabled:pointer-events-auto disabled:cursor-not-allowed'
								)}
								{...props}
								disabled
								role="combobox"
								aria-expanded={comboDisabledOpen}
								aria-label="Select a fruit (disabled)"
								title="Select a fruit (disabled)"
								style="cursor-not-allowed"
							>
								<span class="font-normal text-muted-foreground">
									{selectedValueDisabled || 'Select a fruit'}
								</span>
								<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0" align="start">
						<Command.Root>
							<Command.Input placeholder="Select fruit" />
							<Command.List>
								<Command.Empty>No fruit found.</Command.Empty>
								<Command.Group>
									{#each fruits as fruit}
										<Command.Item
											value={fruit.value}
											onSelect={() => {
												comboDisabledValue = fruit.value;
												closeAndFocusTriggerDisabled();
											}}
										>
											{fruit.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<!-- Combobox Scrollable -->
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Scrollable combobox</Label>
			</div>
			<div>
				<Popover.Root bind:open={comboScrollableOpen}>
					<Popover.Trigger bind:ref={comboScrollableTriggerRef}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class="w-full justify-between"
								{...props}
								role="combobox"
								aria-expanded={comboScrollableOpen}
							>
								<span
									class={selectedScrollableValue
										? 'font-normal'
										: 'font-normal text-muted-foreground'}
								>
									{selectedScrollableValue || 'Select timezone...'}
								</span>
								<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[320px] p-0" align="start">
						<Command.Root>
							<Command.Input placeholder="Search timezone..." />
							<Command.List class="max-h-[300px]">
								<Command.Empty>No timezone found.</Command.Empty>
								<Command.Group>
									<div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
										North America
									</div>
									{#each timezones.northAmerica as tz}
										<Command.Item
											value={tz.value}
											onSelect={() => {
												comboScrollableValue = tz.value;
												closeAndFocusTriggerScrollable();
											}}
										>
											{tz.label}
										</Command.Item>
									{/each}
								</Command.Group>
								<Command.Separator />
								<Command.Group>
									<div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
										Europe & Africa
									</div>
									{#each timezones.europeAfrica as tz}
										<Command.Item
											value={tz.value}
											onSelect={() => {
												comboScrollableValue = tz.value;
												closeAndFocusTriggerScrollable();
											}}
										>
											{tz.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<!-- Combobox unselect -->
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Combobox with unselect</Label>
			</div>
			<div>
				<Popover.Root bind:open={comboUnselectOpen}>
					<Popover.Trigger bind:ref={comboUnselectTriggerRef}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class="w-[380px] justify-between"
								{...props}
								role="combobox"
								aria-expanded={comboUnselectOpen}
							>
								<span
									class={selectedValueUnselect
										? 'font-normal'
										: 'font-normal text-muted-foreground'}
								>
									{selectedValueUnselect || 'Select a fruit'}
								</span>
								<div class="flex items-center gap-2">
									{#if selectedValueUnselect}
										<button
											type="button"
											class="size-4 opacity-50 hover:opacity-100"
											onpointerdown={(e) => {
												e.stopPropagation();
												comboUnselectValue = '';
											}}
										>
											<X class="size-4" />
										</button>
									{/if}
									<ChevronsUpDown class="size-4 shrink-0 opacity-50" />
								</div>
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0" align="start">
						<Command.Root>
							<Command.Input placeholder="Search fruit..." />
							<Command.List>
								<Command.Empty>No fruit found.</Command.Empty>
								<Command.Group>
									{#each fruits as fruit}
										<Command.Item
											value={fruit.value}
											onSelect={() => {
												comboUnselectValue = fruit.value;
												closeAndFocusTriggerUnselect();
											}}
										>
											{fruit.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<!-- Combobox fetch -->
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Combobox with fetch</Label>
			</div>
			<div>
				<Popover.Root bind:open={comboFetchOpen}>
					<Popover.Trigger bind:ref={comboFetchTriggerRef}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class="w-[380px] justify-between"
								{...props}
								role="combobox"
								aria-expanded={comboFetchOpen}
							>
								<div class="flex items-center gap-2">
									{#if selectedValueFetch}
										{#if getIconComponent(selectedValueFetch.icon)}
											{@const Icon = getIconComponent(selectedValueFetch.icon)}
											<div class="size-4">
												<Icon />
											</div>
										{/if}
									{/if}
									<span
										class={selectedValueFetch ? 'font-normal' : 'font-normal text-muted-foreground'}
									>
										{selectedValueFetch?.label || 'Select fruit...'}
									</span>
								</div>
								<div class="flex items-center gap-2">
									{#if selectedValueFetch}
										<button
											type="button"
											class="size-4 opacity-50 hover:opacity-100"
											onpointerdown={(e) => {
												e.stopPropagation();
												comboFetchValue = '';
											}}
										>
											<X class="size-4" />
										</button>
									{/if}
									<ChevronsUpDown class="size-4 shrink-0 opacity-50" />
								</div>
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[380px] p-0" align="start">
						<Command.Root>
							<Command.Input
								placeholder="Search fruits..."
								oninput={(e) => fetchFruits(e.currentTarget.value)}
							/>
							<Command.List>
								<Command.Empty>
									{#if isLoading}
										<div class="p-4 text-center text-sm text-muted-foreground">Loading...</div>
									{:else}
										No fruits found.
									{/if}
								</Command.Empty>
								<Command.Group>
									<VirtualList data={fetchedFruits} estimateSize={40} key="value" let:data={fruit}>
										<Command.Item
											value={fruit.value}
											disabled={fruit.disabled}
											onSelect={() => {
												comboFetchValue = fruit.value;
												closeAndFocusTriggerFetch();
											}}
										>
											<div class="flex items-center gap-2">
												{#if getIconComponent(fruit.icon)}
													{@const Icon = getIconComponent(fruit.icon)}
													<div class="size-4">
														<Icon />
													</div>
												{/if}
												{fruit.label}
											</div>
										</Command.Item>
									</VirtualList>
								</Command.Group>
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>
	</section>
</content>
