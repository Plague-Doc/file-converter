<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SquareArrowOutUpRight from 'lucide-svelte/icons/square-arrow-out-up-right';
</script>

<div class="prose mb-16 dark:prose-invert prose-p:text-justify">
	<h1 class="text-center">Online file format converter</h1>
	<p>
		Easily convert between popular video, image, and audio file formats — all directly in your browser. For example,
		quickly turn a large MKV video into a compact MP4, or a PNG into a JPEG. Your files stay secure since
		conversions happen entirely client-side, with <strong>no usage limits!</strong>
	</p>
	<p>
		The tool uses a
		<a href="https://github.com/ffmpegwasm/ffmpeg.wasm" target="_blank">WebAssembly port of FFmpeg</a>
		for all client-side conversions. The site itself is built with SvelteKit and styled using TailwindCSS.
	</p>
	<Button variant="outline" href="https://github.com/Plague-Doc/file-converter" class="no-underline" target="_blank">
		<SquareArrowOutUpRight /> Check out the source code!
	</Button>
</div>
