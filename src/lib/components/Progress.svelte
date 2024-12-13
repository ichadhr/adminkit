<!-- src\lib\components\progress.svelte -->
<script lang="ts">
	import {onMount, onDestroy} from 'svelte';
	import {navigating} from '$app/stores';
	import {browser} from '$app/environment';

	/**
	 * Progress bar configuration constants
	 */
	const PROGRESS = {
		INITIAL: 20,
		MAX: 90,
		COMPLETE: 100,
		INTERVAL: 100,
		FADE_DELAY: 300,
		INITIAL_LOAD_DELAY: 500,
		MIN_INCREMENT: 0.2,
		INCREMENT_MULTIPLIER: 3
	} as const;

	/**
	 * DOM element references for progress bar components
	 */
	interface ProgressElements {
		bar: HTMLDivElement | null;
		wrapper: HTMLDivElement | null;
	}

	/**
	 * Progress state management using Svelte 5 runes
	 */
	let elements = $state<ProgressElements>({
		bar: null,
		wrapper: null
	});

	let currentProgress = $state(0);
	let isInitialLoad = $state(true);

	// Timers stored in state to ensure proper cleanup
	let progressTimer = $state<ReturnType<typeof setInterval>>();
	let fadeTimer = $state<ReturnType<typeof setTimeout>>();

	/**
	 * Updates the progress bar width based on current progress
	 */
	function updateProgress(): void {
		if (!browser || !elements.bar) return;
		elements.bar.style.width = `${currentProgress}%`;
	}

	/**
	 * Initiates the progress animation sequence
	 */
	function startProgress(): void {
		if (!browser) return;
		clearTimeout(fadeTimer);

		if (elements.wrapper) {
			elements.wrapper.style.opacity = '1';
		}

		currentProgress = PROGRESS.INITIAL;
		updateProgress();

		progressTimer = setInterval(() => {
			if (currentProgress < PROGRESS.MAX) {
				const remaining = PROGRESS.MAX - currentProgress;
				const increment = Math.max(
					PROGRESS.MIN_INCREMENT,
					(remaining / PROGRESS.COMPLETE) * Math.random() * PROGRESS.INCREMENT_MULTIPLIER
				);
				currentProgress = Math.min(PROGRESS.MAX, currentProgress + increment);
				updateProgress();
			}
		}, PROGRESS.INTERVAL);
	}

	/**
	 * Completes the progress animation and triggers fade out
	 */
	function completeProgress(): void {
		if (!browser) return;
		clearInterval(progressTimer);

		currentProgress = PROGRESS.COMPLETE;
		updateProgress();

		fadeTimer = setTimeout(() => {
			if (elements.wrapper) {
				elements.wrapper.style.opacity = '0';
			}
		}, PROGRESS.FADE_DELAY);
	}

	// Progress control based on navigation state
	$effect(() => {
		if (!browser) return;
		if ($navigating || isInitialLoad) {
			startProgress();
		} else {
			completeProgress();
		}
	});

	onMount(() => {
		if (browser) {
			setTimeout(() => {
				isInitialLoad = false;
				completeProgress();
			}, PROGRESS.INITIAL_LOAD_DELAY);
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
		aria-label="Loading progress"
		role="progressbar"
		aria-valuenow={currentProgress}
		aria-valuemin="0"
		aria-valuemax={PROGRESS.COMPLETE}
	>
		<div class="progress-bar" bind:this={elements.bar}></div>
		<div class="loading-spinner" aria-hidden="true"></div>
	</div>
{/if}
