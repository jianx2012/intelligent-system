import React from 'react';
import { Card,Table,Button,Select,Input } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import PageTitle from "../../component/PageTitle/PageTitleView";
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Serv from '../../api'
// import TableDemo from '../../component/Table/TableDemo'
const { Option } = Select;
@inject("WorkSpaceMod")
@withRouter
@observer
class Home extends React.Component {
  constructor (props) {
    super(props);
    this.store = this.props.WorkSpaceMod;
    this.state = {
      approvallist:[]
    };
  }
  
   componentDidMount () {
    const result =  Serv.reqworkList()
    result.then((value)=>{
      let approvallist = value.data.list
      this.setState({approvallist})
    })

   
    }
    intColumns = () => {
      this.columns = [
        {
          title: '审批表',
          dataIndex: 'title',
  
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
    // let {approvallist,pageInfo} = this.store.state
    let {approvallist} = this.state
    // let title = '审批中心'
    let dataSource = approvallist || []
    console.log(approvallist,'approvallist');
    const extra = (
      <Button type="primary" onClick={()=>this.onHandleAdd()}>
        <PlusOutlined /> 新增
      </Button>
    )
    const title = (
      <span>
        <Select defaultValue={'productName'} style={{width:150}}
        //  onChange={(value)=>{
        //     this.setState({searchType:value})
        // }}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='输入关键字搜索' bordered={true} style={{width:250,margin:'0 15px'}}
      //    value={searchName}
      //    onChange={(e)=>{
      //     this.setState({searchName:e.target.value})
      // }}
        ></Input>
        <Button type='primary'
          onClick={()=>{this.getProducts(1)}}
        >搜索</Button>
      </span>
    )
    return (<div>
         <Card title={title} extra={extra} bordered={false}>
            <PageTitle title='审批中心'></PageTitle>
            <Table dataSource={dataSource} columns={this.columns} rowKey='_id'/>;
         </Card>
    </div>);
  }
}

export default Home;