const path = require('path');

module.exports = {
    entry: './src/JS/lotePiloto.js',
    module: {
        rules: [
            {
                test: [/\.m?js$/, /\.m?ts$/],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: []
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map'
};