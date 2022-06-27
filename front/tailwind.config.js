module.exports = {
    corePlugins: {},
    content: [
        "./src/**/*.{ts,tsx,less}",
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