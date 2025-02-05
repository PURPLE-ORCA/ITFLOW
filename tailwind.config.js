import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],


    theme: {
        extend: {
          transformStyle: {
            "3d": "preserve-3d",
          },
          perspective: {
            "50em": "50em",
          },
          boxShadow: {
            "inner-glow": "inset 0 0 0.5em #000d",
            "inner-glow-blue": "inset 0 0 0.5em rgba(34, 0, 249, 0.936), 0 0 5px #000000",
          },
        },
      },

    plugins: [forms],
};
