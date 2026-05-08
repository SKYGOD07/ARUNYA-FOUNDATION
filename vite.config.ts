import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        // Code splitting — separate vendor chunks for better caching
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/react-router')) {
                        return 'vendor-react';
                    }
                    if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
                        return 'vendor-motion';
                    }
                    if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
                        return 'vendor-icons';
                    }
                    if (id.includes('node_modules/firebase')) {
                        return 'vendor-firebase';
                    }
                    if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
                        return 'vendor-3d';
                    }
                    if (id.includes('node_modules/gsap')) {
                        return 'vendor-gsap';
                    }
                },
            },
        },
        // Performance budgets
        chunkSizeWarningLimit: 500,
        // Minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        // Asset optimization
        assetsInlineLimit: 4096,
        // CSS code splitting
        cssCodeSplit: true,
        // Source maps off in production for smaller bundles
        sourcemap: false,
    },
    // CSS optimization
    css: {
        devSourcemap: true,
    },
    // Dependency pre-bundling
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
    },
})
