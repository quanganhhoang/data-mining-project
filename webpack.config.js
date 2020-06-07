module.exports = {
    entry: ['babel-polyfill', './manager/frontend/src/static/frontend/main.js'],
    // output: {
    //     path: path.join(__dirname, 'public'),
    //     filename: 'main.js',
    //     publicPath: '/'
    // },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
            },
            {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                loader: 'file-loader',
                },
            ],
            },
            {
            test: /\.css$/,
            use : [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                    sourceMap: true,
                    }
                }
            ]
            },
            {
            test: /\.less$/,
            use: [
                {
                loader: 'style-loader',
                }, {
                loader: 'css-loader', // translates CSS into CommonJS
                }, {
                loader: 'less-loader', // compiles Less to CSS
                options: {
                    lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
                    modifyVars: {
                        'primary-color': '#ff7318',
                        // 'link-color': '#1DA57A',
                        'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                    },
                }
                }
            ]
            }
        ]
    }
}
