import Authorized from './Authorized';
import Cas from './Casitl';
import {getPageQuery,urlExcept} from './utils/utils';
import query from './service';
import {getTicket,setTicket,removeTicket} from './utils/cookie';
import CasContext from './CasContext';
let defaultConfig = {};
const getRedirect = () => {
  let redirect = window.location.href;
  redirect = urlExcept('ticket',redirect);
  return encodeURI(redirect);
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
  defaultConfig = {
    ...data,
    loginUri:uri + '/login/'+type,
    logoutUri :uri + '/logout/' + type
  };
}
export function login(){
  const ticket = getTicket();
  if(ticket){
    removeTicket();
  }
  const uri = defaultConfig.loginUri + '?redirect='+ getRedirect();
  window.location.href=uri;
}
export function logout(){
  removeTicket();

  window.location.href=defaultConfig.logoutUri + '?redirect=' + getRedirect();
}

export async function checkLogin(){
  const {action,type} = defaultConfig;
  const params = getPageQuery();
  const ticket = params.ticket || getTicket();
  if(ticket){
    const re = await query(action,ticket);
    if(re.errcode == 0 && re.data){
      setTicket(ticket);
      return Promise.resolve({
        ticket:ticket,
        user:re.data
      })
    }else{
      removeTicket();
      return Promise.resolve(false);
    }
  }else{
    //不存在
    return Promise.resolve(false);
  }
}
export {
  Authorized,
  CasContext
}
export default Cas;