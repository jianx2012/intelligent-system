import React,{Component} from 'react'
import {BrowserRouter, Route, Switch,  } from 'react-router-dom' 
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import 'antd/dist/antd.less';
export default class App extends Component{
  componentWillUnmount(){
    
  }
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )

          
  }
}