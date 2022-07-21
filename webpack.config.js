const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/client/js/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'assets', 'js'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    },
};