const CopyWebpackPlugin = require('copy-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const path = require('path')
module.exports = {
    configureWebpack: config => {
        config.entry = {
            content: ["./src/main.js"]
        }
        let plugins = [new CopyWebpackPlugin([{
            from: 'src/*(manifest.json|popup.html|popup.js|favicon.png|background.js)',
            to: './',
            transformPath(targePath, absolutePath) {
                return Promise.resolve(targePath.replace('src/', ''))
            }
        }, {
            from: 'src/images/*',
            to: './',
            transformPath(targePath, absolutePath) {
                return Promise.resolve(targePath.replace('src/', ''))
            }
        }])]

        if (process.env.NODE_ENV === 'production') {
            plugins.push(new ZipPlugin({
                path: path.join(__dirname, './dist'),
                filename: 'dist.zip'
            }))
        }

        return {
            plugins
        }
    },
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
        if (process.env.NODE_ENV === 'production') {
            config.plugins.delete('html')
        }
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    },
    filenameHashing: false,
    css: {
        extract: false
    }
}