"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.addBabel=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_utils=require("../utils"),_common=require("../utils/common");const BABEL_CORE=["@babel/cli","@babel/core","@babel/runtime"],BABEL_PRESETS=["@babel/preset-env","babel-preset-minify"],BABEL_PLUGINS=["@babel/plugin-transform-runtime","@babel/plugin-proposal-class-properties","@babel/plugin-proposal-export-default-from","@babel/plugin-proposal-optional-chaining"],BABEL_REACT_PLUGINS=["react-hot-loader"],BABEL_REACT_PRESETS=["@babel/preset-react"],BABEL_DEPENDENCIES=[...BABEL_CORE,...BABEL_PRESETS,...BABEL_PLUGINS],addBabel=[{text:"Create Babel config file",task:function(){var a=(0,_asyncToGenerator2.default)(function*(){yield new _utils.BabelConfigModuleEditor().create().commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoNotExist)("babel.config.js",".babelrc",".babelrc.js")},{text:"Add Babel build task to package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*({outputDirectory:a,sourceDirectory:b}){yield new _utils.PackageJsonEditor().extend({scripts:{"build:es":`babel ${b} --out-dir ${a}`,"watch:es":`watch 'npm run build:es' ${b}`}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("package.json")},{text:"Install Babel core, CLI, presets, and plugins",task:({skipInstall:a})=>(0,_utils.install)(BABEL_DEPENDENCIES,{dev:!0,skipInstall:a}),condition:({isNotOffline:a})=>a&&!new _utils.PackageJsonEditor().hasAll(...BABEL_DEPENDENCIES)&&(0,_common.allDoExist)("package.json")},{text:"Install Babel React presets and plugins",task:({skipInstall:a})=>(0,_utils.install)([...BABEL_REACT_PRESETS,...BABEL_REACT_PLUGINS],{dev:!0,skipInstall:a}),condition:({isNotOffline:a,useReact:b})=>a&&b&&(0,_common.allDoExist)("package.json"),optional:({useReact:a})=>a},{text:"Add React support to Babel configuration file",task:function(){var a=(0,_asyncToGenerator2.default)(function*({useRollup:a}){const b=a=>`'${a}'`,c=a=>"react-hot-loader"===a?"react-hot-loader/babel":a,d=[...BABEL_PLUGINS,...BABEL_REACT_PLUGINS].filter(b=>!a||"react-hot-loader"!==b).map(a=>{var d,e;return d=(e=a,c(e)),b(d)}),e=[...BABEL_PRESETS,...BABEL_REACT_PRESETS].map(b);yield new _utils.BabelConfigModuleEditor().extend({plugins:d,presets:e}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:({useReact:a})=>a&&(0,_common.allDoExist)("babel.config.js"),optional:({useReact:a})=>a}];exports.addBabel=addBabel;var _default=addBabel;exports.default=_default;