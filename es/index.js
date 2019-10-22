function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { join, dirname, basename } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import Mustache from 'mustache';
export default function (api) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = api.config,
      paths = api.paths;
  api.onOptionChange(function () {
    api.rebuildTmpFiles();
  });
  api.addRuntimePluginKey('cas');
  api.addRendererWrapperWithComponent(function () {
    var wrapperTpl = readFileSync(join(__dirname, '../template/wrapper.jsx.tpl'), 'utf-8');
    var wrapperContent = Mustache.render(wrapperTpl, _objectSpread({}, opts));
    var wrapperPath = join(paths.absTmpDirPath, './CasWrapper.jsx');
    writeFileSync(wrapperPath, wrapperContent, 'utf-8');
    return wrapperPath;
  });
  api.modifyAFWebpackOpts(function (memo) {
    return _objectSpread({}, memo, {
      alias: _objectSpread({}, memo.alias || {}, {
        'yjtec-cas': join(__dirname, './cas.js')
      })
    });
  });
}