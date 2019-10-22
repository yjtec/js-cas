import React from 'react';
import createReactClass from 'create-react-class';
import CasContext from './CasContext';

var create = function create(data) {
  return function (Ele) {
    return Ele;
    console.log(Ele);
  }; // return createReactClass({
  //   render(){
  //     console.log(this.props);
  //     return<CasContext.Consumer>123</CasContext.Consumer>
  //   }
  // })
};

export default {
  create: create
}; // const create = data => Ele => {
//     return createReactClass({
//       render(){
//         return(
//           <div>
//             <Ele />
//           </div>
//         )
//       }
//     })
// }
// export default {
//   create
// }
// // export default data => Ele => {
// // }