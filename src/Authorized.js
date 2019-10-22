import React,{Component} from 'react';
import {CasContext,login} from 'yjtec-cas';
class Authorized extends Component{
  render(){
    const {children,isLogin,user,ticket} = this.props;
    if(!isLogin){
      login();
    }
    return React.Children.map(children,child =>{
      return React.cloneElement(child,{
        isLogin:isLogin,
        ticket:ticket,
        user:user
      })
    })
  }
}
export default (props) => {
  return (
    <CasContext.Consumer>
      {context => (
        <Authorized {...context} {...props} />
      )}
    </CasContext.Consumer>
  )
};