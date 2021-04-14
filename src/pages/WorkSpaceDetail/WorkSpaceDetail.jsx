import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Card, Select, Input, Table, Drawer, Row, Col } from "antd";
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
    };
  }

  async componentDidMount() {
    let path = this.props.location.search
    path = new URLSearchParams(path.substring(1, this.props.location.length))
    const id = path.get('id');
    const result = await Serv.reqworkDetails(id)
    console.log(result, 'result');
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
          render:(record)=>(
            <span>
            进行中
            </span>
         )
        },
        {
        title: '操作',
        fixed: 'right',
        width: 200,
        render:(record)=>(
          <span>
            <a style={{marginRight:24}} onClick={()=>{}}>同意</a>
            <a style={{marginRight:24}} onClick={()=>{}}>拒接</a>
            {/* {this.state.parentId==0?<a onClick={()=>{}}>查看</a>:null} */}
          </span>
       )
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

  }

  componentWillMount() {

  }
  //修改审批表
  inputChange(key, value) {
    console.log('key=>', key, '    value=>>>', value);
  }
  onSearch() {

  }
  onReset() {

  }
  inputChange(key, value) {
    let {approvalItem} = this.state
    approvalItem[key] = value 
    console.log(approvalItem);
    this.setState({approvalItem})
    console.log(key, '<=key', 'value=>', value);

    // this.setState({})
  }
  onClose = () => {
    this.setState({ showDrawer: false })
  }
  onShowAdd = () => {
    this.setState({ showDrawer: true })
  }
  onHandleAdd = () => {
    const username =  memoryUtils.user.username
    let {approvalItem,data,} = this.state
    let itemlist = []
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
    console.log(params);
  }

  render() {
    let { columns, showDrawer, formConfig = [], data } = this.state
    let { queryList, loading } = this.store.state;
    queryList = cloneDeep(queryList)
    let formList = formConfig.formConfig
    console.log(formList, 'formList');
    let tableData = []
    const extra = (
      <Button type="primary" onClick={() => this.onShowAdd()}>
        <PlusOutlined /> 新增
      </Button>
    )
    const title = (
      <span>
        {formList && <Select defaultValue={formList[0].key} style={{ width: 150 }}
        //  onChange={(value)=>{
        //     this.setState({searchType:value})
        // }}
        >
          {formList.map((item, index) =>
            <Option value={item.key} key={index}>{`按${item.title}搜索`}</Option>
          )}


        </Select>}
        <Input placeholder='输入关键字搜索' bordered={true} style={{ width: 250, margin: '0 15px' }}
        //    value={searchName}
        //    onChange={(e)=>{
        //     this.setState({searchName:e.target.value})
        // }}
        ></Input>
        <Button type='primary'
          onClick={() => { this.getProducts(1) }}
        >搜索</Button>
      </span>
    )
    return (<div>
      <Card title={title} extra={extra} bordered={false}>
        <PageTitle title={data.title}></PageTitle>
        <Table columns={columns} tableData={tableData}>
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
    </div>);
  }
}

export default WorkSpaceDetail;