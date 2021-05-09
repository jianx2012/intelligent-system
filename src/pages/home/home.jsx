/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Row, Col, Table, Card, Calendar, Badge, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Serv from "../../api/index";
import "./homeStyle.less";
import storageUtils from "../../utils/storageUtils";
import { SoundOutlined, PlusOutlined, FileAddOutlined, UserOutlined, HourglassOutlined } from '@ant-design/icons';
@inject("HomeMod")
@withRouter
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.HomeMod;
    this.state = {
      user: {},
      list: '',
    };
  }

  async componentDidMount() {
    const user = storageUtils.getUser()
    const result = await Serv.reqApprovalList()
    this.setState({ user })
    this.getList()
  }
  componentWillMount() {
    //  this.initColumns()
    let userInfo = storageUtils.getUser()
    this.columns = [
      {
        title: '公告名称',
        dataIndex: 'title',
      },
      // {
      //   title: '创建时间',
      //   dataIndex: 'createTime',
      // },
      {
        title: '状态',
        render: (record) => {
          let status
          if (record.status == 1) {
            status = '进行中'
          } else if (record.status == 2) {
            status = '草稿'
          } else {
            status = '结束'
          }
          return <span>{status}</span>
        }
      },
      {
        title: '操作',
        fixed: 'right',
        width: 200,
        render: (record) => (
          <span>
            {userInfo.role == '管理员' && <span>
              <a style={{ marginRight: 24 }} onClick={() => { this.onAdd(record) }}>编辑</a>
              <a style={{ marginRight: 24 }} onClick={() => { this.onStatus(record, 1) }}>上线</a>
              {record.status == 1 && <a style={{ marginRight: 24 }} onClick={() => { this.onStatus(record, 2) }}>下架</a>}
              {record.status == 3 && <a style={{ marginRight: 24 }} onClick={() => { this.onStatus(record, 3) }}>删除</a>}
            </span>}
            <span>
              <a onClick={() => { this.onCheck(record) }}>查看</a>
            </span>
          </span>
        )
      },
    ]
  }
  onCheck = (record) => {
    let id = record._id
    this.props.history.push(`announcementdetail?id=${id}`)
}
  getList = async () => {
    let userInfo = storageUtils.getUser()
    this.setState({ loading: true })
    const result = await Serv.reqAnnouncementList()
    this.setState({ loading: false })
    if (result.status == 0) {
      let { list } = result.data
      if (userInfo.role !== '管理员') {
        list = list.filter(item => {
          return item.status === 1
        })
      } else {
        list = list.filter(item => {
          return item.status === 2
        })
      }
      console.log(list, 'list');
      this.setState({ list })
    }
  }
  render() {

    let userInfo = storageUtils.getUser()
    const { loading, list, } = this.state
    return (<div>
      <Row>
        <Col span={12}>
          <Card title={userInfo.role == '管理员' ? '待发布公告' : '公告'} bordered={false} extra={<a href="#">更多</a>}>
            <Table bordered={false} dataSource={list} columns={this.columns} rowKey='_id' loading={loading} />
          </Card>
        </Col>
        <Col offset={1} span={11}>
          <Calendar fullscreen={false} />
        </Col>
      </Row>
      <div className="site-card-wrapper">
        <Row gutter={20} justify='center'>
          <Col span={6}>
            <Card title="公告中心" bordered={false}>
              <div className="icon-style">
                <a onClick={() => { this.props.history.push('/announcement') }}><SoundOutlined style={{ fontSize: '50px', color: '#3c5b9a' }} /></a>
              </div>
              {userInfo.role == '管理员' && <div className="icon-style">
                <Button
                  type="dashed"
                  onClick={() => {
                    this.props.history.push('/announcementadd')
                  }}
                  style={{ width: '80%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  新增公告
            </Button>
              </div>}
              <div className="icon-style">
                <Button
                  type="dashed"
                  onClick={() => {
                    this.props.history.push('/announcement')
                  }}
                  style={{ width: '80%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  查看公告
              </Button>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="列表库" bordered={false}>
              <div className="icon-style">
                <a onClick={() => { this.props.history.push('/listpage') }}><FileAddOutlined style={{ fontSize: '50px', color: '#3c5b9a' }} /></a>
              </div>
              {userInfo.role == '管理员' && <div className="icon-style">
                <Button
                  type="dashed"
                  onClick={() => {
                    this.props.history.push('/listpage/listpageadd')
                  }}
                  style={{ width: '80%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  新增列表
            </Button>
              </div>}
              <div className="icon-style">
                <Button
                  type="dashed"
                  onClick={() => {
                    this.props.history.push('/listpage')
                  }}
                  style={{ width: '80%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  查看列表
              </Button>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="审批库" bordered={false}>
              <div className="icon-style">
                <a onClick={() => { this.props.history.push('/workspace') }}><HourglassOutlined style={{ fontSize: '50px', color: '#3c5b9a' }} /></a>
              </div>
              {userInfo.role == '管理员' && <div className="icon-style">
                <Button
                  type="dashed"
                  onClick={() => {
                    this.props.history.push('/workspace/workadd')
                  }}
                  style={{ width: '80%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  新增审批表
            </Button>
              </div>}
              <div className="icon-style">
                <Button
                  type="dashed"
                  onClick={() => {
                    this.props.history.push('/workspace')
                  }}
                  style={{ width: '80%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  查看审批表
              </Button>
              </div>
            </Card>


          </Col>

          <Col span={6}>
            <Card title="个人中心" bordered={false}>
              <div className="icon-style">
                <a onClick={() => { this.props.history.push('') }}><UserOutlined style={{ fontSize: '50px', color: '#3c5b9a' }} /></a>
              </div>
              {userInfo.role == '管理员' && <div className="icon-style">
                <Button
                  type="dashed"
                  onClick={() => {
                    this.props.history.push('')
                  }}
                  style={{ width: '80%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  新增用户
            </Button>
              </div>}
              <div className="icon-style">
                <Button
                  type="dashed"
                  onClick={() => {
                    this.props.history.push('')
                  }}
                  style={{ width: '80%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  个人中心
              </Button>
              </div>
            </Card>


          </Col>
        </Row>
      </div>
    </div>);
  }
}

export default Home;