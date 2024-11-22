import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { page } from '$app/stores';
import { derived } from 'svelte/store';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function formatSegment(segment: string): string {
	return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');
}

// get the page title from the last URL segment
export const pageTitle = derived(page, ($page) => 
	formatSegment($page.url.pathname.split('/').filter(Boolean).pop() || 'Home')
);

// generate breadcrumb items from URL
export const breadcrumbs = derived(page, ($page) => 
	$page.url.pathname
		.split('/')
		.filter((segment) => segment)
		.map((segment, index, array) => ({
			label: formatSegment(segment),
			href: '/' + array.slice(0, index + 1).join('/'),
			isLast: index === array.length - 1
		}))
);