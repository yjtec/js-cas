import request from 'umi-request';
export default async function query(action,ticket){
  return request(action,{
      method:'post',
      requestType:'form',
      data:{ticket:ticket}
    });
}