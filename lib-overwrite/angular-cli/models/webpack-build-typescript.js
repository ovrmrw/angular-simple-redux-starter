"use strict";
var webpack = require('webpack'); // ADDED
var path = require('path');
var webpack_1 = require('@ngtools/webpack');
var g = global;
var webpackLoader = g['angularCliIsLocal']
  ? g.angularCliPackages['@ngtools/webpack'].main
  : '@ngtools/webpack';
exports.getWebpackNonAotConfigPartial = function (projectRoot, appConfig) {
  var exclude = ['**/*.spec.ts'];
  if (appConfig.test) {
    exclude.push(path.join(projectRoot, appConfig.root, appConfig.test));
  }
  ;
  return {
    module: {
      rules: [
        {
          test: /\.ts$/,
          // loader: webpackLoader,
          loaders: ['light-ts-loader', 'angular2-template-loader?keepUrl=true'], // EDITED
          exclude: [/\.(spec|e2e)\.ts$/]
        }
      ]
    },
    plugins: [
      new webpack_1.AotPlugin({
        tsConfigPath: path.resolve(projectRoot, appConfig.root, appConfig.tsconfig),
        mainPath: path.join(projectRoot, appConfig.root, appConfig.main),
        exclude: exclude,
        skipCodeGeneration: true
      }),
      new webpack.LoaderOptionsPlugin({ // ADDED
        tsConfigPath: path.resolve(projectRoot, appConfig.root, appConfig.tsconfig),
      })
    ]
  };
};
exports.getWebpackAotConfigPartial = function (projectRoot, appConfig, i18nFile, i18nFormat, locale) {
  var exclude = ['**/*.spec.ts'];
  if (appConfig.test) {
    exclude.push(path.join(projectRoot, appConfig.root, appConfig.test));
  }
  ;
  return {
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: webpackLoader,
          exclude: [/\.(spec|e2e)\.ts$/]
        }
      ]
    },
    plugins: [
      new webpack_1.AotPlugin({
        tsConfigPath: path.resolve(projectRoot, appConfig.root, appConfig.tsconfig),
        mainPath: path.join(projectRoot, appConfig.root, appConfig.main),
        i18nFile: i18nFile,
        i18nFormat: i18nFormat,
        locale: locale,
        exclude: exclude
      })
    ]
  };
};
//# sourceMappingURL=/Users/hansl/Sources/angular-cli/packages/angular-cli/models/webpack-build-typescript.js.map