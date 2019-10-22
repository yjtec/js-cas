export default {
  'POST /api/checkTicket':(req,res)=>{
    res.send(JSON.stringify({'errcode':0,'errmsg':'成功',data:{id:'1','unname':'ksj'}}));
  },
  'GET /api/test':['123']
}