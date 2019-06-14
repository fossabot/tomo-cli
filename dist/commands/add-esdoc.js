"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.addEsdoc=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_utils=require("../utils"),_common=require("../utils/common"),_createJsonEditor=_interopRequireDefault(require("../utils/createJsonEditor"));const ESDOC_CONF={source:"./src",destination:"./docs",plugins:[{name:"esdoc-standard-plugin"},{name:"esdoc-ecmascript-proposal-plugin",option:{all:!0}}]},ESDOC_DEPENDENCIES=["esdoc","esdoc-ecmascript-proposal-plugin","esdoc-standard-plugin"],ESDOC_REACT_PLUGINS=["esdoc-jsx-plugin"],EsdocJsonEditor=(0,_createJsonEditor.default)("esdoc.conf.json",ESDOC_CONF),addEsdoc=[{text:"Create esdoc configuration file",task:function(){var a=(0,_asyncToGenerator2.default)(function*(){const a=new EsdocJsonEditor;yield a.create().commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoNotExist)("esdoc.conf.json",".esdoc.json")},{text:"Add documentation tasks to package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*({sourceDirectory:a}){const b=new _utils.PackageJsonEditor;yield b.extend({scripts:{"lint:docs":`eslint . --no-eslintrc --rule valid-jsdoc:error --parser babel-eslint`,predocs:"npm run lint:docs",docs:`esdoc ${a} -r --destination ./docs`,postdocs:"open-cli ./docs/index.html"}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.someDoExist)("package.json")},{text:"Install esdoc dependencies",task:({skipInstall:a})=>(0,_utils.install)([...ESDOC_DEPENDENCIES,"open-cli"],{dev:!0,skipInstall:a}),condition:({isNotOffline:a})=>a&&(0,_common.someDoExist)("package.json")},{text:"Install esdoc React plugins",task:({skipInstall:a})=>(0,_utils.install)(ESDOC_REACT_PLUGINS,{dev:!0,skipInstall:a}),condition:({isNotOffline:a,useReact:b})=>a&&b&&(0,_common.someDoExist)("package.json"),optional:({useReact:a})=>a},{text:"Add esdoc React plugin to configuration file",task:function(){var a=(0,_asyncToGenerator2.default)(function*(){const{plugins:a}=ESDOC_CONF,b=new EsdocJsonEditor;yield b.extend({plugins:[...a,{name:"esdoc-jsx-plugin",options:{enable:!0}}]}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:({useReact:a})=>a&&(0,_common.someDoExist)("esdoc.conf.json"),optional:({useReact:a})=>a}];exports.addEsdoc=addEsdoc;var _default=addEsdoc;exports.default=_default;