const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let entry = path.resolve(__dirname, './src/index.jsx');
let filename = 'bundle.js';

module.exports = (env, argv) => {
    const minimize = !(typeof argv.mode !== 'undefined' && argv.mode === 'development');

    if (typeof env !== 'undefined' && env.mobile === 'true') {
        entry = path.resolve(__dirname, './src/mobile/index.jsx');
        filename = 'mobileBundle.js';
    }

    return {
        mode: 'production',
        entry: entry,
        output: {
            filename: '[name].' + filename,
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.jsx?/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            comments: false,
                            presets: [
                                ['@babel/preset-env', {targets: '> .15%'}],
                                '@babel/preset-react'
                            ]
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'autoprefixer',
                                            {'grid': 'autoplace'}
                                        ]
                                    ]
                                }
                            }
                        },
                        {loader: 'sass-loader'}
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            })
        ],
        optimization: {
            minimize: minimize,
            minimizer: [
                `...`,
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }]
                    }
                })
            ]
        }
    };
};
