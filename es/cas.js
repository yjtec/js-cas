function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Authorized from './Authorized';
import Cas from './Casitl';
import { getPageQuery, urlExcept } from './utils/utils';
import query from './service';
import Cookies from 'js-cookie';
import CasContext from './CasContext';
var cookieKey = 'yjtec-cas-ticket-';
var defaultConfig = {};

var getRedirect = function getRedirect() {
  var pageParams = getPageQuery();
  var redirect = '';

  if (pageParams.redirect) {
    redirect = pageParams.redirect;
  } else {
    redirect = window.location.href;
  }

  redirect = urlExcept('ticket', redirect);
  return encodeURIComponent(redirect);
};

export function getConfig() {
  return defaultConfig;
}
export function setconfig(data) {
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
export function login() {
  var ticket = getTicket();

  if (ticket) {
    Cookies.remove(cookieKey);
  }

  var uri = defaultConfig.loginUri + '?redirect=' + getRedirect();
  window.location.href = uri;
}
export function soc(type, callback) {
  var uri = defaultConfig.loginUri + '/' + type;

  if (callback) {
    uri += "?callback=" + callback;
  }

  window.location.href = uri;
}
export function logout() {
  Cookies.remove(cookieKey);
  window.location.href = defaultConfig.logoutUri + '?redirect=' + getRedirect();
}

var getTicket = function getTicket() {
  return Cookies.get(cookieKey);
};

var filterTicket = function filterTicket(ticket) {
  if (ticket.indexOf('#') !== -1) {
    return ticket.substr(0, ticket.indexOf('#'));
  }

  return ticket;
};

export function checkLogin() {
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
            params = getPageQuery();
            ticket = '';

            if (params.ticket) {
              ticket = filterTicket(params.ticket);
            } else {
              ticket = Cookies.get(cookieKey);
            }

            if (!ticket) {
              _context.next = 17;
              break;
            }

            _context.next = 7;
            return query(action, ticket);

          case 7:
            re = _context.sent;

            if (!(re.errcode == 0 && re.data)) {
              _context.next = 13;
              break;
            }

            Cookies.set(cookieKey, ticket);
            return _context.abrupt("return", Promise.resolve({
              ticket: ticket,
              user: re.data
            }));

          case 13:
            Cookies.remove(cookieKey);
            return _context.abrupt("return", Promise.resolve(false));

          case 15:
            _context.next = 18;
            break;

          case 17:
            return _context.abrupt("return", Promise.resolve(false));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkLogin.apply(this, arguments);
}

export { Authorized, CasContext, getTicket };
export default Cas;