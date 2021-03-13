import React from 'react';
import { Card,Table,Button, message,Modal } from 'antd';
import {
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import AddForm from "./add_form";
import UpdataForm from "./updata_form";
import Serv from '../../api'
class Category extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      categorys : [],// 一级分类列表
      subCategorys:[],// 二级分类列表
      loading : false,
      parentId :'0',
      parentName:'列表库',
      isModalVisible:false,
      isEditModalVisible:false,
      category:'',
    };
  }

  getCategorys = async () =>{
    this.setState({loading:true})
    const {parentId} = this.state
    const result = await Serv.reqCategorys(parentId)
    this.setState({loading:false})
    if(result.status !==0){
      message.error('获取列表失败')
    }else{
      const categorys = result.data
      if(parentId === '0')
      this.setState({categorys})
      else{
        this.setState({subCategorys:categorys})
      }
    }
  }

  //获取子列表
  showSubCategorys = (record)=>{
    this.setState({
      parentId:record._id,
      parentName:record.name
    },()=>{
      this.getCategorys()
    })
  }

  //获取列表库
  showCategorys = ()=>{
    this.setState({
      parentId:'0',
      parentName:'',
      subCategorys:[]
    })
  }
  add = ()=>{
    const p = this.form.validateFields()
    p.then(async(value)=>{
      console.log(value,'value');
      const {parentId,categoryName} = value
    
      const result =await Serv.reqAddCategory(parentId,categoryName)
      console.log(result,'result');
      if(result.status === 0){
        this.getCategorys()
        this.form.resetFields()
      }
      this.handleCancel('add')
    }).catch((err)=>{
      console.log(err,'err');
    })

  }
  handleCancel = (type)=>{
    this.form.resetFields()
    if(type=='add'){
      this.setState({isModalVisible:false})
    }else if(type == 'edit'){
      
      this.setState({isEditModalVisible:false})
    }

  }
  showEditModal = (record)=>{
    this.category = record
    console.log(this.category ,'category');
    this.setState({isEditModalVisible:true,})
  }
  showAddModal = ()=>{
    this.setState({isModalVisible:true})
  }
  edit = ()=>{
    const p = this.form.validateFields()
    p.then(async(value)=>{
      const categoryId = this.category._id
      const categoryName = this.form.getFieldValue('field')
      const result =await Serv.reqUpdateCategory({categoryId,categoryName})
      if(result.status === 0){
        this.getCategorys()
      }
      this.handleCancel('edit')
    }).catch(err=>{
      console.log(err);
    })

   
  }

  componentDidMount () {
    this.getCategorys()
  }
  //初始化table所有列的数组

  componentWillMount(){
  //  this.initColumns()
  this.columns = [
    {
    title: '分类名称',
    dataIndex: 'name',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      render:(record)=>(
        <span>
          <a style={{marginRight:24}} onClick={()=>{this.showEditModal(record)}}>编辑</a>
          {this.state.parentId==0?<a onClick={()=>{this.showSubCategorys(record)}}>查看</a>:null}
        </span>
     )
    },
  ]    
  }

  render () {
    const {categorys,loading,parentId,parentName,subCategorys,isModalVisible,isEditModalVisible,} = this.state
    let category = this.category ||{}
    const title = parentId === '0' ?'列表库':(
      <span>
        <a onClick={this.showCategorys}>列表库</a>
        <RightOutlined />
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type="primary" onClick={()=>this.showAddModal()}>
        <PlusOutlined /> 新增
      </Button>
    )
  
    return (<div>
            <Card title={title} extra={extra} bordered={false}>
              <Table bordered dataSource={parentId==='0'?categorys:subCategorys} columns={this.columns} rowKey='_id'  loading={loading}/>
            </Card>

            <Modal title="新增" visible={isModalVisible} onOk={this.add} onCancel={()=>this.handleCancel('add')}>
              <AddForm categorys={categorys} parentId={parentId} setForm={(form)=>{this.form =form }}/>
            </Modal>
            
            <Modal title="编辑" visible={isEditModalVisible} onOk={this.edit} onCancel={()=>this.handleCancel('edit')}>
              <UpdataForm categoryName={category.name} setForm={(form)=>{this.form =form }}/>
            </Modal>
    </div>);
  }
}

export default Category;