import React from 'react';
import { Menu, Dropdown,Avatar,Modal, Button, Space} from 'antd';
import {withRouter} from "react-router-dom";
import { DownOutlined,UserOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import './Header.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
const { confirm } = Modal;

class HeaderPart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        user : '',
        username:'',
    };
  }
  
  componentDidMount () {
    const user = memoryUtils.user
    this.setState({
      username:user.username
    })
    console.log(user);
    }
  showConfirm=()=>{
    confirm({
    title: '确定要退出登录吗',
    icon: <ExclamationCircleOutlined />,
    content: '',
    cancelText: '取消',
    okText: '确定',
    onOk:()=>{
      storageUtils.removeUser()
      memoryUtils.user = {}
      this.props.history.replace('/login')
    },
    onCancel() {
    },
  });
}
  render () {
    let {username} = this.state
    const menu = (
      <Menu>
        <Menu.Item>
          <Button type="link" onClick = {this.showConfirm}>
            退出登录
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
    <div style={{float:'right',marginRight:30}}>
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    <Avatar style={{ backgroundColor: '#3c5b9a' ,marginRight:5}} icon={<UserOutlined />} />{username} <DownOutlined />
    </a>
  </Dropdown>
  </div>
   );
  }
}

export default withRouter(HeaderPart);