module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            transitionProperty: {
                'width': 'width',
                'height': 'height',

            }
        },
    },
    plugins: [require('@tailwindcss/line-clamp'),],
}