import React from 'react';
import {logout,Authorized} from 'yjtec-cas';
class Member extends React.Component{
  handleLogout = () =>{
    logout();
  }
  render(){
    return(
      <div>
        <h1>个人中心</h1>
        <button onClick={this.handleLogout}>退出登录</button>
      </div>
    )
  }
}
// export default Member;
export default (props) => {
  return (
    <Authorized>
      <Member {...props} />
    </Authorized>
  )
} ;