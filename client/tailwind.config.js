/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                main: "#F44B87",
                "#7aafff": "#7aafff"
            },
            backgroundColor: {
                main: "#F44B87",
                "#f0f6ff": "#f0f6ff"
            }
        }
    },
    plugins: []
};
