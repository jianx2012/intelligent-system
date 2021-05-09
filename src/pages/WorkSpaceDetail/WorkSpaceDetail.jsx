/* eslint-disable no-unused-vars */
import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Card, Select, Input, Table, Drawer, Row, Col, message } from "antd";
import PageTitle from "../../component/PageTitle/PageTitleView";
import FormConfig from "../../component/FormConfig/FormConfig";
import Serv from '../../api'
import Grid from "../../component/Grid/Grid";
import memoryUtils from '../../utils/memoryUtils'
// import QueryCondition from '../../component/QueryCondition/QueryConditionView'
// import Auth from '../../component/Auth/AuthView'
import { cloneDeep } from "lodash";
import {
  PlusOutlined,
} from '@ant-design/icons';
import storageUtils from "../../utils/storageUtils";
const { Option } = Select;
@inject("WorkSpaceDetailMod")
@withRouter
@observer
class WorkSpaceDetail extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.store = this.props.WorkSpaceDetailMod;
    this.state = {
      columns: [],
      showDrawer: false,
      formConfig: [],
      data: {},
      id:'',
      approvalItem:{},
      tableData:[],
      itemListL:[],
      searchType:'',
      searchName:'',
      tableDataCopy1:[]
    };
  }

  async componentDidMount() {
    let path = this.props.location.search
    path = new URLSearchParams(path.substring(1, this.props.location.length))
    const id = path.get('id');
    const result = await Serv.reqworkDetails(id)
    let userInfo = storageUtils.getUser()
    if (result.status === 0) {
      let { data } = result
      data.formConfig.map((item, index) => {
        item.key = `fileKey_${index}`
        item.dataIndex = `fileKey_${index}`
        
      })
      let columns = data.formConfig
      
      let formConfig = {
        form: this.formRef,
        formConfig: data.formConfig,
        callback: this.inputChange.bind(this)
      }
      
      let handle = [
        {
          title: '状态',
          render:(record)=>{
            let state
            if(record.state == 1){
              state = '进行中'
            }else if(record.state == 2){
              state = '拒绝'
            }else{
              state = '同意'
            }
            return <span>{state}</span>
          }
           
         
        },
        {
        title: '操作',
        fixed: 'right',
        width: 200,
        render:(text,record,index)=>{
         
          // record.state == 1&&
          return [ record.state == 1?
          <span>
           {userInfo.role == '管理员'&&<a style={{marginRight:24}} onClick={()=>{this.onApproval(index,3)}}>同意</a>}
           {userInfo.role == '管理员'&&<a style={{marginRight:24}} onClick={()=>{this.onApproval(index,2)}}>拒绝</a>}
         <a style={{marginRight:24}} onClick={()=>{this.onShowAdd()}}>编辑</a>
           {/* {this.state.parentId==0?<a onClick={()=>{}}>查看</a>:null} */}
         </span>:<span style={{color:'#3c5b9a'}}>审批完成</span>]
        }
   
      }]
      columns = columns.concat(handle)
      console.log(columns,'columns');
      this.setState({
        data,
        columns,
        formConfig,
        id
      })
    }
    await this.getItemList()


 
  }


  async getItemList(){
    let id = this.state.id
    const result1 = await Serv.reqApprovalList(id)
    let tableData = []
    if (result1.status === 0) {
      let { data } = result1
      data.map((item,index)=>{
        // tableData.push(...item.itemlist)
        let obj = Object.assign(...item.itemlist)
        obj.key = index
        obj.state = item.status
        tableData.push(obj)
      })
      let tableDataCopy1 = cloneDeep(tableData)
      this.setState({tableData,itemList:data,tableDataCopy1})
    }
  }
  //修改审批表
  // inputChange(key, value,type) {
  //   console.log('key=>', key, '    value=>>>', value,'type',type);
  // }
  async onApproval(index,type){
    let itemList = this.state.itemList
    console.log(itemList[index]);
    let id = itemList[index]._id
    let state = type
    let params = {
      id,state
    }
     const result = await Serv.reqUpdateStatus(params)
     if(result.status == 0){
       message.success('审批成功')
       await this.getItemList()
     }
   console.log(result);
  }
  onSearch() {

      let {searchType,searchName,tableData,tableDataCopy1} = this.state
      if(!searchType){
        searchType = 'fileKey_0'
      }
      tableData = tableDataCopy1.filter(item=>{
        return item[searchType].indexOf(searchName) != -1
      })

      this.setState({tableData})
      console.log(tableData,'tableData');

  }
  onReset() {

  }
  // eslint-disable-next-line no-dupe-class-members
  inputChange(key, value,type,list) {
    let {approvalItem} = this.state
    if(type == 'RangePicker'){
      let startTime = value[0]
      let endTime = value[1]
      value = startTime + '至' +endTime
    }
    if(list){
      approvalItem[key] = list[value].label
    }else{
      approvalItem[key] = value 
    }

    console.log(approvalItem);
    this.setState({approvalItem})
    console.log(key, '<=key', 'value=>', value,'type',type,'list',list);

    // this.setState({})
  }
  onClose = () => {
    this.setState({ showDrawer: false })
  }
  onShowAdd = () => {
    this.setState({ showDrawer: true })
  }
  onHandleAdd = async() => {
    const username =  memoryUtils.user.username
    let {approvalItem,data,} = this.state
    let itemlist = []
    console.log(approvalItem,'approvalItem');
    //把对象转为数组
    for (let i in approvalItem) {
      let o = {};
      o[i] = approvalItem[i];
      itemlist.push(o)
  }
    let params = {
      id : data._id,
      title : data.title,
      creator : username,
      itemlist
    }
    const result = await Serv.reqAddapproval(params)
    console.log(result,'result');
    if(result.status == 0){
      await this.getItemList()
      this.onClose()
    }
  }

  render() {
    let { columns, showDrawer, formConfig = [], data ,tableData} = this.state
    let { queryList, loading } = this.store.state;
    let pageConfig = {
      current:1,
      total:50,
      pageSize:10,
    }
    queryList = cloneDeep(queryList)
    let formList = formConfig.formConfig
    const extra = (
      <Button type="primary" onClick={() => this.onShowAdd()}>
        <PlusOutlined /> 新增
      </Button>
    )
    const title = (
      <span>
        {formList && <Select defaultValue={formList[0].key} style={{ width: 150 }}
         onChange={(value)=>{
           console.log(value,'ssss');
            this.setState({searchType:value})
        }}
        >
          {formList.map((item, index) =>
            <Option value={item.key} key={index}>{`按${item.title}搜索`}</Option>
          )}


        </Select>}
        <Input placeholder='输入关键字搜索' bordered={true} style={{ width: 250, margin: '0 15px' }}
        //    value={searchName}
           onChange={(e)=>{
            console.log(e.target.value,'ssss');
            this.setState({searchName:e.target.value})
        }}
        ></Input>
        <Button type='primary'
          onClick={() => { this.onSearch() }}
        >搜索</Button>
      </span>
    )
    return (<div>
      <Card title={title} extra={extra} bordered={false}>
        <PageTitle title={data.title}></PageTitle>
        <Table columns={columns} dataSource={tableData} pagination={false}>
        </Table>
      </Card>

      <Drawer
        title="新增审批"
        placement="right"
        width={500}
        closable={false}
        onClose={() => { this.onClose() }}
        visible={showDrawer}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => this.onClose()} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={() => this.onHandleAdd()} type="primary">
              确定
            </Button>
          </div>
        }

      >

        <Row>
          <Col>
            <FormConfig {...formConfig} />
          </Col>
        </Row>

      </Drawer>
    </div>)
  }
}

export default WorkSpaceDetail;