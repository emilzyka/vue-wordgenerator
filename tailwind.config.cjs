/** @type {import('tailwindcss').Config} */
const { createThemes } = require('tw-colors');

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        createThemes({
            dark: {
                main: '#23a9d5',
                sub: '#4b5975',
                text: '#ccccb5',
                bg: '#1b2028',
            },
            forest: {
                main: '#66ac92',
                sub: '#015c53',
                text: '#dceae5',
                bg: '#0b1e1a',
            },
            sea: {
                main: '#4a6fb5',
                sub: '#50688c',
                text: '#9393a7',
                bg: '#191826',
            },
            light: {
                main: '#40d672',
                sub: '#d5d5d5',
                text: '#1d221f',
                bg: '#fff',
            },
        }),
    ],
};
