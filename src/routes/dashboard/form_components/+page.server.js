// src\routes\dashboard\form_components\+page.server.js

import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(307, '/dashboard/form_components/input');
}
