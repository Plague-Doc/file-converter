<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import ArrowRightLeft from 'lucide-svelte/icons/arrow-right-left';
	import X from 'lucide-svelte/icons/x';
	import Download from 'lucide-svelte/icons/download';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { converter } from '$lib/store.svelte';
	import { videoCodecs, imageCodecs, audioCodecs } from '$lib/utils';
	import Progress from './ui/progress/progress.svelte';
	import { fly } from 'svelte/transition';

	let selection = $state('');
	let inProgress = $state(false);

	let codecs: typeof videoCodecs | undefined = $state();
	switch (converter.userFiles[0].file.type.split('/')[0]) {
		case 'video':
			codecs = videoCodecs;
			break;
		case 'image':
			codecs = imageCodecs;
			break;
		case 'audio':
			codecs = audioCodecs;
			break;
	}

	async function convert() {
		inProgress = true;
		const codec = codecs?.get(selection);
		if (!codec) return;
		await converter.transcode(selection.toLowerCase(), codec.mimeType, codec.options);
		inProgress = false;
	}

	async function download(file: File) {
		const url = URL.createObjectURL(file);
		const a = document.createElement('a');
		a.href = url;
		a.download = file.name;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
	<div class="flex gap-2">
		<span class="flex items-center font-medium">Convert into</span>
		<Select.Root type="single" bind:value={selection} disabled={inProgress}>
			<Select.Trigger class="w-40 min-w-fit">
				{selection === '' ? 'Select format' : selection}
			</Select.Trigger>
			<Select.Content>
				{#each codecs! as codec}
					<Select.Item value={codec[0]}>{codec[0]}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex gap-4">
		{#if !converter.loaded}
			<Button class="w-fit" disabled>
				<LoaderCircle class="animate-spin" /> Convert
			</Button>
		{:else}
			<Button class="w-fit" disabled={selection === '' || inProgress} onclick={convert}>
				<ArrowRightLeft /> Convert
			</Button>
		{/if}

		<Button class="w-fit" variant="destructive" onclick={() => converter.reset()}>
			<X /> Cancel
		</Button>
	</div>
</div>

<hr class="mx-auto mt-8 max-w-screen-lg" />

<div class="mx-auto max-w-screen-lg">
	{#each converter.userFiles as userFile, index}
		<div in:fly|global={{ y: 100, duration: 350, delay: 50 + index * 50 }} class="my-4 flex h-10 items-center">
			<div class="flex-1 truncate">
				{userFile.file.name}
			</div>

			<div class="hidden flex-1 sm:flex">
				{#if userFile.status === 'converting'}
					<Progress value={Math.floor(userFile.progress)} max={100} class="mx-4 max-w-96 md:mx-8" />
				{:else if userFile.status === 'done'}
					<Progress value={100} max={100} class="mx-4 max-w-96 md:mx-8" />
				{/if}
			</div>

			{#if userFile.status === 'converting'}
				<Button class="w-32" variant="outline" disabled>
					<LoaderCircle class="animate-spin" />
					{Math.floor(userFile.progress)}%
				</Button>
			{:else if userFile.status === 'error'}
				<span class="underline decoration-destructive decoration-2 underline-offset-4">Conversion error!</span>
			{:else if userFile.status === 'done'}
				<Button class="w-32" variant="outline" onclick={() => download(userFile.file)}>
					<Download /> Download
				</Button>
			{/if}
		</div>
	{/each}
</div>
