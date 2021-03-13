import React from 'react';
import { Card, Select, Input, Button, Table} from 'antd';
import { PAGE_SIZE } from "../../utils/constants";
import Serv from '../../api'
const { Option } = Select;
class ProductHome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      total:0, //商品总数量
      products:[],//商品数组
      loading:false,
      searchName:'',
      searchType:'productName',//
    };
  }
  
  componentDidMount () {
    this.getProducts(1)
  }
  intColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',

      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        width:150,
        title: '价格',
        dataIndex: 'price',
        render:(price) =>'￥' + price
      },
      { 
        width:150,
        title: '状态',
        dataIndex: 'status',
        render:(price) =>{
          return <span>
            <Button type='primary'>下架</Button>
            <span>在售</span>
          </span>
        }

      },
      {
        width:150,
        title: '操作',
        dataIndex: 'status',
        render:(record) =>{
          return <span>
            <a>详情</a>
            <a>修改</a>
          </span>
        }

      },
    ];
  }
  componentWillMount(){ 
    this.intColumns()
  }
  getProducts = async (pageNum) =>{
    this.setState({loading:true})
    let {searchName,searchType} = this.state
    let result
    if(searchName){
      console.log(searchName,'=============',searchType);
      result = await Serv.reqSearchProducts({pageNum, pageSize:PAGE_SIZE,searchName,searchType})

    }else{
      result = await Serv.reqProducts(pageNum,PAGE_SIZE)
    }
    this.setState({loading:false})
    console.log(result,'result');
    if(result.status === 0){
      const {total,list} = result.data
      this.setState({
        total,
        products:list

      })
    }

  }
  render () {
    const {products,total,loading,searchType,searchName} = this.state
  
    
    
    const title = (
      <span>
        <Select defaultValue={searchType} style={{width:150}} onChange={(value)=>{
            this.setState({searchType:value})
        }}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='输入关键字搜索' bordered={true} style={{width:250,margin:'0 15px'}} value={searchName}
         onChange={(e)=>{
          this.setState({searchName:e.target.value})
      }}
        ></Input>
        <Button type='primary'
          onClick={()=>{this.getProducts(1)}}
        >搜索</Button>
      </span>
    )
    const extra = (
      <Button>添加商品</Button>  
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey='_id'
          bordered
          loading={loading}
          pagination={{
            defaultPageSize:3,
            total:total,
            onChange: this.getProducts
          }}
          dataSource={products}
          columns={this.columns}/>
      </Card>
      );
  }
}

export default ProductHome;