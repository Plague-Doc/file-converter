<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { converter } from '$lib/store.svelte';

	let { children } = $props();

	onMount(async () => {
		if (!converter.ffmpeg) {
			await converter.load();
		}
	});
</script>

<main class="container mx-auto px-2 pt-16">
	{@render children()}
</main>
