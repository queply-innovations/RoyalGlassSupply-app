import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
