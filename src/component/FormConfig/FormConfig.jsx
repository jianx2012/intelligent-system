import React from 'react';
import { Form, Input, Row,Col, Radio,Select,Checkbox,DatePicker,InputNumber } from 'antd';
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { TextArea } = Input;
const { RangePicker } = DatePicker;
class FormConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }

  componentWillMount() {

  }
  render() {
    let { form = {}, formConfig = [], actionData = {}, callback, options = {} } = this.props;
    // 过滤需要隐藏的数据
    formConfig = formConfig.filter(item => !item.hide);
    const content = (item, index) => {
      return <div>
        {[
          //自定义
          item.type === 'render' && item.render,
          // 输入框
          item.type === 'input' &&
          <Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={[{ required: item.required, message: `请输入${item.title}` }]}
          >
            <Input autoComplete='off'
              onChange={e => callback(item.key, e.target.value , item.type)}
            />
          </Form.Item>,
          // 文本域
          item.type === 'textarea' &&
          <Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={[{ required: item.required, message: `请输入${item.title}` }]}
          >
            <TextArea onChange={e => callback(item.key, e.target.value,item.type)} />
          </Form.Item>,

          // 单选框
          item.type === 'radio' &&
          <Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={[{ required: item.required, message: `请选择${item.title}` }]}
          >
            <Radio.Group
              name={item.key}
              disabled={item.disabled || false}
              onChange={e => callback(item.key, e.target.value,item.type,item.list)}
              {...item.options}
            >
              {item.list.map(data => <Radio key={data.value} value={data.value} {...data.options}>{data.label}</Radio>)}
            </Radio.Group>
          </Form.Item>,

          // 下拉框
          item.type === 'select' &&
          <Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={[{ required: item.required, message: `请选择${item.title}` }]}
          >
            <Select
              // getPopupContainer={() => document.getElementById(dealWithCoverSelectId)}
              placeholder={`请选择${item.title}`}
              disabled={item.disabled || false}
              onSelect={(value, option) => callback(item.key, value,item.type,item.list)}
              {...item.options}
            >
              {item.list.map((data,index)=> <Select.Option
                key={index}
                value={data.value}
                title={data.label}
                optiondata={data}
                {...data.options}
              >{data.label}</Select.Option>)}
            </Select>
          </Form.Item>,

          // 数字输入框
          item.type === 'inputNumber' &&
          <Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={[{ required: item.required, message: `请输入${item.title}` }]}
          >
            <InputNumber
              autoComplete="off"
              style={{width: 120}}
              disabled={item.disabled || false}
              onChange={value => callback(item.key, value,item.type)}
              { ...item.options }
            /> 
          </Form.Item>,

          // 复选框
          item.type === 'checkbox' &&
          <Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={[{ required: item.required, message: `请输入${item.title}` }]}
          >
           <Checkbox.Group
              disabled={item.disabled || false}
              onChange={value => callback(item.key, value,item.type,item.list)}
              { ...item.options }
            >
              <Row>
                {item.list.map(data => <Col key={data.value} span={data.span || 12} offset={data.offset || 0}>
                  <Checkbox value={data.value} { ...data.options }>{data.label}</Checkbox>
                </Col>)}
              </Row>
            </Checkbox.Group>
          </Form.Item>,

          
          // 日期选择框
          item.type === 'datePicker' &&
          <Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={[{ required: item.required, message: `请输入${item.title}` }]}
          >
           <DatePicker
              placeholder={`请选择${item.title}`}
              disabled={item.disabled || false}
              showTime
              format={item.format || 'YYYY-MM-DD HH:mm:ss'}
              onChange={(value, dateString) => callback(item.key, dateString,item.type)}
              { ...item.options }
            />
          </Form.Item>,

          // 时间范围选择框
          item.type === 'RangePicker' &&
          <Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={[{ required: item.required, message: `请输入${item.title}` }]}
          >
          <RangePicker
              placeholder={['开始时间', '结束时间']}
              disabled={item.disabled || false}
              format={item.format || 'YYYY-MM-DD'}
              onChange={(value, dateString) => callback(item.key, dateString,item.type)}
              { ...item.options }
            />
          </Form.Item>
        ]}
      </div>
    }
    return (<div>
      <Row>
        <Form {...layout} ref={form}>
          {formConfig.map((item, index) =>
            <div key={index}>
              {/* <Form.Item
      label={item.title}
      name={item.key}
      rules={[{ required: item.required, message:`请输入${item.title}` }]}
    > */}
              {content(item, index)}
              {/* </Form.Item> */}
            </div>
          )}

        </Form>
      </Row>
    </div>);
  }
}

export default FormConfig;