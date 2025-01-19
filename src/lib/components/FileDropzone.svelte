<script lang="ts">
	import { converter } from '$lib/store.svelte';
	import CloudUpload from 'lucide-svelte/icons/cloud-upload';

	let isDragged = $state(false);
	let errorMessage = $state('');

	async function getFiles(files: File[]) {
		if (!files.every((file) => files[0].type === file.type)) {
			errorMessage = 'Please select only one type of file at a time!';
			return;
		}

		const type = files[0].type.split('/')[0];
		if (type !== 'video' && type !== 'image' && type !== 'audio') {
			errorMessage = 'Selected file type is not supported!';
			return;
		}

		for (const file of files) {
			converter.userFiles.push({
				file: file,
				status: 'base',
				progress: 0
			});
		}
	}

	async function handleFileSelect(event: Event) {
		event.preventDefault();
		const input = event.target as HTMLInputElement;
		if (input.files) {
			await getFiles(Array.from(input.files));
		}
	}

	async function handleFileDrop(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer?.files) {
			await getFiles(Array.from(event.dataTransfer.files));
		}
	}

	async function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragged = true;
	}
</script>

<label
	oninput={handleFileSelect}
	ondrop={handleFileDrop}
	ondragover={handleDragOver}
	ondragleave={() => (isDragged = false)}
	for="file-upload"
	class={[
		'flex h-64 w-full max-w-2xl cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed duration-200 hover:border-muted-foreground hover:duration-100',
		isDragged && 'border-muted-foreground'
	]}>
	<div class="flex flex-col items-center justify-center pb-6 pt-5">
		<CloudUpload class="mb-4 size-12" />
		<p class="mb-2">
			<span class="font-semibold">Click to upload</span>
			or drag and drop
		</p>
		<p class="mb-4 text-sm text-muted-foreground">Supports most popular video, image, and audio file types</p>
		<p class="underline decoration-destructive decoration-2 underline-offset-4">
			{errorMessage}
		</p>
	</div>
	<input multiple id="file-upload" type="file" class="hidden" />
</label>
