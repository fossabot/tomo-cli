"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.removeParcel=exports.addParcel=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_utils=require("../utils"),_common=require("../utils/common");const BUILD_DEPENDENCIES=["del-cli"],PARCEL_DEPENDENCIES=["parcel-bundler","parcel-plugin-purgecss"],addParcel=[{text:"Add Parcel build tasks to package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*({assetsDirectory:a,outputDirectory:b}){yield new _utils.PackageJsonEditor().extend({scripts:{"clean:build":`del-cli ${b}`,"prebuild:es":"npm run clean:build","build:es":`parcel build --out-dir ${b} --public-url ./ ${a}/index.html`,"prewatch:es":"npm run clean:build","watch:es":`parcel watch --out-dir ${b} --public-url ./ ${a}/index.html`,start:`parcel ${a}/index.html --out-dir ${b} --open`}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.someDoExist)("package.json")},{text:"Install development dependencies and add dev task to package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*({skipInstall:a}){yield(0,_utils.install)(["stmux"],{dev:!0,skipInstall:a}),yield new _utils.PackageJsonEditor().extend({scripts:{dev:"stmux [ \"npm run watch:es\" : \"npm run lint:ing\" ]"}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("package.json",".eslintrc.js"),optional:()=>(0,_common.allDoExistSync)("package.json",".eslintrc.js")},{text:"Create PurgeCSS config file",task:function(){var a=(0,_asyncToGenerator2.default)(function*({assetsDirectory:a}){yield new _utils.PurgecssConfigEditor().create().extend({content:[`'${a}/index.html'`]}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoNotExist)("purgecss.config.js")},{text:"Install Parcel development dependencies",task:({skipInstall:a})=>(0,_utils.install)([...BUILD_DEPENDENCIES,...PARCEL_DEPENDENCIES],{dev:!0,skipInstall:a}),condition:({isNotOffline:a})=>a&&(0,_common.someDoExist)("package.json")}];exports.addParcel=addParcel;const removeParcel=[{text:"Remove Parcel build tasks from package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*(){yield new _utils.PackageJsonEditor().extend({scripts:{"clean:build":void 0,dev:void 0,"prebuild:es":void 0,"build:es":void 0,"prewatch:es":void 0,"watch:es":void 0,start:void 0}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.someDoExist)("package.json")},{text:"Delete PurgeCSS config file",task:function(){var a=(0,_asyncToGenerator2.default)(function*(){yield new _utils.PurgecssConfigEditor().delete().commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.someDoExist)("purgecss.config.js")},{text:"Uninstall Parcel dependencies",task:()=>(0,_utils.uninstall)([...BUILD_DEPENDENCIES,...PARCEL_DEPENDENCIES,"stmux"]),condition:({skipInstall:a})=>!a&&(0,_common.someDoExist)("package.json")&&new _utils.PackageJsonEditor().hasAll(...PARCEL_DEPENDENCIES),optional:({skipInstall:a})=>!a}];exports.removeParcel=removeParcel;var _default=addParcel;exports.default=_default;