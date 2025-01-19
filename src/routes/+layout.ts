import { converter } from '$lib/store.svelte';
import type { LayoutLoad } from './$types';
export const prerender = true;

export const load = (async () => {
	return {};
}) satisfies LayoutLoad;
