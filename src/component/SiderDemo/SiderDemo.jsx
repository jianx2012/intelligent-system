import React from 'react';
import {Link,Redirect,Route,Switch,withRouter} from 'react-router-dom'
import { Layout, Menu, } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import './SiderDemo.less' ;
import logo from '../../assets/images/logo.png'
import Home from "../../pages/home/home";
import Role from "../../pages/role/role";
import User from "../../pages/user/user";
import Category from "../../pages/category/category";
import Announcement from "../../pages/announcement/announcement";
import AnnouncementAdd from "../../pages/announcement/announcementAdd";
import AnnouncementDetail from "../../pages/announcement/announcementDetail";
import Product from "../../pages/product/product";
import WorkSpaceHome from "../../pages/WorkSpace/WorkSpaceHome" 
import ListPageHome from "../../pages/ListPage/ListPageHome" 
import storageUtils from "../../utils/storageUtils";
import menuList from "../../config/menuConfig";
import HeaderPart from "../Header/HeaderPart";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    path:'/home',
    optKey:'/',
    userInfo:{}
  };
  componentDidMount() {
    let path = this.props.location.pathname
    let userInfo = storageUtils.getUser()
    this.setState({userInfo})
    console.log(userInfo,'storageUtils');
    // let optKey = '/'
    // menuList.map(item=>{
    //     if(item.children){
    //         item.children.map(cItem=>{
    //             if(cItem.key == path){
    //                 console.log(item.key);
    //                 this.setState({
    //                     optKey:item.key
    //                 }) 
    //             }
    //         })
    //     }
    // })

    //   this.setState({path})
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed ,userInfo} = this.state;
    let path = this.props.location.pathname
    let optKey = '/'
    if(userInfo.role=='成员'){
      if(menuList[1].title == '权限'){
        menuList.splice(1,1)
      }

    }
    menuList.map(item=>{
        if(item.children){
            item.children.map(cItem=>{
                if(cItem.key == path){
                    console.log(item.key);
                        optKey=item.key
                }
            })
        }
    })
    
    // console.log(path,'path');
    console.log(menuList,'menuList');
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className="site-layout-background" style={{background:'#fff'}}>
        <div className="logo">
          <Link to='/'>
              <img src={logo} alt="logo"/>
          </Link>
        </div>
          <Menu theme="light" selectedKeys={[path]} defaultOpenKeys={[optKey]} mode="inline">
            {
                menuList.map(item=>{
                    if(!item.children){
                        return(
                        <Menu.Item key={item.key} icon = {<i className={'iconfont '+ item.icon}></i>}>
                        <Link to={item.key}>{item.title}</Link>
                        </Menu.Item>
                        )
                    }else{
                       
                        return(
                            <SubMenu key={item.key} icon = {<UserOutlined />} title={item.title}>
                                {item.children.map(childItem=>{
                                    return(
                                        <Menu.Item key={childItem.key}>
                                        <Link to={childItem.key}>{childItem.title}</Link>
                                        </Menu.Item>
                                    )
                                })}
                          </SubMenu> 
                         
                        )
                    }
                })
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <HeaderPart/>
          </Header>
          <Content className='contentPart'>
              <Switch>
                  <Route path='/home' component={Home}/>
                  <Route path='/asset/role' component={Role}/>
                  <Route path='/asset/user' component={User}/>
                  <Route path='/Category' component={Category}/>
                  <Route path='/Announcement' component={Announcement}/>
                  <Route path='/announcementdetail' component={AnnouncementDetail}/>
                  <Route path='/announcementadd' component={AnnouncementAdd}/>
                  <Route path='/Product' component={Product}/>
                  <Route path='/workspace' component={WorkSpaceHome}/>
                  <Route path='/listpage' component={ListPageHome}/>
                  <Redirect to='/home'/>
              </Switch>
        

          </Content>
          <Footer style={{ textAlign: 'center' }}>NA ©2021 Created by Zheng</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(SiderDemo);
// ReactDOM.render(<SiderDemo />, mountNode);