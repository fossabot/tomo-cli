"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.removeWebpack=exports.addWebpack=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_path=require("path"),_utils=require("../utils"),_common=require("../utils/common");const BUILD_DEPENDENCIES=["cpy-cli","del-cli","npm-run-all"],WEBPACK_DEPENDENCIES=["webpack","webpack-cli","webpack-dashboard","webpack-jarvis","webpack-dev-server","babel-loader","terser-webpack-plugin"],addWebpack=[{text:"Create Webpack configuration file",task:function(){var a=(0,_asyncToGenerator2.default)(function*({outputDirectory:a,sourceDirectory:b,useReact:c}){const d={modules:`[resolve(__dirname, '${b}'), 'node_modules']`,extensions:`[${c?`'.js', '.jsx'`:`'.js'`}]`};yield new _utils.WebpackConfigEditor().create().prepend(`const TerserPlugin = require('terser-webpack-plugin');`).prepend(`const DashboardPlugin = require('webpack-dashboard/plugin');`).prepend(`const {resolve} = require('path');`).prepend(`/* eslint-env node */`).extend({devServer:{contentBase:`'${a}'`,compress:!0,watchContentBase:!0},entry:{app:`'${b}/main.js'`},optimization:{minimize:!0,minimizer:`[new TerserPlugin()]`},resolve:d}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoNotExist)("webpack.config.js")},{text:"Add Webpack build tasks to package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*({assetsDirectory:a,outputDirectory:b,sourceDirectory:c}){const d={copy:"npm-run-all --parallel copy:assets copy:index","copy:assets":`cpy '${a}/!(css)/**/*.*' '${a}/**/[.]*' ${b} --parents --recursive`,"copy:index":`cpy '${a}/index.html' ${b}`,"watch:assets":`watch 'npm run copy' ${a}`,"prebuild:es":`del-cli ${(0,_path.join)(b,a)}`,"build:es":"webpack","postbuild:es":"npm run copy","watch:es":`watch 'npm run build:es' ${c}`,dashboard:"webpack-dashboard -- webpack-dev-server --config ./webpack.config.js"};yield new _utils.PackageJsonEditor().extend({scripts:d}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("package.json")},{text:"Install development dependencies and add dev task to package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*({skipInstall:a}){yield(0,_utils.install)(["stmux"],{dev:!0,skipInstall:a}),yield new _utils.PackageJsonEditor().extend({scripts:{dev:"stmux [ \"npm run dashboard\" : \"npm run lint:ing\" ]"}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("package.json",".eslintrc.js"),optional:()=>(0,_common.allDoExistSync)("package.json",".eslintrc.js")},{text:"Install Webpack and development dependencies",task:({skipInstall:a})=>(0,_utils.install)([...BUILD_DEPENDENCIES,...WEBPACK_DEPENDENCIES],{dev:!0,skipInstall:a}),condition:({isNotOffline:a})=>a&&(0,_common.someDoExist)("package.json")}];exports.addWebpack=addWebpack;const removeWebpack=[{text:"Delete Webpack configuration file",task:function(){var a=(0,_asyncToGenerator2.default)(function*(){yield new _utils.WebpackConfigEditor().delete().commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("webpack.config.js")},{text:"Remove Webpack build tasks from package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*(){yield new _utils.PackageJsonEditor().extend({scripts:{copy:void 0,"copy:assets":void 0,"copy:index":void 0,"watch:assets":void 0,dev:void 0,"prebuild:es":void 0,"build:es":void 0,"postbuild:es":void 0,"watch:es":void 0,dashboard:void 0}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("package.json")},{text:"Uninstall Webpack dependencies",task:()=>(0,_utils.uninstall)([...BUILD_DEPENDENCIES,...WEBPACK_DEPENDENCIES,"stmux"]),condition:({skipInstall:a})=>!a&&(0,_common.someDoExist)("package.json")&&new _utils.PackageJsonEditor().hasAll(...WEBPACK_DEPENDENCIES),optional:({skipInstall:a})=>!a}];exports.removeWebpack=removeWebpack;var _default=addWebpack;exports.default=_default;