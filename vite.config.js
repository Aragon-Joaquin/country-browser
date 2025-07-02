import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				browse: resolve(__dirname, '/pages/browse.html')
			}
		}
	}
})
