import request from 'umi-request';
export default async function query(action,ticket){
  return request.post(action,{
    options:{
      method:'post',
      requestType:'form',
      data:{ticket:ticket}
    }
  })
}