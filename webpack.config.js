const path = require('path');

module.exports = {
    context: __dirname,
    entry: './frontend/scenius.jsx',
    output: {
        path: path.join(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
    devtool: "eval-source-map",
    target: 'node', 
    externals: {
        "request": "request" 
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/env', '@babel/react']
                }
            }
        ]
    }
};