import Cookies from 'js-cookie';
var key = 'yjtec-cas-ticket';
export function getTicket() {
  return Cookies.get(key);
}
export function setTicket(data) {
  Cookies.set(key, data);
}
export function removeTicket() {
  Cookies.remove(key);
}