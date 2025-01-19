<script lang="ts">
	import { fly } from 'svelte/transition';
	import Converter from '$lib/components/Converter.svelte';
	import Description from '$lib/components/Description.svelte';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import { converter } from '$lib/store.svelte';
</script>

{#if !converter.userFiles.length}
	<div in:fly={{ y: 100, duration: 350 }} class="flex justify-center">
		<FileDropzone />
	</div>

	<hr in:fly={{ y: 100, duration: 350, delay: 100 }} class="mx-auto mb-12 mt-16 max-w-3xl" />

	<div in:fly={{ y: 100, duration: 350, delay: 100 }} class="flex justify-center">
		<Description />
	</div>
{:else}
	<div in:fly={{ y: 100, duration: 350 }}>
		<Converter />
	</div>
{/if}
