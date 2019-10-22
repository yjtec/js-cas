import React from 'react';

class CasWrapper extends React.Component{

  render(){
    return(
      <div>
        <h1>case wrapper </h1>
        {this.props.children}
      </div>
    )
  }

}

export default CasWrapper;