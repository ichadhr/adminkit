// src\hooks.server.ts

import type { Handle } from '@sveltejs/kit';
import type { Theme } from '$lib/stores/theme';

// Augment the App namespace to include the theme property in Locals
declare global {
	namespace App {
		interface Locals {
			theme: Theme;
		}
	}
}

/**
 * Handle function to process incoming requests and inject theme information.
 *
 * @param event - The incoming request event.
 * @param resolve - Function to resolve the request and generate a response.
 * @returns A response with the theme class injected into the HTML during SSR.
 */
export const handle: Handle = async ({ event, resolve }) => {
	// Get the theme cookie value, defaulting to 'light' if not set
	const themeCookie = event.cookies.get('theme') ?? 'light';

	// Ensure the theme is either 'dark' or 'light'
	const theme: Theme = themeCookie === 'dark' ? 'dark' : 'light';

	// Assign the theme to event.locals for use in the app
	event.locals.theme = theme;

	/**
	 * Determine if the response should be an HTML response.
	 * It's true if the request is for the root path ('/') or if the 'Accept' header includes 'text/html'.
	 */
	const isHtmlResponse =
		event.url.pathname === '/' || event.request.headers.get('accept')?.includes('text/html');

	if (isHtmlResponse) {
		return resolve(event, {
			transformPageChunk: ({ html }) =>
				// Inject the theme class into the HTML during SSR
				html.replace('%sveltekit.htmlClasses%', `class="${theme}"`)
		});
	}

	// For non-HTML responses, proceed without transformation
	return resolve(event);
};
