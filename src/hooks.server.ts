// src\hooks.server.ts

import type { Handle, HandleServerError } from '@sveltejs/kit';
import type { Theme } from '$lib/stores/theme';

/**
 * Handle function to process incoming requests and inject theme information.
 *
 * @param event - The incoming request event.
 * @param resolve - Function to resolve the request and generate a response.
 * @returns A response with the theme class injected into the HTML during SSR.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const themeCookie = event.cookies.get('theme') ?? 'light';
	const theme: Theme = themeCookie === 'dark' ? 'dark' : 'light';
	event.locals.theme = theme;

	const isHtmlResponse =
		event.url.pathname === '/' || event.request.headers.get('accept')?.includes('text/html');

	if (isHtmlResponse) {
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%sveltekit.htmlClasses%', `class="${theme}"`)
		});
	}

	return resolve(event);
};

/**
 * Global server-side error handler for the application
 * @param params - Error handling parameters
 * @param params.error - The error object thrown during request handling
 * @param params.event - The request event object
 * @param params.status - HTTP status code for the error
 * @param params.message - Error message
 * @returns Formatted error response
 */
export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	return {
		message: error instanceof Error ? error.message : message,
		status: status
	};
};
