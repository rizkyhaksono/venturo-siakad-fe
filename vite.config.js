import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import path from "path";
import commonjs from "vite-plugin-commonjs";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import cryptoBrowserify from 'crypto-browserify';
import buffer from 'buffer';

const filename = fileURLToPath(import.meta.url);
const pathSegments = path.dirname(filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        css: {
            postcss: {
                plugins: [tailwind(), autoprefixer()],
            },
        },
        plugins: [vue(), commonjs()],
        define: {
            'process.env': {},
        },
        resolve: {
            fallback: {
                crypto: cryptoBrowserify,
                buffer: buffer,
            },
            alias: {
                "@": path.resolve(pathSegments, "./src"),
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
        },
        optimizeDeps: {
            include: ["quill", "@ckeditor/ckeditor5-vue", "@ckeditor/ckeditor5-build-classic"],
        },
        preview: {
            port: parseInt(env.VITE_APP_PREVIEW_PORT) || 8081,
            strictPort: true,
            host: '0.0.0.0',
            allowedHosts: true,
        },
        server: {
            port: parseInt(env.VITE_APP_PORT) || 8080,
            allowedHosts: ['venturo.siakad.fe.natee.my.id']
        },
    };
});
