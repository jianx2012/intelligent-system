import React from 'react';
import { Card,Table,Button } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
// import TableDemo from '../../component/Table/TableDemo'
@inject("WorkSpaceMod")
@withRouter
@observer
class Home extends React.Component {
  constructor (props) {
    super(props);
    this.store = this.props.WorkSpaceMod;
    this.state = {
  
    };
  }
  
  componentDidMount () {
  
    }
    intColumns = () => {
      this.columns = [
        {
          title: '审批表',
          dataIndex: 'name',
  
        },
        {
          title: '审批描述',
          dataIndex: 'desc',
        },
        {
          width:150,
          title: '操作',
          // dataIndex: 'status',
          render:(record) =>{
            return <span>
              <a style={{marginRight:10}}>编辑</a> <a onClick={()=>{
                 this.props.history.push(`/workspace/workdetail?id=${record._id}`)
              }}>查看</a>
            </span>
          }
  
        },
      ];
    }
    componentWillMount(){ 
      this.intColumns()
    }
    onHandleAdd=()=>{
      this.props.history.push('/workspace/workadd')
    }
  render () {
    let {obj} = this.store.state
    let title = '审批中心'
    let dataSource = obj || []

    const extra = (
      <Button type="primary" onClick={()=>this.onHandleAdd()}>
        <PlusOutlined /> 新增
      </Button>
    )
    return (<div>
         <Card title={title} extra={extra} bordered={false}>
            <Table dataSource={dataSource} columns={this.columns} rowKey='_id'/>;
         </Card>
    </div>);
  }
}

export default Home;