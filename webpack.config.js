const path = require('path');

module.exports = {
    // other configurations...

    module: {
        rules: [
            // other rules...
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'], // Correct loader for SVG files
                include: path.resolve(__dirname, 'src/images'),
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/, // Ensure other image types are handled
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
                include: path.resolve(__dirname, 'src/images'),
            },
            {
                test: /\.scss$/, // Handling SCSS files
                use: [
                    'style-loader', // Injects styles into DOM
                    'css-loader',   // Turns CSS into CommonJS
                    'sass-loader'   // Compiles Sass to CSS
                ],
                include: path.resolve(__dirname, 'src/styles'), // Change the path to where your SCSS files are located
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg', '.scss'], // Added .scss to the extension list
    },
};
