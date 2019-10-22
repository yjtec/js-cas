"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _CasContext = _interopRequireDefault(require("./CasContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _default = {
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

exports.default = _default;