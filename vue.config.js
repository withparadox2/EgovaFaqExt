const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    configureWebpack: config => {
        config.entry = {
            content: ["./src/main.js"]
        }
        return {
            plugins: [
                new CopyWebpackPlugin([{
                    from: 'src/*(manifest.json|popup.html|popup.js|favicon.png|background.js)',
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