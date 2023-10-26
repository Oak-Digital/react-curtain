import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
    plugins: [
        react(),
        ...(process.env.DISABLE_DTS ? [] : [dts({
            rollupTypes: true,
        })]),
    ],
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'ReactCurtain',
            // the proper extensions will be added
            fileName: 'main',
            formats: ['es', 'umd', 'cjs'],
        },
        rollupOptions: {
            external: [
                'react/jsx-runtime',
                ...Object.keys(pkg.dependencies || {}),
                ...Object.keys(pkg.peerDependencies || {}),
                // TODO: Figure out if this is still needed
            ].filter((dep) => !['@cassiozen/usestatemachine'].includes(dep)),
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    'framer-motion': 'framer-motion',
                },
            },
        },
    },
});
