import React,{Component} from 'react';
import {
  CasContext,
  setconfig,
  checkLogin
} from 'yjtec-cas';
const casInfo = {
  type:'{{type}}',
  action:'{{&action}}',
  env:'{{env}}'
}
setconfig(casInfo);
class CasWrapper extends Component{
  constructor(props) {
    super(props);
    this.state={
      loading:true,
      isLogin:false,
      ticket:'',
      user:{}
    }
  }
  async componentDidMount(){
    const data = await checkLogin();

    if(data){
      const {ticket,user} = data;
      this.setState({
        isLogin:true,
        user:user,
        ticket:ticket,
        loading:false,
      })
      return ;
    }
    this.setState({
      loading:false
    })
    
  }
  render(){
    const {children} = this.props;
    const {loading} = this.state;
    const CasContextValue = {
      ...this.state
    }
    return(
      <CasContext.Provider
        value={CasContextValue}
      >
        {!loading && children}
      </CasContext.Provider>
    )
  }
}
export default CasWrapper;