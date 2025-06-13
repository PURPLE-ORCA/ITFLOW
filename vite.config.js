import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    define: {
        global: {}, // Define global as an empty object
        process: {
            env: {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),


    ],
    resolve: {
        alias: {
            '@': '/resources/js', // Ensure this alias matches your imports
        },
    },
    css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "./resources/css/Animation.css";`,
          },
        },
      },
});
