<!-- src\lib\components\progress.svelte -->

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	const PROGRESS = {
		INITIAL: 0, // Start from 0
		MAX: 95, // Max before completion
		COMPLETE: 100,
		INTERVAL: 100, // Faster interval for more updates
		FADE_DELAY: 300,
		INITIAL_LOAD_DELAY: 300,
		STAGES: {
			// Define loading stages
			START: 0,
			RESOURCES: 30,
			PROCESSING: 60,
			RENDERING: 85,
			COMPLETE: 100
		}
	} as const;

	interface ProgressElements {
		bar: HTMLDivElement | null;
		wrapper: HTMLDivElement | null;
	}

	let elements = $state<ProgressElements>({
		bar: null,
		wrapper: null
	});

	let currentProgress = $state(0);
	let isInitialLoad = $state(true);
	let isNavigating = $state(false);
	let progressTimer = $state<ReturnType<typeof setInterval>>();
	let fadeTimer = $state<ReturnType<typeof setTimeout>>();

	function updateProgress(): void {
		if (!browser || !elements.bar) return;
		elements.bar.style.width = `${currentProgress}%`;
	}

	function simulateStages() {
		const stages = Object.values(PROGRESS.STAGES);
		let currentStageIndex = 0;

		return setInterval(() => {
			if (currentStageIndex >= stages.length - 1) return;

			const currentStage = stages[currentStageIndex];
			const nextStage = stages[currentStageIndex + 1];

			if (currentProgress < nextStage) {
				// Calculate a random increment within the current stage
				const stageProgress = (nextStage - currentStage) * 0.1;
				currentProgress = Math.min(currentProgress + Math.random() * stageProgress, PROGRESS.MAX);
				updateProgress();
			} else {
				currentStageIndex++;
			}
		}, PROGRESS.INTERVAL);
	}

	function startProgress(): void {
		if (!browser) return;
		clearTimeout(fadeTimer);
		clearInterval(progressTimer);

		if (elements.wrapper) {
			elements.wrapper.style.opacity = '1';
		}

		// Reset progress
		currentProgress = PROGRESS.INITIAL;
		updateProgress();

		// Start staged progress simulation
		progressTimer = simulateStages();
	}

	function completeProgress(): void {
		if (!browser) return;
		clearInterval(progressTimer);

		// Ensure we complete the progress smoothly
		const finalizeProgress = () => {
			currentProgress = PROGRESS.COMPLETE;
			updateProgress();

			fadeTimer = setTimeout(() => {
				if (elements.wrapper) {
					elements.wrapper.style.opacity = '0';
				}
				// Reset progress after fade
				setTimeout(() => {
					currentProgress = PROGRESS.INITIAL;
					updateProgress();
				}, PROGRESS.FADE_DELAY);
			}, PROGRESS.FADE_DELAY);
		};

		// Small delay before completion
		setTimeout(finalizeProgress, 150);
	}

	function handleLinkClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const link = target.closest('a');

		if (link?.href && link.target !== '_blank' && link.origin === window.location.origin) {
			isNavigating = true;
			startProgress();
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleLinkClick);

			if (isInitialLoad) {
				startProgress();
				setTimeout(() => {
					isInitialLoad = false;
					completeProgress();
				}, PROGRESS.INITIAL_LOAD_DELAY);
			}
		}
	});

	onDestroy(() => {
		if (!browser) return;
		document.removeEventListener('click', handleLinkClick);
		clearInterval(progressTimer);
		clearTimeout(fadeTimer);
	});

	beforeNavigate(() => {
		if (!isNavigating) {
			isNavigating = true;
			startProgress();
		}
	});

	afterNavigate(() => {
		isNavigating = false;
		completeProgress();
	});
</script>

{#if browser}
	<div
		class="progress-wrapper"
		style:opacity={0}
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
