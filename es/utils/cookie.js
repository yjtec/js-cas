import Cookies from 'js-cookie';
var key = 'yjtec-cas-ticket';
export function getTicket() {
  return Cookies.get(key);
}
export function setTicket(data) {
  var endfix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var cookiekey = Cookies.set(key, data);
}
export function removeTicket() {
  Cookies.remove(key);
}