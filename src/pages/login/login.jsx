import React from 'react';
import {Redirect} from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import Serv from '../../api'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }
  async onFinish(values){
    try {
      const result = await Serv.reqLogin(values.username,values.password)
      // let {data} = response
      if(result.status === 0){ //登录成功
        message.success('登录成功')
        const user = result.data
        memoryUtils.user = user
        storageUtils.saveUser(user) //保存到local
        this.props.history.replace('/')
      }else{
        message.error(result.msg)
      }
      console.log('请求成功',result);
    } catch (error) {
      console.log('请求失败');
    }
    console.log('Received values of form: ', values);
  };
  render() {
    return (
      <div className="login">
        <section className="login_content">
          <div className="login_topPart">
            <h2>Welcome to Intelligent-System</h2>
          </div>
          <div className="login_bottomPart">
            <div className="login_form">
          
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
              >
                <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
              </Form.Item>
                <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
              </Form>
            </div>
          </div>

        </section>
      </div>);
  }
}

export default Login;
