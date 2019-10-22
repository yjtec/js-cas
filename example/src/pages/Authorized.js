import {Authorized} from 'yjtec-cas';
export default (props)=>{
  return(
    <Authorized
      {...props}
    >
    {props.children}
    </Authorized>
  )
}