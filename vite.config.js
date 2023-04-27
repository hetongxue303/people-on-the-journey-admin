import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from "path";

export default defineConfig({
    mode: 'development',
    plugins: [
        vue(),
        WindiCSS()
    ],
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: `@import '@assets/styles/variables.scss';`
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@components': path.resolve(__dirname, './src/components'),
            '@views': path.resolve(__dirname, './src/views')
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
