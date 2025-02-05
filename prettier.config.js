// prettier.config.js
module.exports = {
    // Number of spaces per indentation level
    tabWidth: 4,

    // Use single quotes instead of double quotes where possible
    singleQuote: true,

    // Keep the closing bracket of JSX tags on the same line
    bracketSameLine: true,

    semi: true, // Add a semicolon at the end of statements

    arrowParens: 'always', // Include parentheses around a sole arrow function parameter

    // Print trailing commas wherever possible (e.g., in objects, arrays, etc.)
    trailingComma: 'es5',

    // Include Prettier plugin for Tailwind CSS class sorting
    plugins: [require.resolve('prettier-plugin-tailwindcss')],

    // Configure Tailwind-specific attributes for sorting classes
    tailwindAttributes: ['className'],
};
