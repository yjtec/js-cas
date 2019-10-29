import Cookies from 'js-cookie';
const key = 'yjtec-cas-ticket';
export function getTicket(){
  return Cookies.get(key);
}
export function setTicket(data,endfix=''){
  const cookiekey = 
  Cookies.set(key,data);
}

export function removeTicket(){
  Cookies.remove(key);
}