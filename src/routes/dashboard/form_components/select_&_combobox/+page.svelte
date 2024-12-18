<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Apple, Banana, Cherry, Grape, Citrus } from 'lucide-svelte';

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
		fruits.find((f) => f.value === colorErrorValue)?.label ?? 'Select a fruit'
	);
</script>

<main class="mb-5 flex flex-1 flex-col gap-4 p-4 pt-0">
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
</main>
