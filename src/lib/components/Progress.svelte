<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';

	// Constants for better maintainability
	const INITIAL_PROGRESS = 20;
	const MAX_PROGRESS = 90;
	const COMPLETE_PROGRESS = 100;
	const PROGRESS_INTERVAL = 100;
	const FADE_DELAY = 300;
	const INITIAL_LOAD_DELAY = 500;
	const MIN_INCREMENT = 0.2;
	const INCREMENT_MULTIPLIER = 3;

	// Type definitions for better type safety
	interface ProgressElements {
		bar: HTMLDivElement | null;
		wrapper: HTMLDivElement | null;
	}

	// Properly typed variables
	let elements: ProgressElements = {
		bar: null,
		wrapper: null
	};
	let currentProgress = 0;
	let progressTimer: ReturnType<typeof setInterval>;
	let fadeTimer: ReturnType<typeof setTimeout>;
	let isInitialLoad = true;

	// Reactive statement for progress control
	$: if (browser && ($navigating || isInitialLoad)) {
		startProgress();
	} else if (browser) {
		completeProgress();
	}

	function startProgress(): void {
		if (!browser) return;
		clearTimeout(fadeTimer);

		if (elements.wrapper) {
			elements.wrapper.style.opacity = '1';
		}

		currentProgress = INITIAL_PROGRESS;
		updateProgress();

		progressTimer = setInterval(() => {
			if (currentProgress < MAX_PROGRESS) {
				const remaining = MAX_PROGRESS - currentProgress;
				const increment = Math.max(
					MIN_INCREMENT,
					(remaining / COMPLETE_PROGRESS) * Math.random() * INCREMENT_MULTIPLIER
				);
				currentProgress = Math.min(MAX_PROGRESS, currentProgress + increment);
				updateProgress();
			}
		}, PROGRESS_INTERVAL);
	}

	function completeProgress(): void {
		if (!browser) return;
		clearInterval(progressTimer);

		currentProgress = COMPLETE_PROGRESS;
		updateProgress();

		fadeTimer = setTimeout(() => {
			if (elements.wrapper) {
				elements.wrapper.style.opacity = '0';
			}
		}, FADE_DELAY);
	}

	function updateProgress(): void {
		if (!browser || !elements.bar) return;
		elements.bar.style.width = `${currentProgress}%`;
	}

	onMount(() => {
		if (browser) {
			setTimeout(() => {
				isInitialLoad = false;
				completeProgress();
			}, INITIAL_LOAD_DELAY);
		}
	});

	onDestroy(() => {
		if (!browser) return;
		clearInterval(progressTimer);
		clearTimeout(fadeTimer);
	});
</script>

{#if browser}
	<div
		class="progress-wrapper"
		bind:this={elements.wrapper}
		role="progressbar"
		aria-valuenow={currentProgress}
		aria-valuemin="0"
		aria-valuemax={COMPLETE_PROGRESS}
	>
		<div class="progress-bar" bind:this={elements.bar}></div>
		<div class="loading-spinner" aria-hidden="true"></div>
	</div>
{/if}
