
module.exports = {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        "transform-remove-console",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    }
  },
  "publicPath": "/",
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  "hash": true,
  "theme": {
      "@primary-color": "#F4682A",
      "@font-size-base": "14px",
      "@link-color": "#419EE7",
  }
}
