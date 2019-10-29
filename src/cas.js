import Authorized from './Authorized';
import Cas from './Casitl';
import {getPageQuery,urlExcept} from './utils/utils';
import query from './service';
import Cookies from 'js-cookie';
import CasContext from './CasContext';
let cookieKey = 'yjtec-cas-ticket-';
let defaultConfig = {};
const getRedirect = () => {
  let redirect = window.location.href;
  redirect = urlExcept('ticket',redirect);
  return encodeURI(redirect);
}
export function getConfig(){
  return defaultConfig;
}
export function setconfig(data){
  const {env,type} = data;
  let uri = 'http://cas.360vrsh.com';

  if(env === 'local'){
    uri = 'http://local.cas.360vrsh.com';
  }
  if(env === 'test'){
    uri = 'http://test.cas.360vrsh.com';
  }
  if(env === 'dev'){
    uri ="http://dev.cas.360vrsh.com";
  }
  cookieKey += type;
  defaultConfig = {
    ...data,
    loginUri:uri + '/login/'+type,
    logoutUri :uri + '/logout/' + type
  };
}
export function login(){
  const ticket = getTicket();
  if(ticket){
    Cookies.remove(cookieKey);
  }
  const uri = defaultConfig.loginUri + '?redirect='+ getRedirect();
  window.location.href=uri;
}
export function logout(){
  Cookies.remove(cookieKey);

  window.location.href=defaultConfig.logoutUri + '?redirect=' + getRedirect();
}
const getTicket = function(){
  return Cookies.get(cookieKey);
}
export async function checkLogin(){
  const {action,type} = defaultConfig;
  const params = getPageQuery();
  const ticket = params.ticket || Cookies.get(cookieKey);
  if(ticket){
    const re = await query(action,ticket);
    if(re.errcode == 0 && re.data){
      Cookies.set(cookieKey,ticket);
      return Promise.resolve({
        ticket:ticket,
        user:re.data
      })
    }else{
      Cookies.remove(cookieKey);
      return Promise.resolve(false);
    }
  }else{
    //不存在
    return Promise.resolve(false);
  }
}
export {
  Authorized,
  CasContext,
  getTicket
}
export default Cas;