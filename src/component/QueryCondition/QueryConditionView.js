import React from 'react';
import { toJS } from 'mobx';
import { Row, Col, Form, Input, Select, Cascader, DatePicker, TreeSelect, Spin } from 'antd';
import { isEmpty, trim } from 'lodash';
import moment from 'moment';
import styles from './QueryConditionLess.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker, MonthPicker } = DatePicker;

// 栅格布局
const layout = {
   xxl: 6,
   xl: 8,
   lg: 8,
   md: 12,
   xs: 24
};

// 表单的布局
const formItemLayout = {
  labelCol: {
    xs: {span: 8},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 16},
    sm: {span: 16},
  },
};

class QueryCondition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render () {
    let { data = [], inputChange, onPressEnter, buttons } = this.props;
    
    let list = data.filter(item => !item.hide);
    
    return (
      <Row className='queryWrap' id="QueryCondition">
        {list.map((item, index) => {
          if (item.render) {
            // 自定义
            return item.render;
          } else if (item.type) {
            return (<Col className='layoutWrap' { ...layout } key={index} { ...item.layoutOption }>
              <FormItem className='formWrap' label={item.name} { ...formItemLayout } { ...item.formOption }>
                {/* 文本框 */}
                {item.type === 'text' && (<Input
                  value={item.value}
                  onChange={e => e.target.value.length < 36 && inputChange(item.key, trim(e.currentTarget.value))}
                  placeholder={'请输入' + item.name}
                  onPressEnter={onPressEnter ? onPressEnter : undefined}
                  { ...item.option }
                />)}
                
                {/* 选择框 */}
                {item.type === 'select' && ([
                  // Input type='hidden 解决在某些机器下，自动换行问题
                  <Input key="1" type='hidden'/>,
                  <Select
                    style={{width: '100%'}}
                    key="2"
                    value={item.value ? (item.noString ? item.value + '' : toJS(item.value)) : (item.notNeedAll ? undefined : 'all')}
                    placeholder={'请选择' + item.name}
                    getPopupContainer={() => document.getElementById('QueryCondition')}
                    onChange={(value, option) => inputChange(item.key, value === 'all' ? '' : toJS(value), option)}
                    notFoundContent={item.loading ? <Spin /> : '无匹配结果'}
                    { ...item.option }
                  >
                    {!item.notNeedAll && <Option value="all">全部</Option>}
                    {item.list.map((option, i) => <Option key={i} value={ item.noString ? option.value + '' : option.value} 
                      dataRef={option}
                    >
                      {option.label}
                    </Option>)}
                  </Select>
                ])}
                
                {/* 级联选择框 */}
                {item.type === 'cascader' && (<Cascader
                  style={{width: '100%'}}
                  value={!isEmpty(item.value) ? toJS(item.value) : (item.notNeedAll ? undefined : ['all'])}
                  placeholder={'请选择' + item.name}
                  options={item.notNeedAll ? toJS(item.list) : toJS([{ label: '请选择', value: 'all', key: 'all' }, ...item.list])}
                  onChange={v => inputChange(item.key, v)}
                  getPopupContainer={() => document.getElementById('QueryCondition')}
                  changeOnSelect
                  { ...item.option }
                />)}
                
                {/* 日期选择器 */}
                {item.type === 'time' && (
                <RangePicker
                  style={{width: '100%'}}
                  value={!isEmpty(item.value) ? [moment(item.value[0]), moment(item.value[1])] : []}
                  placeholder={['开始时间', '结束时间']}
                  onChange={(dates, dateStrings) => inputChange(item.key, (dateStrings[0] === '' && dateStrings[1] === '') ? [] : dateStrings)}
                  { ...item.options }
                />)}
                
                {/* 树选择框 */}
                {item.type === 'treeSelect' && (<TreeSelect
                  style={{width: '100%'}}
                  value={item.value ? item.value + '' : undefined}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  treeCheckStrictly
                  treeData={toJS(item.list)}
                  placeholder={'请选择' + item.name}
                  treeDefaultExpandAll
                  getPopupContainer={() => document.getElementById('QueryCondition')}
                  onChange={v => inputChange(item.key, v)}
                  { ...item.options }
                />)}
                
                {/* 自定义表单*/}
                {item.type === 'render' && item.render}
              </FormItem>
            </Col>);
          } else {
            return (<Col { ...layout }>{item.name}</Col>);
          }
        })}
        {buttons && <div style={{flex:1}}>{buttons}</div>}
      </Row>
    );
  }
}

export default QueryCondition;