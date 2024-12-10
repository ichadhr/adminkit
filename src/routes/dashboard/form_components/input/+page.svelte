<script lang="ts">
	import {Input} from '$lib/components/ui/input/index.js';
	import {Label} from '$lib/components/ui/label/index.js';
	import {Separator} from '$lib/components/ui/separator/index.js';
	import {
		Search,
		Mail,
		Lock,
		Calendar,
		Clock,
		CalendarDays,
		Link2,
		Eye,
		EyeOff
	} from 'lucide-svelte';

	let showPassword = false;
	let leftShowPassword = false;
	let rightShowPassword = false;
</script>

<main class="mb-5 flex flex-1 flex-col gap-4 p-4 pt-0">
	<!-- heading section input fields -->
	<section class="space-y-6">
		<h3 class="text-2xl font-medium">Input fields</h3>
		<p class="text-sm">
			Input fields (<code>&lt;input&gt;</code>) are fundamental form elements for text and data
			entry, supporting various types including text, number, email, password, date, time, tel, and
			URL, with features like placeholders, validation, and input constraints through attributes
			such as `required`, `pattern`, and `maxlength` to facilitate effective user data collection.
		</p>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Examples</h3>

		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Default text input</Label>
			</div>
			<div>
				<Input />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Placeholder</Label>
			</div>
			<div>
				<Input placeholder="Enter text..." />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Predefined value</Label>
			</div>
			<div>
				<Input value="https://" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Disable autocomplete</Label>
			</div>
			<div>
				<Input autocomplete="off" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Maximum value</Label>
			</div>
			<div>
				<Input maxlength={4} placeholder="Maximum 4 characters" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label for="focusInput" class="font-normal">Focus on label click</Label>
			</div>
			<div>
				<Input id="focusInput" placeholder="Focus on label click" />
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">States</h3>

		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Read-only input</Label>
			</div>
			<div>
				<Input readonly value="This is read-only text" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Disabled input</Label>
			</div>
			<div>
				<Input disabled value="This is disabled text" />
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Input type</h3>

		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Email</Label>
			</div>
			<div>
				<Input type="email" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Password</Label>
			</div>
			<div>
				<Input type="password" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Password toggle view</Label>
			</div>
			<div class="input-wrapper">
				<Input type={showPassword ? 'text' : 'password'} placeholder="Enter password" />
				<button
					type="button"
					class="input-icon password-toggle"
					on:click={() => (showPassword = !showPassword)}
				>
					{#if showPassword}
						<EyeOff size={18} />
					{:else}
						<Eye size={18} />
					{/if}
				</button>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Number</Label>
			</div>
			<div>
				<Input type="number" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Date</Label>
			</div>
			<div class="input-wrapper">
				<Input type="date" />
				<div class="input-icon">
					<Calendar size={18} />
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Time</Label>
			</div>
			<div class="input-wrapper">
				<Input type="time" />
				<div class="input-icon">
					<Clock size={18} />
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Week</Label>
			</div>
			<div class="input-wrapper">
				<Input type="week" />
				<div class="input-icon">
					<CalendarDays size={18} />
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">URL</Label>
			</div>
			<div class="input-wrapper">
				<Input type="url" />
				<div class="input-icon">
					<Link2 size={18} />
				</div>
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">File input</h3>

		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Single file input</Label>
			</div>
			<div>
				<Input type="file" placeholder="No files chosen" class="file:h-full" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Multiple file input</Label>
			</div>
			<div>
				<Input type="file" multiple placeholder="No files chosen" class="file:h-full" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Disable state</Label>
			</div>
			<div>
				<Input type="file" disabled placeholder="No files chosen" class="file:h-full" />
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Input helper</h3>

		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:h-full md:items-center md:justify-start">
				<Label class="font-normal md:translate-y-[-0.5rem]">Input helper</Label>
			</div>
			<div class="grid gap-4 md:grid-cols-3">
				<div>
					<Input />
					<p class="pt-0.5 text-sm text-muted-foreground">Enter your email address.</p>
				</div>
				<div>
					<Input />
					<p class="pt-0.5 text-center text-sm text-muted-foreground">Enter your email address.</p>
				</div>
				<div>
					<Input />
					<p class="pt-0.5 text-right text-sm text-muted-foreground">Enter your email address.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Input icons</h3>

		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Input with icons</Label>
			</div>
			<div class="grid gap-4 md:grid-cols-3">
				<div class="relative">
					<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input class="pl-10" placeholder="Search..." />
				</div>
				<div class="relative">
					<Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input class="pl-10" type="email" placeholder="Email" />
				</div>
				<!-- Updated password input with left Lock icon and right toggle -->
				<div class="input-wrapper">
					<Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						class="pl-10 pr-10"
						type={leftShowPassword ? 'text' : 'password'}
						placeholder="Password"
					/>
					<button
						type="button"
						class="input-icon password-toggle"
						on:click={() => (leftShowPassword = !leftShowPassword)}
					>
						{#if leftShowPassword}
							<EyeOff size={16} />
						{:else}
							<Eye size={16} />
						{/if}
					</button>
				</div>
			</div>
		</div>

		<div class="gap-y-1. grid grid-cols-1 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:h-full md:items-center">
				<Label class="font-normal">Input with right icons</Label>
			</div>
			<div class="grid gap-4 md:grid-cols-3">
				<div class="relative">
					<Input class="pr-10" placeholder="Search..." />
					<Search class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				</div>
				<div class="relative">
					<Input class="pr-10" type="email" placeholder="Email" />
					<Mail class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				</div>
				<!-- Updated password input with toggle -->
				<div class="input-wrapper">
					<Input
						class="pr-10"
						type={rightShowPassword ? 'text' : 'password'}
						placeholder="Password"
					/>
					<button
						type="button"
						class="input-icon password-toggle"
						on:click={() => (rightShowPassword = !rightShowPassword)}
					>
						{#if showPassword}
							<EyeOff size={16} />
						{:else}
							<Eye size={16} />
						{/if}
					</button>
				</div>
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Input style</h3>
		<p class="pt-1 text-sm text-muted-foreground">
			You can customize input borders using Tailwind's built-in color classes (e.g., <code
				>border-blue-500</code
			>, <code>border-red-500</code>) or your custom color classes defined in the Tailwind config.
			The border width can also be adjusted using classes like <code>border-2</code> or
			<code>border-4</code>.
		</p>
		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Info</Label>
			</div>
			<div>
				<Input class="border-info" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Success</Label>
			</div>
			<div>
				<Input class="border-success" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Warning</Label>
			</div>
			<div>
				<Input class="border-warning" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Danger</Label>
			</div>
			<div>
				<Input class="border-danger" />
			</div>
		</div>
	</section>
</main>
