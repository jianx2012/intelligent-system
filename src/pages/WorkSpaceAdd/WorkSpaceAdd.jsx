import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PageTitle from "../../component/PageTitle/PageTitleView";
import FormConfig from "../../component/FormConfig/FormConfig";
import { Divider ,Form, Input,Row } from 'antd';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
@inject("WorkSpaceAddMod")
@withRouter
@observer
class WorkSpaceAdd extends React.Component {
  formRef = React.createRef();
  constructor (props) {
    super(props);
    this.store = this.props.WorkSpaceAddMod;
    this.state = {
  
    };
  }
  
  componentDidMount () {
  
    }

  componentWillMount(){ 
  
  }  
  inputChange(key,value){
    console.log("baseInfo key:", key, "value:", value)
  }
  render () {
    //表单配置
    const formConfigObj = {
      form:this.formRef,
      formConfig:[
        {title:'审批表名称',type:'input',key:'title',required:true}
      ],
      callback:this.inputChange.bind(this)
    }
    let callback = formConfigObj.callback
    // console.log(callback,'callback');
    const content = (item,index)=>{
      return <div>
        {[
          item.type === 'input' && <Input 
          onChange={e => callback(item.key, e.target.value)}
          />
        ]}
      </div>
    }
    return (<div>
         <PageTitle title='审批基本信息'></PageTitle>
         <Divider />
         <Row>
          <FormConfig {...formConfigObj}>

          </FormConfig>
         <Form
      {...layout}
      name="basic"
    >
      {formConfigObj.formConfig.map((item,index)=>
      <Form.Item
      label={item.title}
      name={item.key}
      rules={[{ required: item.required, message:`请输入${item.title}` }]}
    >
      {content(item, index)}
    </Form.Item>
      )}

    </Form>
    </Row>
    </div>);
  }
}

export default WorkSpaceAdd;