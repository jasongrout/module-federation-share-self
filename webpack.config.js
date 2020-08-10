const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

const data = require("./package.json");


module.exports = {
  entry: {},
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname,
        "dist"),
    port: 3003,
    },
  output: {
    publicPath: "http://localhost:3003/",
    filename: '[name].[chunkhash].js',
    library: {
      type: "var", name: "LIBRARY_NAME"
          },
    },
  plugins: [
    new ModuleFederationPlugin({
      name: "MODULE_FEDERATION_NAME",
      library: {
        type: "var", name: "LIBRARY_NAME"
            },
      filename: "remoteEntry.js",
      exposes: {
        // value should be pulled from package.json as the main package entry point
                "./LAB_ENTRY_POINT": `./${path.join(data.main)}`,
            },
      shared: {
        [data.name]: {
            // shareKey: "module-federation-share-self",
            version: data.version,
            singleton: true,
            // value pulled from package.json, the main package entry point
            import: `./${path.join(data.main)}`
          },
            "react": { singleton: true }
        },
      })
    ],
};
