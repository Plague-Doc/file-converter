<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { converter } from '$lib/store.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();

	onMount(async () => {
		if (!converter.ffmpeg) {
			await converter.load();
		}
	});
</script>

<ModeWatcher />
<main class="container mx-auto px-4 pb-4 pt-8 sm:pb-8 sm:pt-16">
	{@render children()}
</main>
