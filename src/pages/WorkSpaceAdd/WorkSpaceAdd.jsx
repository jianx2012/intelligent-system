import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PageTitle from "../../component/PageTitle/PageTitleView";
import FormConfig from "../../component/FormConfig/FormConfig";
import { Button, Divider, Form, Input, Row, Table, Modal,Col, message } from 'antd';
import Serv from '../../api'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { isEmpty,cloneDeep } from "lodash";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};



@inject("WorkSpaceAddMod")
@withRouter
@observer
class WorkSpaceAdd extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.store = this.props.WorkSpaceAddMod;
    this.state = {
      options: [],
      showmodal: false,
      formItem: {},
      optItem: {},
      tableConfig: {},
    };
  }

  async componentDidMount() {
    let path = this.props.location.search
    path = new URLSearchParams(path.substring(1, this.props.location.length))
    const id = path.get('id');
    if(id){
      const result = await Serv.reqworkDetails(id)
      if(result.status == 0){
        let data = result.data
        let obj = {desc:data.desc,title:data.title}
        this.store.setValue('formArray', data.formConfig)
        this.formRef.current.setFieldsValue({title:data.title,desc:data.desc})
        this.setState({tableConfig:obj})
      }
      this.setState({id})
    }
   
  }



  //修改审批表
  inputChange(key, value) {
    let tableConfig = this.state.tableConfig
    tableConfig[key] = value
    console.log(tableConfig, 'formItem');
    this.setState({ tableConfig })
  }

  //修改表单配置
  inputChangeConfig(key, value) {
    console.log("baseInfo key:", key, "value:", value)
    let formItem = this.state.formItem
    formItem[key] = value
    console.log(formItem, 'formItem');
    this.setState({ formItem })
  }

  //表单新增选项
  addOption(key, value) {
    let optItem = this.state.optItem
    optItem[key] = value
    // for (let key in optItem) {
    //     console.log(key);
    //   }
    
    this.setState({ optItem })
    console.log(optItem);
    console.log("baseInfo key:", key, "value:", value)
  }

  onFinish = values => {
    console.log('Received values of form:', values);
    // console.log(fields,'fields');
  }

  //增加选项
  onAddOptions() {
    let { options } = this.state;
    options.push(this.id++);
    this.setState({ options });
  }

  //表单新增确认
  onConfirm = () => {
    const p = this.formRef.current.validateFields()
    p.then((value) => {
      let formItem = this.state.formItem
      let formArray = this.store.state.formArray
      if (formItem.type == 'radio' || formItem.type == 'select' || formItem.type == 'checkbox') {
        let { optItem } = this.state;
        let list = []
        let index = 0
        for (let i in optItem) {
          let o = {};
          o.label = optItem[i];
          o.value = index
          index++
          list.push(o)
        }
        formItem.list = list
        console.log(list,'list');
      }
      console.log(formItem,'formItem');
      formArray.push(formItem)
      this.store.setValue('formArray', formArray)
      this.formRef.current.resetFields()
      this.setState({ formItem: {}, showmodal: false,optItem:{}, })
     
      // console.log(this.formRef,'formRef');
    }).catch((err) => {
      console.log(err);
    })

  }

  //提交
  onSubmit = () => {
    let id = this.state.id
    const p = this.formRef.current.validateFields()
    p.then(async(value) => {
      let tableConfig = this.state.tableConfig
      let formArray = this.store.state.formArray || []
      if(!formArray.length){
        message.warn('请配置表单')
        return false
      }else{
        tableConfig.formConfig = formArray
        let detailData = tableConfig
        if(id){
          detailData._id = id
          const result = await Serv.reqUpdateWork(detailData)
          this.props.history.push('/workspace')
          if(result.status == 0){
            this.store.setValue('formArray',[])
          }
        }else{
          const result = await Serv.reqAddwork(detailData)
          this.props.history.push('/workspace')
          if(result.status == 0){
            this.store.setValue('formArray',[])
          }
        }
 
      }
    }
    )
  }
  onCancel = () => {
    this.formRef.current.resetFields()
    this.setState({ showmodal: false })
  }
  render() {
    //表单配置
    let { options, showmodal, formItem } = this.state
    let { formArray } = this.store.state
    let isOption = false
    if (formItem.type == 'radio' || formItem.type == 'select' || formItem.type == 'checkbox') {
      isOption = true
    }
    console.log(formArray, 'formArray');

    const formConfigObj = {
      form: this.formRef,
      formConfig: [
        { title: '审批表名称', type: 'input', key: 'title', required: true },
        { title: '审批表描述', type: 'textarea', key: 'desc', required: true },
      ],
      callback: this.inputChange.bind(this)
    }
    const formConfig = {
      form: this.formRef,
      formConfig: [
        { title: '标题', type: 'input', key: 'title', required: true },
        { title: '描述', type: 'textarea', key: 'desc', required: true },
        {
          title: '是否必填', type: 'radio', key: 'required', required: true,
          list: [{ label: '是', value: 1 }, { label: '否', value: 2 }]
        },
        {
          title: '表单类型', type: 'select', key: 'type', required: true,
          list: [
            { label: '输入框', value: 'input' },
            { label: '文本域', value: 'textarea' },
            { label: '数字输入框', value: 'inputNumber' },
            { label: '单选框', value: 'radio' },
            { label: '复选框', value: 'checkbox' },
            { label: '下拉框', value: 'select' },
            { label: '日期选择框', value: 'datePicker' },
            { label: '时间范围选择框', value: 'RangePicker' },
          ]
        }
      ],
      callback: this.inputChangeConfig.bind(this)
    }

    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '是否必填',
        dataIndex: 'required',
        key: 'required',
        render:(record)=>{
          return <span>{record==1?'是':'否'}</span>
        }
      },
    ];
    let dataSource = cloneDeep(formArray)

    return (<div>
      <PageTitle title='审批基本信息' rightContent={  <Button type='primary' onClick={() => { this.onSubmit() }}>发布</Button>}></PageTitle>

      <Divider />
      <Row>
        <Col>
        <FormConfig {...formConfigObj} />
        </Col>
      </Row>
      <Row>
        <Form.Item
          label={'配置表单'}
          name={'config'}
          rules={[{ required: true, message: `请配置表单` }]}
        >
          <Button type='primary' onClick={() => { this.setState({ showmodal: true }) }}>配置</Button>
        </Form.Item>
      </Row>
      <Row>
        <Table dataSource={dataSource} columns={columns} style={{ width: 900 }} pagination={false}></Table>
      </Row>

      <Modal
        title="配置表单"
        cancelText='取消'
        okText='确定'
        visible={showmodal}
        onOk={() => { this.onConfirm() }}
        onCancel={() => { this.onCancel() }}>
        <FormConfig {...formConfig} />
        {isOption && <div>
          <Divider />
          {options.map((item, index) =>
            <Form.Item
              label={`选项${index + 1}`}
              name={`option_${index}`}
              key={index}
              rules={[{ required: true, message: `请输入选项` }]}
            >
              <Input style={{ width: 200 }} key={index} onChange={e => this.addOption(`option_${index}`, e.target.value)} />
            </Form.Item>
          )}

          <Button
            type="primary"
            onClick={this.onAddOptions.bind(this)}
          >新增选项</Button>
        </div>}
      </Modal>
    </div>);
  }
}

export default WorkSpaceAdd;