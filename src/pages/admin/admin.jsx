import React from 'react';
// import { Form } from 'antd';
import {Redirect,Route,Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import SiderDemo from '../../components/SiderDemo/SiderDemo'

import Home from "../home/home";
import role from "../role/role";
import user from "../user/user";
import category from "../category/category";
import product from "../product/product";
// import Home from "../home/home";
// import Home from "../home/home";
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
      <SiderDemo/>
    </div>);
  }
}

export default Admin;
