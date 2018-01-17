const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
export default (config) => {
    // 去处打包后console
    if (process.env.NODE_ENV === 'production') {
        config.plugins.push(
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
        ) 
    }
    return config
}