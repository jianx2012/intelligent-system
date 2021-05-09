/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Card,Table,Button,Select,Input } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import PageTitle from "../../component/PageTitle/PageTitleView";
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Serv from '../../api'
import storageUtils from "../../utils/storageUtils";
// import TableDemo from '../../component/Table/TableDemo'
const { Option } = Select;
@inject("ListPageMod")
@withRouter
@observer
class ListPage extends React.Component {
  constructor (props) {
    super(props);
    this.store = this.props.ListPageMod;
    this.state = {
      approvallist:[],
      searchName:'',
      searchType:'title',
      loading:false

    };
  }
  
   componentDidMount () {
    this.setState({loading:true})
    this.getList()
   }
   getList = async() =>{

    const result = await Serv.reqlistPage()
    if(result.status == 0){
      let approvallist = result.data.list
      this.setState({approvallist,loading:false})
    }else{
      this.setState({loading:false})
    }

  }
  onSearch = async() =>{
    let {searchType,searchName} = this.state
    console.log(searchType,searchName);
    const result = await Serv.reqSearchList({pageNum:1,pageSize:10,searchType,searchName})
    if(result.status == 0){
      let approvallist = result.data.list
      this.setState({approvallist})
    }
  }
    intColumns = () => {
      let userInfo = storageUtils.getUser()
      this.columns = [
        {
          title: '工作列表',
          dataIndex: 'title',
  
        },
        {
          title: '列表描述',
          dataIndex: 'desc',
        },
        {
          width:150,
          title: '操作',
          // dataIndex: 'status',
          render:(record) =>{
            return <span>
              {userInfo.role=='管理员'&&<a style={{marginRight:10}}
              onClick={()=>{ this.props.history.push(`/listpage/listpageadd?id=${record._id}`)}}>编辑</a>}
              <a onClick={()=>{
                 this.props.history.push(`/listpage/listpagedetail?id=${record._id}`)
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
      this.props.history.push('/listpage/listpageadd')
    }
  render () {
    // let {approvallist,pageInfo} = this.store.state
    let userInfo = storageUtils.getUser()
    let {approvallist,searchName,loading} = this.state
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
        <Select defaultValue={'title'} style={{width:150}}
         onChange={(value)=>{
            this.setState({searchType:value})
        }}
        >
          <Option value='title'>按名称搜索</Option>
          <Option value='desc'>按描述搜索</Option>
        </Select>
        <Input placeholder='输入关键字搜索' bordered={true} style={{width:250,margin:'0 15px'}}
         value={searchName}
         onChange={(e)=>{
          this.setState({searchName:e.target.value})
      }}
        ></Input>
        <Button type='primary'
          onClick={()=>{this.onSearch()}}
        >搜索</Button>
      </span>
    )
    return (<div>
         <Card title={title} extra={userInfo.role=='管理员'?extra:undefined} bordered={false}>
            <PageTitle title='列表中心'></PageTitle>
            <Table dataSource={dataSource} columns={this.columns}  loading={loading} rowKey='_id'/>
         </Card>
    </div>)
  }
}

export default ListPage;