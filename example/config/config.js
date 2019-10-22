export default {
  plugins:[
    ['umi-plugin-cas',{
      type:'member',
      env:'dev',
      action:'api/checkTicket'
    }]
  ],
  routes:[
    {
      path:'/',
      component:'../layouts/BasicLayout/',
      //Routes:['src/pages/Authorized'],
      routes:[{
        path:'/',component:'./member'
      },
      {
        path:'/welcome',component:'./welcome'
      }
      ]
    },
    
  ]
}