<!-- src\routes\dashboard\form_components\input\+page.svelte -->

<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
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
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { TextareaAutosize } from '$lib/components/custom/textareea-autosize/index.js';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';

	let showPassword = false;
	let leftShowPassword = false;
	let rightShowPassword = false;
</script>

<content class="mb-5 flex flex-1 flex-col gap-4 p-4 pt-0">
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
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Textarea</Label>
			</div>
			<div>
				<Textarea rows={3} placeholder="Type your message here." />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Textarea autosize</Label>
			</div>
			<div>
				<TextareaAutosize rows={3} placeholder="Type your message here." />
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
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Disabled textarea</Label>
			</div>
			<div>
				<Textarea rows={3} placeholder="Type your message here." disabled />
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
				<!-- Password input with left Lock icon and right toggle -->
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
				<!-- Right password input with toggle -->
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
						{#if rightShowPassword}
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
				<Input class="border-info focus:ring-info/50 focus-visible:ring-info/30" />
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Success</Label>
			</div>
			<div>
				<Input class="border-success focus:ring-success/50 focus-visible:ring-success/30" />
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Warning</Label>
			</div>
			<div>
				<Input class="border-warning focus:ring-warning/50 focus-visible:ring-warning/30" />
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Error</Label>
			</div>
			<div>
				<Input class="border-error focus:ring-error/50 focus-visible:ring-error/30" />
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Textarea blue</Label>
			</div>
			<div>
				<Textarea
					rows={3}
					placeholder="Type your message here."
					class="focus:ring-blue/50 focus-visible:ring-blue/30 border-blue-500"
				/>
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Input with button</h3>
		<Separator class="my-4" />
		<!-- Default Examples -->
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Left button</Label>
			</div>
			<div class="group flex w-full items-center">
				<Button class="rounded-r-none group-focus-within:ring-1 group-focus-within:ring-ring"
					>Left</Button
				>
				<Input
					type="text"
					class="rounded-l-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
				/>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Right button</Label>
			</div>
			<div class="group flex w-full items-center">
				<Input
					type="text"
					class="rounded-r-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
				/>
				<Button class="rounded-l-none group-focus-within:ring-1 group-focus-within:ring-ring"
					>Right</Button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Both sides</Label>
			</div>
			<div class="group flex w-full items-center">
				<Button class="rounded-r-none group-focus-within:ring-1 group-focus-within:ring-ring"
					>Left</Button
				>
				<Input
					type="text"
					class="rounded-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
				/>
				<Button class="rounded-l-none group-focus-within:ring-1 group-focus-within:ring-ring"
					>Right</Button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Info</Label>
			</div>
			<div class="group flex w-full items-center">
				<Button
					class="rounded-r-none bg-info text-info-foreground hover:bg-info/90 group-focus-within:ring-1 group-focus-within:ring-info/50"
					>Left</Button
				>
				<Input
					type="text"
					class="rounded-none border-info focus-visible:ring-1 focus-visible:ring-info/50 focus-visible:ring-offset-0"
				/>
				<Button
					class="rounded-l-none bg-info text-info-foreground hover:bg-info/90 group-focus-within:ring-1 group-focus-within:ring-info/50"
					>Right</Button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Success</Label>
			</div>
			<div class="group flex w-full items-center">
				<Button
					class="rounded-r-none bg-success text-success-foreground hover:bg-success/90 group-focus-within:ring-1 group-focus-within:ring-success/50"
					>Left</Button
				>
				<Input
					type="text"
					class="rounded-none border-success focus-visible:ring-1 focus-visible:ring-success/50 focus-visible:ring-offset-0"
				/>
				<Button
					class="rounded-l-none bg-success text-success-foreground hover:bg-success/90 group-focus-within:ring-1 group-focus-within:ring-success/50"
					>Right</Button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Warning</Label>
			</div>
			<div class="group flex w-full items-center">
				<Button
					class="rounded-r-none bg-warning text-warning-foreground hover:bg-warning/90 group-focus-within:ring-1 group-focus-within:ring-warning/50"
					>Left</Button
				>
				<Input
					type="text"
					class="rounded-none border-warning focus-visible:ring-1 focus-visible:ring-warning/50 focus-visible:ring-offset-0"
				/>
				<Button
					class="rounded-l-none bg-warning text-warning-foreground hover:bg-warning/90 group-focus-within:ring-1 group-focus-within:ring-warning/50"
					>Right</Button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Error</Label>
			</div>
			<div class="group flex w-full items-center">
				<Button
					class="rounded-r-none bg-error text-error-foreground hover:bg-error/90 group-focus-within:ring-1 group-focus-within:ring-error/50"
					>Left</Button
				>
				<Input
					type="text"
					class="rounded-none border-error focus-visible:ring-1 focus-visible:ring-error/50 focus-visible:ring-offset-0"
				/>
				<Button
					class="rounded-l-none bg-error text-error-foreground hover:bg-error/90 group-focus-within:ring-1 group-focus-within:ring-error/50"
					>Right</Button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Purple</Label>
			</div>
			<div class="group flex w-full items-center">
				<Button
					class="rounded-r-none bg-purple-600 hover:bg-purple-700 group-focus-within:ring-1 group-focus-within:ring-purple-600/50"
					>Left</Button
				>
				<Input
					type="text"
					class="rounded-none border-purple-600 focus-visible:ring-1 focus-visible:ring-purple-600/50 focus-visible:ring-offset-0"
				/>
				<Button
					class="rounded-l-none bg-purple-600 hover:bg-purple-700 group-focus-within:ring-1 group-focus-within:ring-purple-600/50"
					>Right</Button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Zinc</Label>
			</div>
			<div class="group flex w-full items-center">
				<Button
					class="rounded-r-none bg-zinc-600 hover:bg-zinc-700 group-focus-within:ring-1 group-focus-within:ring-zinc-600/50"
					>Left</Button
				>
				<Input
					type="text"
					class="rounded-none border-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-600/50 focus-visible:ring-offset-0"
				/>
				<Button
					class="rounded-l-none bg-zinc-600 hover:bg-zinc-700 group-focus-within:ring-1 group-focus-within:ring-zinc-600/50"
					>Right</Button
				>
			</div>
		</div>
	</section>

	<section class="mt-7">
		<h3 class="font-medium leading-none">Input OTP</h3>
		<p class="pt-1 text-sm text-muted-foreground">
			Accessible one-time password component with copy paste functionality.
		</p>
		<Separator class="my-4" />
		<div class="grid grid-cols-1 gap-y-1.5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Default</Label>
			</div>
			<div>
				<InputOTP.Root maxlength={6}>
					{#snippet children({ cells, isFocused, isHovering })}
						<InputOTP.Group>
							{#each cells as cell}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
					{/snippet}
				</InputOTP.Root>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Separator</Label>
			</div>
			<div>
				<InputOTP.Root maxlength={6}>
					{#snippet children({ cells, isFocused, isHovering })}
						<InputOTP.Group>
							{#each cells.slice(0, 2) as cell}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
						<InputOTP.Separator />
						<InputOTP.Group>
							{#each cells.slice(2, 4) as cell}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
						<InputOTP.Separator />
						<InputOTP.Group>
							{#each cells.slice(4, 6) as cell}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
					{/snippet}
				</InputOTP.Root>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-y-1.5 pt-5 md:grid-cols-[15%_85%]">
			<div class="flex md:items-center">
				<Label class="font-normal">Separator</Label>
			</div>
			<div>
				<InputOTP.Root maxlength={8}>
					{#snippet children({ cells, isFocused, isHovering })}
						<InputOTP.Group>
							{#each cells.slice(0, 2) as cell}
								<InputOTP.Slot
									{cell}
									class="!border-info focus-visible:!ring-info/30 [&.ring-1]:!ring-info/50"
								/>
							{/each}
						</InputOTP.Group>
						<InputOTP.Separator />
						<InputOTP.Group>
							{#each cells.slice(2, 4) as cell}
								<InputOTP.Slot
									{cell}
									class="!border-success focus-visible:!ring-success/30 [&.ring-1]:!ring-success/50"
								/>
							{/each}
						</InputOTP.Group>
						<InputOTP.Separator />
						<InputOTP.Group>
							{#each cells.slice(4, 6) as cell}
								<InputOTP.Slot
									{cell}
									class="!border-warning focus-visible:!ring-warning/30 [&.ring-1]:!ring-warning/50"
								/>
							{/each}
						</InputOTP.Group>
						<InputOTP.Separator />
						<InputOTP.Group>
							{#each cells.slice(6, 8) as cell}
								<InputOTP.Slot
									{cell}
									class="!border-error focus-visible:!ring-error/30 [&.ring-1]:!ring-error/50"
								/>
							{/each}
						</InputOTP.Group>
					{/snippet}
				</InputOTP.Root>
			</div>
		</div>
	</section>
</content>
