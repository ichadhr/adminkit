// src\routes\test-errors\404\+page.server.ts

import { error } from '@sveltejs/kit';

export function load() {
	error(404);
}
