import React from 'react';
import { Table, Card, Button, Modal, Input, Select, Form } from 'antd';
import Serv from "../../api/index";
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleList: [],
      userList: [],
      showmodal: false,
      title: '新增',
      detail: {}
    };
  }
  formRef = React.createRef()
  componentDidMount() {
    this.getUser()

  }
  async getUser() {
    const result = await Serv.reqUsers()
    if (result.status == 0) {
      let roleList = result.data.roles
      let userList = result.data.users
      roleList.splice(0, 1)
      console.log(roleList, 'roleList');
      this.setState({ roleList, userList })
    }
  }

  onShowModal(type, record) {
    let title = '新增用户'
    if (type === 2) {
      title = '编辑用户'
      let detail = record
      delete detail.password
      this.formRef.current.setFieldsValue({...detail})
      this.setState({ detail, showmodal: true, title })
    } else {
      this.setState({ showmodal: true, title })
    }
  }
  
  onConfirm() {
    const p = this.formRef.current.validateFields()
    let detail = this.state.detail
    let title = this.state.title
    p.then(async (value) => {
      let result
      if(title == '编辑用户'){
        value._id = detail._id
         result = await Serv.reqUpdateUser(value)
      }else{
         result = await Serv.reqAddUser(value)
      }
      if (result.status == 0) {
        this.getUser()
        this.onCancel()
      }
    })
  }
  onCancel() {
    this.formRef.current.resetFields()
    this.setState({ showmodal: false, detail: {} })
  }
  async deleteUser(record){
    let result = await Serv.reqDeleteUser(record._id)
    if (result.status == 0) {
      this.getUser()
    }
  }
  render() {
    let { showmodal, roleList, userList, title, detail } = this.state
    console.log(userList, 'userList');

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '操作',
        render: (record) => {
          return <span>
            <a style={{ marginRight: 10 }} onClick={() => this.onShowModal(2, record)}>编辑</a> 
            <a onClick={() => {
              this.deleteUser(record)
            }}>删除</a>
          </span>
        }
      },
    ];
    return (
      <Card title='用户管理' extra={<Button type='primary' onClick={() => this.onShowModal(1)}>新增用户</Button>}>
        <Table dataSource={userList} columns={columns} />
        <Form
          {...layout}
          name="basic"
          ref={this.formRef}
        >
          <Modal
            title={title}
            cancelText='取消'
            okText='确定'
            visible={showmodal}
            onOk={() => { this.onConfirm() }}
            onCancel={() => { this.onCancel() }}>

            <Form.Item
              label="用户名"
              name="username"
              // initialValue={detail.username}
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input placeholder='请输入用户名' />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入初始化密码!',
                },
              ]}
            >
              <Input placeholder='请输入初始化密码' />
            </Form.Item>

            <Form.Item
              label="姓名"
              name="name"
              // initialValue={detail.name}
              rules={[
                {
                  required: true,
                  message: '请输入姓名',
                },
              ]}
            >
              <Input placeholder='请输入姓名' />
            </Form.Item>

            <Form.Item
              name="email"
              label="邮箱"
              // initialValue={detail.email}
              rules={[
                {
                  type: 'email',
                  message: '请输入正确的邮箱格式',
                },
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}
            >
              <Input placeholder='请输入邮箱' />
            </Form.Item>

            <Form.Item
              name="role"
              label="角色"
              // initialValue={detail.role}
              rules={[
                {
                  required: true,
                  message: '请选择用户角色',
                },
              ]}
            >
              <Select placeholder='请选择用户角色'>
                {
                  roleList.map((item, index) =>
                    <Option key={index} value={item.name}>{item.name}</Option>
                  )
                }

              </Select>
            </Form.Item>

          </Modal>
        </Form>
      </Card>);
  }
}

export default User;