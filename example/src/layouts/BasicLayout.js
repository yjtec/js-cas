import React,{Component} from 'react';
class BasicLayout extends Component{

  render(){
    const {children} = this.props;
    return(
      <div>
        layout
        {children}
      </div>
    )
  }
}

export default BasicLayout;