/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#130D33',
                'secondary': '#231955',
                'accent': '#1F4690',
                'warning': '#E8AA42',
                'light': '#FFE5B4',
            },
        },
    },
    plugins: [],
}