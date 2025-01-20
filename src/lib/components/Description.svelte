<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { toggleMode } from 'mode-watcher';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import CodeXml from 'lucide-svelte/icons/code-xml';
	import SquareArrowOutUpRight from 'lucide-svelte/icons/square-arrow-out-up-right';
</script>

<div class="flex flex-col">
	<div class="prose mb-6 dark:prose-invert prose-p:text-justify">
		<h1 class="text-center">Online file format converter</h1>
		<p>
			Easily convert between popular video, image, and audio file formats — all directly in your browser. For
			example, quickly turn a large MKV video into a compact MP4, or a PNG into a JPEG. Your files stay secure
			since conversions happen entirely client-side, with <strong>no usage limits!</strong>
		</p>
		<p>
			The tool uses a
			<a href="https://github.com/ffmpegwasm/ffmpeg.wasm" target="_blank">WebAssembly port of FFmpeg</a>
			for all client-side conversions. The site itself is built with SvelteKit and styled using TailwindCSS.
		</p>
	</div>

	<div class="flex gap-4">
		<Button variant="outline" onclick={toggleMode}>
			<Moon class="hidden dark:block" />
			<span class="hidden dark:block">Dark theme</span>
			<Sun class="block dark:hidden" />
			<span class="block dark:hidden">Light theme</span>
		</Button>

		<Button variant="outline" href="https://github.com/Plague-Doc/file-converter" class="w-fit" target="_blank">
			<CodeXml /> Source code
		</Button>

		<Button disabled variant="outline" class="w-fit">
			<SquareArrowOutUpRight /> Other projects
		</Button>
	</div>
</div>
