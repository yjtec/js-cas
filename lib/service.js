"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = query;

var _umiRequest = _interopRequireDefault(require("umi-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function query(_x, _x2) {
  return _query.apply(this, arguments);
}

function _query() {
  _query = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(action, ticket) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _umiRequest.default.post(action, {
              options: {
                method: 'post',
                requestType: 'form',
                data: {
                  ticket: ticket
                }
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _query.apply(this, arguments);
}