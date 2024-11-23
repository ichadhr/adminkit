<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';

	let progressBar: HTMLDivElement;
	let progressElement: HTMLDivElement;
	let currentProgress = 0;
	let progressTimer: ReturnType<typeof setInterval>;
	let fadeTimer: ReturnType<typeof setTimeout>;
	let isInitialLoad = true;

	// Track navigation and initial load
	$: if (browser && ($navigating || isInitialLoad)) {
		startProgress();
	} else if (browser) {
		completeProgress();
	}

	function startProgress(): void {
		if (!browser) return;

		if (fadeTimer) clearTimeout(fadeTimer);

		if (progressElement) {
			progressElement.style.opacity = '1';
		}

		currentProgress = 20;
		updateProgress();

		progressTimer = setInterval(() => {
			if (currentProgress < 90) {
				const remaining = 90 - currentProgress;
				const increment = Math.max(0.2, (remaining / 100) * Math.random() * 3);
				currentProgress = Math.min(90, currentProgress + increment);
				updateProgress();
			}
		}, 100);
	}

	function completeProgress(): void {
		if (!browser) return;

		if (progressTimer) clearInterval(progressTimer);
		currentProgress = 100;
		updateProgress();

		fadeTimer = setTimeout(() => {
			if (progressElement) {
				progressElement.style.opacity = '0';
			}
		}, 300);
	}

	function updateProgress(): void {
		if (!browser) return;

		if (progressBar) {
			progressBar.style.width = `${currentProgress}%`;
		}
	}

	onMount(() => {
		if (browser) {
			setTimeout(() => {
				isInitialLoad = false;
				completeProgress();
			}, 500);
		}
	});

	onDestroy(() => {
		if (!browser) return;

		if (progressTimer) clearInterval(progressTimer);
		if (fadeTimer) clearTimeout(fadeTimer);
	});
</script>

{#if browser}
	<div
		class="progress-wrapper"
		bind:this={progressElement}
		role="progressbar"
		aria-valuenow={currentProgress}
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div class="progress-bar" bind:this={progressBar}></div>
		<div class="loading-spinner" aria-hidden="true"></div>
	</div>
{/if}
