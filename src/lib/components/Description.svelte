<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { toggleMode } from 'mode-watcher';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import CodeXml from 'lucide-svelte/icons/code-xml';
	import SquareArrowOutUpRight from 'lucide-svelte/icons/square-arrow-out-up-right';
</script>

<div class="flex flex-col">
	<div class="prose-sm mb-6 dark:prose-invert sm:prose prose-p:text-justify">
		<h1 class="text-center font-semibold sm:font-bold">Online file format converter</h1>
		<p>
			Easily convert between popular video, image, and audio file formats — all directly in your browser. For
			example, quickly turn a large MKV video into a compact MP4, or a PNG into a JPEG. Your files stay secure
			since conversions happen entirely client-side, with <strong>no usage limits!</strong>
		</p>
		<p>
			This tool uses a
			<a href="https://github.com/ffmpegwasm/ffmpeg.wasm" target="_blank">WebAssembly port of FFmpeg</a>
			for all client-side conversions. The site itself is built with SvelteKit and styled using TailwindCSS.
		</p>
	</div>

	<div class="flex flex-wrap items-center justify-center gap-4 sm:mt-2">
		<div in:fade={{ duration: 350, delay: 200 }}>
			<Button variant="outline" onclick={toggleMode}>
				<Moon class="hidden dark:block" />
				<Sun class="block dark:hidden" />
				<span class="hidden dark:block">Dark theme</span>
				<span class="block dark:hidden">Light theme</span>
			</Button>
		</div>

		<div in:fade={{ duration: 350, delay: 300 }}>
			<Button variant="outline" href="https://github.com/Plague-Doc/file-converter" class="w-fit" target="_blank">
				<CodeXml /> Source code
			</Button>
		</div>

		<div in:fade={{ duration: 350, delay: 400 }}>
			<Button disabled variant="outline" class="w-fit">
				<SquareArrowOutUpRight /> Other projects
			</Button>
		</div>
	</div>
</div>
