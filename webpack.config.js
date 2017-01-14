var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var package = require("./package.json");
var wedding = require('./wedding.config');

var node_env = process.env.NODE_ENV;
var projectName = package.name
var version = package.version;
var buildNumber = process.env.TRAVIS_BUILD_NUMBER;
var buildId = process.env.TRAVIS_BUILD_ID

// A couple of default buildVariables, these are then made available
// within the project.  Make sure they are also declared in typings/config.d.ts
// to let TypeScript know about them.
var buildVariables = {
  'process.env': {
    NODE_ENV: JSON.stringify(node_env)
  },
  'BASENAME': JSON.stringify("/"),
  'GOOGLE_ANALYTICS': JSON.stringify(wedding.analytics),
  'FIREBASE_CONFIG': JSON.stringify(wedding.firebase),
  'VERSION': JSON.stringify(version),
  'BUILD_NUMBER': JSON.stringify(buildNumber),
  'BUILD_ID': JSON.stringify(buildId)
}

// A list of plugins
var plugins = [];

// If it is production
if (node_env === "production") {
  // For production postfix min to the file names
  // projectName += ".min";
  // Add the production plugins
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

// Now that everything is configured, add the plugins
plugins.push(new ExtractTextPlugin("style/" + projectName + ".css", { allChunks: true }))
plugins.push(new webpack.DefinePlugin(buildVariables));

// The remaining webpack config
var config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "scripts/" + projectName + ".js",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".scss", ".css", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'typings-for-css-modules?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      }
    ],

    sassLoader: {
      data: '@import "' + path.resolve(__dirname, 'theme/_theme.scss') + '";'
    },

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  plugins: plugins,
}

module.exports = config;