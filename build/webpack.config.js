const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// var GitRevisionPlugin = require('git-revision-webpack-plugin');
// var gitRevisionPlugin = new GitRevisionPlugin();

function resolve(dir) {
    return path.join(__dirname, '../', dir)
}

function src(dir) {
    return resolve(path.join('src', dir))
}

function getEntry(globPath, pathDir) {
    const files = glob.sync(globPath);
    let entries = {}, entry, dirname, basename, pathname, extname;
    for (let i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        entries[basename] = entry;
    }
    return entries;
}

const htmls = getEntry('./src/pages/*/*.jsx', 'src/pages/');
const entries = {};
const HtmlPlugin = [];
for (let key in htmls) {
    let ekey = key.split('.')[0];
    entries[key] = './src/pages/' + ekey + '/' + ekey + '.jsx';
    HtmlPlugin.push(new HtmlWebpackPlugin({
        filename: key + '.html',
        template: src('common/templates/template.html'),
        inject: true,
        chunks: ['manifest', 'vendor', key],
        minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeComments: true,
        },
        favicon: src('favicon.ico'),
        chunksSortMode: 'dependency'
    }))
}

module.exports = {
    entry: entries,
    target: 'web',
    output: {
        path: resolve('dist'),
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            MOCK: !!process.env.MOCK
            // CODE_VERSION: `"${gitRevisionPlugin.commithash()}"`
        })
    ].concat(HtmlPlugin),
    resolve: {
        alias: {
            'network': src('network'),
            'actions': src('actions'),
            'containers': src('containers'),
            'components': src('components'),
            'common': src('common'),
            'utils': src('utils'),
            'assets': src('assets'),
            'pages': src('pages'),
            'layouts': src('layouts'),
            'libs': src('libs')
        },
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.css?$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader']
            },
            {
                test: /\.less?$/,
                exclude: /node_modules/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
                        localIdentName: '[local]___[hash:base64:5]'
                    }
                }, 'postcss-loader', 'less-loader']
            },
            {
                test: /\.less?$/,
                exclude: /src/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                    }
                }, 'postcss-loader', 'less-loader']
            }
        ]
    }
};
