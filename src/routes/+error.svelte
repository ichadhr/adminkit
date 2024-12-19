<!-- src\routes\+error.svelte -->

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';

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
			403: {
				code: 403,
				message: 'Forbidden',
				description: 'The server understood the request, but is refusing to fulfill it.'
			},
			404: {
				code: 404,
				message: 'Not Found',
				description: 'The server has not found anything matching the Request-URI.'
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
	let clientIP = $state('');
	let errorDetails = $derived(getErrorDetails(page.status));
	let errorMessage = $derived(
		page.error?.message === `Error: ${page.status}` ? errorDetails.description : page.error?.message
	);

	/**
	 * Fetches the client's IP address
	 */
	async function fetchClientIP(): Promise<void> {
		try {
			const response = await fetch('https://api.ipify.org?format=json');
			const data: { ip: string } = await response.json();
			clientIP = data.ip;
		} catch (error) {
			console.error('Failed to fetch IP:', error);
			clientIP = 'Unknown';
		}
	}

	// Fetch IP address on component mount
	fetchClientIP();
</script>

<div class="min-h-screen bg-background text-foreground">
	<div>
		<div class="er-wrapper pt-6 md:pt-10">
			<h1 class="text-6xl font-normal md:text-7xl">
				<span>Oops!</span>
			</h1>
			<h2 class="mt-2 text-3xl font-light text-muted-foreground">
				{errorDetails.message}
				{page.status}
			</h2>
		</div>

		<div class="er-wrapper">
			<h2 class="mb-2 text-xl font-light md:pt-10">Info:</h2>
			<p class="font-mono text-muted-foreground">
				{errorMessage}
			</p>
		</div>

		<div
			class="er-wrapper mt-7 flex flex-col items-center justify-center border-t border-border py-6 text-center"
		>
			<p class="mb-4 text-sm text-muted-foreground">
				Your IP: {clientIP || 'Loading...'}
			</p>
			<Button variant="outline" onclick={() => history.back()}>Back</Button>
		</div>
	</div>
</div>
