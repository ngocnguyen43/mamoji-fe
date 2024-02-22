import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return Buffer.from(id.toString().split('node_modules/')[1].split('/')[0].toString()).toString('base64');
					}
				},
			},
		}
	}
});
