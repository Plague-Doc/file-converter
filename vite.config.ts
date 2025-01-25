import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const viteServerConfig = {
	name: 'viteServerConfig',
	configureServer(server: any) {
		server.middlewares.use((_req: any, res: any, next: any) => {
			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
			next();
		});
	}
};

export default defineConfig({
	plugins: [sveltekit(), viteServerConfig],
	optimizeDeps: {
		exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
	}
});
