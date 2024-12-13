// src\hooks.server.ts

import type {Handle} from '@sveltejs/kit';

export const handle: Handle = async ({event, resolve}) => {
	const response = await resolve(event);

	// Check if the request is for a CSS file
	if (
		event.url.pathname.endsWith('.css') ||
		event.request.headers.get('Accept')?.includes('text/css')
	) {
		const headers = new Headers(response.headers);
		headers.set('Content-Type', 'text/css');

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers
		});
	}

	return response;
};
