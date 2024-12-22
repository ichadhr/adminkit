// src/lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(...inputs));
}

function formatSegment(segment: string): string {
	return segment
		.split(/[-_]/)
		.map((word, index) => {
			if (word === '&') return '&';
			// Only capitalize the first letter if it's the first word or contains '&'
			return index === 0 || segment.includes('&')
				? word.charAt(0).toUpperCase() + word.slice(1)
				: word.toLowerCase();
		})
		.join(' ');
}

// Functions to get page title and breadcrumbs from pathname
export function getPageTitle(pathname: string): string {
	return formatSegment(pathname.split('/').filter(Boolean).pop() || 'Home');
}

export function getBreadcrumbs(pathname: string) {
	return pathname
		.split('/')
		.filter((segment) => segment)
		.map((segment, index, array) => ({
			label: formatSegment(segment),
			href: '/' + array.slice(0, index + 1).join('/'),
			isLast: index === array.length - 1
		}));
}
