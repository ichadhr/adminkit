<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';

	/**
	 * Type definitions for error handling
	 */
	type HttpStatusCode = number;

	interface ErrorDetail {
		code: HttpStatusCode;
		message: string;
		description: string;
	}

	/**
	 * Error mapping configuration
	 * @const {Record<HttpStatusCode, ErrorDetail>}
	 */
	const ERROR_MAP: Record<HttpStatusCode, ErrorDetail> = {
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
		403: {
			code: 403,
			message: 'Forbidden',
			description: 'The server understood the request, but is refusing to fulfill it.'
		},
		404: {
			code: 404,
			message: 'Not Found',
			description: 'The page you requested was not found.'
		},
		410: {
			code: 410,
			message: 'Gone',
			description:
				'The requested resource is no longer available at the server and no forwarding address is known.'
		},
		500: {
			code: 500,
			message: 'Internal Server Error',
			description:
				'The server encountered an unexpected condition which prevented it from fulfilling the request.'
		},
		502: {
			code: 502,
			message: 'Bad Gateway',
			description: 'The server was unable to complete your request. Please try again later.'
		},
		503: {
			code: 503,
			message: 'Service Unavailable',
			description:
				'The server is currently unable to handle the request due to temporary overloading or maintenance.'
		}
	} as const;

	/**
	 * Returns detailed error information for a given HTTP status code
	 * @param {number} code - HTTP status code
	 * @returns {ErrorDetail} Detailed error information
	 */
	function getErrorDetails(code?: number): ErrorDetail {
		if (code && code in ERROR_MAP) {
			return ERROR_MAP[code as keyof typeof ERROR_MAP];
		} else {
			// Return placeholders when code is undefined or not in ERROR_MAP
			return {
				code: 0,
				message: 'Loading...',
				description: 'Loading...'
			};
		}
	}

	/**
	 * State management using Svelte 5 runes
	 */
	let clientIP = $state(page.data.clientIP ?? 'Unknown');

	// Use $derived with a function to automatically handle reactivity
	let errorDetails = $derived(() => getErrorDetails(page.status));

	let errorMessage = $derived(() => {
		const details = errorDetails();
		return page.error?.message === `Error: ${page.status}`
			? details.description
			: (page.error?.message ?? details.description);
	});

	/**
	 * Handles navigation back to previous page
	 */
	function handleBack(): void {
		history.back();
	}
</script>

<div class="min-h-screen bg-background text-foreground">
	<div>
		<div class="er-wrapper pt-6 md:pt-10">
			<h1 class="text-6xl font-normal md:text-7xl">
				<span>Oops!</span>
			</h1>
			<h2 class="mt-2 text-3xl font-light text-muted-foreground">
				{#if errorDetails().code !== 0}
					{errorDetails().code}
				{/if}
				{errorDetails().message}
			</h2>
		</div>

		<div class="er-wrapper">
			<h2 class="mb-2 pt-10 text-xl font-light">Info:</h2>
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
			<Button variant="outline" onclick={handleBack}>Back</Button>
		</div>
	</div>
</div>
