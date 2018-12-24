const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    configureWebpack: config => {
        config.entry = {
            content: ["./src/content.js"]
        }
        return {
            plugins: [
                new CopyWebpackPlugin([{
                    from: 'src/*(manifest.json|popup.html|popup.js|favicon.png|background.js|content.css)',
                    to: './',
                    transformPath(targePath, absolutePath) {
                        return Promise.resolve(targePath.replace('src/', ''))
                    }
                }])
            ]
        }
    },
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    },
    filenameHashing: false
}