// src\routes\test-errors\404\+page.server.ts

import { error } from '@sveltejs/kit';

export function load() {
	throw error(404, 'Page Not Found');
}
