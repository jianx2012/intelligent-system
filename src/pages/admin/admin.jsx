import React from 'react';
// import { Form } from 'antd';
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
class Admin extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
  
    };
  }
  
  componentDidMount () {
  
    }
    
  render () {
    const user = memoryUtils.user
    //如果内存没有存储user ==》 当前没有登录
    if(!user || !user._id){
      return <Redirect to='/login'/>
    }
    return (<div>
      {user.username}
    </div>);
  }
}

export default Admin;
