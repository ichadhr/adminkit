// src\routes\test-errors\403\+page.server.ts

import { error } from '@sveltejs/kit';

export function load() {
	error(403);
}
