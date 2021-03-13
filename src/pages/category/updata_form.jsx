import React from 'react';
import { Form, Select, Input } from 'antd';
const { Option } = Select;

class UpdataForm extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }
    componentWillReceiveProps (nextProps){
       
    }
    componentWillMount(){
        let {categoryName} = this.props

    }
    render() {
        let {categoryName} = this.props
        // console.log(categoryName,'categoryName');

        // console.log(getFieldValue('name'),'formform');
        return (<div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                // form={form}
                initialValues={{'field':categoryName}}
                ref={this.formRef}

            >
                <Form.Item label="分类名称" 
                    name="field" 
                    required={true}
                    // initialValue={categoryName}
                    rules={[
                        {
                            required: true,message:'分类名称不能为空'
                        },
                    ]}>
                    <Input placeholder="请输入分类名称" onChange={()=>{
                        console.log(this.formRef.current.getFieldValue('field'),'formform');
                    }}  />
                </Form.Item>
            </Form>
        </div>);
    }
}

export default UpdataForm;