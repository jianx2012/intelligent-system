import React from 'react';
import { Card, Form, Input, Button, Radio  } from 'antd';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import RichEditor from "../../component/RichEditor/RichEditor";
import Serv from "../../api/index";
import memoryUtils from '../../utils/memoryUtils'
const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 16,
    },
  };
@withRouter
@observer
class AnnouncementAdd extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
  
    };
  }
  
  componentDidMount () {
  console.log(memoryUtils,'memoryUtils');
    }
  onFinish = async (value)=> {
    let time = new Date();
    let now = time.toLocaleString( ); //获取日期与时间
    console.log(value,'value');
    value.createTime = now
    value.author = memoryUtils.user.username
    const result = await Serv.reqAddAnnouncement(value)
    if(result.status == 0){
        this.props.history.push('announcement')
    }
    }
  render () {
   

    return (<div>
          <Card title='新增公告' bordered={false}>

          <Form
      {...layout}
      name="basic"
      onFinish={(value)=>this.onFinish(value)}
     
    >
      <Form.Item
        label="公告名称"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入公告名称',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="状态"
        name="status"
        rules={[
          {
            required: true,
            message: '请选择状态',
          },
        ]}
      >
    <Radio.Group>
      <Radio value={1}>上线</Radio>
      <Radio value={2}>草稿</Radio>
        </Radio.Group>
      </Form.Item>
 
      <Form.Item
        label="内容"
        name="content"
        rules={[
          {
            required: true,
            message: '',
          },
        ]}
      >
        <RichEditor/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>

      
    </Form>
          </Card>
    </div>);
  }
}

export default AnnouncementAdd;