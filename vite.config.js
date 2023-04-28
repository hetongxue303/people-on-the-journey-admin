import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import {fileURLToPath, URL} from "node:url";

export default defineConfig({
    mode: 'development',
    plugins: [
        vue(),
        WindiCSS()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
            '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
            '@layout': fileURLToPath(new URL('./src/layout', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: `@import '@assets/styles/variables.module.scss';`
            }
        }
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        cors: true,
        open: false,
        hmr: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        assetsInlineLimit: 4096,
        cssCodeSplit: true,
        reportCompressedSize: false,
        rollupOptions: {}
    }
})
