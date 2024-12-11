import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 9875, 
    },
    build: {
        outDir: 'dist',
    },
    optimizeDeps: {
        include: ["@babel/preset-env"],
    }
});