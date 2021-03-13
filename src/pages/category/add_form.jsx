import React from 'react';
import { Form, Select, Input } from 'antd';
const { Option } = Select;
class AddForm extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            categorys:this.props.categorys||[],
            parentId:this.props.parentId||'',
        };
    }

    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }
    componentWillReceiveProps (nextProps){
       let categorys = nextProps.categorys
       let parentId = nextProps.parentId
       this.setState({categorys,parentId})
    }
    render() {
        let {categorys,parentId} = this.state
        console.log(categorys,'ADDDDDDDDcategorys');
        console.log(parentId,'parentIdparentId');
        return (<div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                ref={this.formRef}
            >
                <Form.Item label="分类"
                    name="parentId" 
                    required={true}
                    initialValue={parentId}
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Select>
                    <Option value='0'>一级列表</Option>
                        {categorys.map(item=>
                            <Option value={item._id}>{item.name}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item label="分类名称"
                    name="categoryName" 
                    rules={[
                        {
                            required: true,message:'分类名称不能为空'
                        },
                    ]}>
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        </div>);
    }
}

export default AddForm;