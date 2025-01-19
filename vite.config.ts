import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const viteServerConfig = {
	name: 'viteServerConfig',
	configureServer(server: any) {
		server.middlewares.use((_req: any, res: any, next: any) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET');
			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
			res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
			next();
		});
	}
};

export default defineConfig({
	plugins: [sveltekit(), viteServerConfig],
	optimizeDeps: {
		exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
	},
	server: {
		headers: {
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'credentialless'
		}
	}
});
