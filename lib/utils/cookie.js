"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTicket = getTicket;
exports.setTicket = setTicket;
exports.removeTicket = removeTicket;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = 'yjtec-cas-ticket';

function getTicket() {
  return _jsCookie.default.get(key);
}

function setTicket(data) {
  _jsCookie.default.set(key, data);
}

function removeTicket() {
  _jsCookie.default.remove(key);
}