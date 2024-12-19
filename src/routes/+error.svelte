<script lang="ts">
	import { page } from '$app/state';
	import type { Page } from '@sveltejs/kit';
	import { Button } from '$lib/components/ui/button';

	/**
	 * Represents the structure of an error detail
	 */
	interface ErrorDetail {
		code: number;
		message: string;
		description: string;
	}

	/**
	 * Maps HTTP status codes to detailed error information
	 * @param code - HTTP status code
	 * @returns ErrorDetail object containing error information
	 */
	function getErrorDetails(code: number): ErrorDetail {
		const errorMap: Record<number, ErrorDetail> = {
			400: {
				code: 400,
				message: 'Bad Request',
				description: 'The request could not be understood by the server due to malformed syntax.'
			},
			401: {
				code: 401,
				message: 'Unauthorized',
				description: 'The request requires user authentication.'
			},
			// ... other status codes ...
			503: {
				code: 503,
				message: 'Service Unavailable',
				description:
					'The server is currently unable to handle the request due to temporary overloading or maintenance.'
			}
		};

		return (
			errorMap[code] ?? {
				code: 502,
				message: 'An error has occurred',
				description: 'If this error persists, contact your system administrator.'
			}
		);
	}

	/**
	 * State declarations using Svelte 5 runes
	 */
	let clientIP = $state(page.data.clientIP ?? 'Unknown');

	let errorDetails = $derived(() => getErrorDetails(page.status));

	let errorMessage = $derived(() => {
		const defaultMessage = `Error: ${page.status}`;
		return page.error?.message === defaultMessage
			? errorDetails().description
			: (page.error?.message ?? errorDetails().description);
	});
</script>

<div class="min-h-screen bg-background text-foreground">
	<div>
		<div class="er-wrapper pt-6 md:pt-10">
			<h1 class="text-6xl font-normal md:text-7xl">
				<span>Oops!</span>
			</h1>
			<h2 class="mt-2 text-3xl font-light text-muted-foreground">
				{errorDetails().message}
				{page.status}
			</h2>
		</div>

		<div class="er-wrapper">
			<h2 class="mb-2 text-xl font-light md:pt-10">Info:</h2>
			<p class="font-mono text-muted-foreground">
				{errorMessage()}
			</p>
		</div>

		<div
			class="er-wrapper mt-7 flex flex-col items-center justify-center border-t border-border py-6 text-center"
		>
			<p class="mb-4 text-sm text-muted-foreground">
				Your IP: {clientIP}
			</p>
			<Button variant="outline" onclick={() => history.back()}>Back</Button>
		</div>
	</div>
</div>
