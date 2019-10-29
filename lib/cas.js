"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = getConfig;
exports.setconfig = setconfig;
exports.login = login;
exports.logout = logout;
exports.checkLogin = checkLogin;
Object.defineProperty(exports, "Authorized", {
  enumerable: true,
  get: function get() {
    return _Authorized.default;
  }
});
Object.defineProperty(exports, "CasContext", {
  enumerable: true,
  get: function get() {
    return _CasContext.default;
  }
});
exports.default = exports.getTicket = void 0;

var _Authorized = _interopRequireDefault(require("./Authorized"));

var _Casitl = _interopRequireDefault(require("./Casitl"));

var _utils = require("./utils/utils");

var _service = _interopRequireDefault(require("./service"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _CasContext = _interopRequireDefault(require("./CasContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cookieKey = 'yjtec-cas-ticket-';
var defaultConfig = {};

var getRedirect = function getRedirect() {
  var redirect = window.location.href;
  redirect = (0, _utils.urlExcept)('ticket', redirect);
  return encodeURI(redirect);
};

function getConfig() {
  return defaultConfig;
}

function setconfig(data) {
  var env = data.env,
      type = data.type;
  var uri = 'http://cas.360vrsh.com';

  if (env === 'local') {
    uri = 'http://local.cas.360vrsh.com';
  }

  if (env === 'test') {
    uri = 'http://test.cas.360vrsh.com';
  }

  if (env === 'dev') {
    uri = "http://dev.cas.360vrsh.com";
  }

  cookieKey += type;
  defaultConfig = _objectSpread({}, data, {
    loginUri: uri + '/login/' + type,
    logoutUri: uri + '/logout/' + type
  });
}

function login() {
  var ticket = getTicket();

  if (ticket) {
    _jsCookie.default.remove(cookieKey);
  }

  var uri = defaultConfig.loginUri + '?redirect=' + getRedirect();
  window.location.href = uri;
}

function logout() {
  _jsCookie.default.remove(cookieKey);

  window.location.href = defaultConfig.logoutUri + '?redirect=' + getRedirect();
}

var getTicket = function getTicket() {
  return _jsCookie.default.get(cookieKey);
};

exports.getTicket = getTicket;

function checkLogin() {
  return _checkLogin.apply(this, arguments);
}

function _checkLogin() {
  _checkLogin = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _defaultConfig, action, type, params, ticket, re;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _defaultConfig = defaultConfig, action = _defaultConfig.action, type = _defaultConfig.type;
            params = (0, _utils.getPageQuery)();
            ticket = params.ticket || _jsCookie.default.get(cookieKey);

            if (!ticket) {
              _context.next = 16;
              break;
            }

            _context.next = 6;
            return (0, _service.default)(action, ticket);

          case 6:
            re = _context.sent;

            if (!(re.errcode == 0 && re.data)) {
              _context.next = 12;
              break;
            }

            _jsCookie.default.set(cookieKey, ticket);

            return _context.abrupt("return", Promise.resolve({
              ticket: ticket,
              user: re.data
            }));

          case 12:
            _jsCookie.default.remove(cookieKey);

            return _context.abrupt("return", Promise.resolve(false));

          case 14:
            _context.next = 17;
            break;

          case 16:
            return _context.abrupt("return", Promise.resolve(false));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkLogin.apply(this, arguments);
}

var _default = _Casitl.default;
exports.default = _default;