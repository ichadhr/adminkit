// src\routes\test-errors\500\+page.server.ts

export function load() {
	throw new Error('Kaboom!');
}
