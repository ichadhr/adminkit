// src\routes\+page.server.js

import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(307, '/dashboard');
}
