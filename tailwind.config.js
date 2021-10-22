const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    mode: 'jit',
    theme: {
        colors: {
            // Build your palette here
            transparent: 'transparent',
            current: 'currentColor',
            gray: colors.blueGray,
            red: colors.red,
            blue: colors.sky,
            yellow: colors.amber,
            white: colors.white,
            indigo: colors.indigo,
            green: colors.green,
            'gray-850': '#1b2430',
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
