// src\routes\+layout.server.ts

import type { LayoutServerLoad } from './$types';

/**
 * Server-side load function to provide the theme to the client.
 */
export const load: LayoutServerLoad = async ({ cookies, getClientAddress }) => {
	// Retrieve the theme from cookies or default to 'light'
	const theme = cookies.get('theme') === 'dark' ? 'dark' : 'light';
	const clientIP = getClientAddress();

	return {
		theme,
		clientIP
	};
};
