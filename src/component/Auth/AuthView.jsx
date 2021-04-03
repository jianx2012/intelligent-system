import React from 'react';
import { inject, observer } from 'mobx-react';

import { withRouter } from 'react-router-dom';
import { Popconfirm, Button, Modal, Icon } from 'antd';
import { cloneDeep, isEmpty, find, get } from 'lodash';
// import cx from 'classnames';
import styles from './AuthLess.less';

// @inject('AppStore')
@withRouter
@observer
class Auth extends React.Component {
  constructor (props) {
    super(props);
    // this.stores = this.props.AppStore;
    this.state = {
      // 权限
      resAction: []
    };
  }
  
  componentDidMount () {
    // 对传入的数据进行处理
    this.handleProps(this.props);
  }
  
  componentWillReceiveProps (nextProps) {
    // 收到新的数据，重新处理
    this.handleProps(nextProps);
  }
  
  // 对传入的数据进行处理
  handleProps (props) {
    // 获取当前的路由
    let path = get(props, 'match.path', '');
    let { actionBtn = [], needFilter = true, isCutLine = false } = props;
    
    // 根据当前模块对应的链接，从本地缓存中，获取进入路由时保存的数据
    // const limitsLocalData = this.stores.state[config.authPath];
    // 从本地缓存中，获取能够操作的按钮
    // const limits = (limitsLocalData && limitsLocalData[path]) ? limitsLocalData[path] : [];
    // 操作按钮权限过滤 - 使用本地菜单时，不做权限过滤
    // const action = actionBtn.filter(item => ((!needFilter || limits.includes(item.key) || get(config, 'needTempUserAuthFlag', false) || item.show) && !item.hide));
    const action = actionBtn.filter(item => !item.hide);
    
    // 根据isCutLine字段，判断是否需要分割线
    const resAction = [];
    // action.forEach((item, index) => {
      action.forEach((item, index) => {
      if (isCutLine && index > 0) {
        resAction.push({ type: 'cutLine' }, item);
      } else {
        resAction.push(item);
      }
    });
    this.setState({ resAction });
  }
  
  // 显示警告弹窗
  showModal (item, e) {
    e.stopPropagation();
    Modal.confirm({
      className: 'confirm-modal',
      title: '确定？',
      onOk: () => item.callback(),
      ...item.modalOptions
    });
  }
  
  // 根据传入的参数决定当前的按钮类型
  buttonType (item, index, isConfirm = false, isModal = false) {
    // 判断需不需要绑定点击事件（气泡弹窗不需要点击事件）
    let isClick = { onClick: e => { e.stopPropagation(); item.callback(); } };
    if (isConfirm) {
      isClick = undefined;
    } else if (isModal) {
      isClick = { onClick: this.showModal.bind(this, item) };
    }
    if (item.type === 'button') {
      // 按钮
      return (<Button
        key={index}
        { ...isClick }
        { ...item.options }
      >{item.label}</Button>);
    } else if (item.type === 'icon') {
      // 图标
      return (<span
        key={index}
        title={item.label}
        className={`operate iconfont ${item.icon}` + (item.className ? ' ' + item.className: '')}
        { ...isClick }
        { ...item.options }
      ></span>);
    } else if (item.type === 'Icon') {
      // antd的图标
      return (<Icon
        key={index}
        type={item.icon}
        { ...isClick }
        { ...item.options }
      />)
    } else {
      // 文字
      return (<a
        key={index}
        { ...isClick }
        { ...item.options }
      >{item.label}</a>);
    }
  }
  
  render () {
    let { resAction } = this.state;
    let { isInterval = true, isCutLine, options } = this.props;
    // 当有分割线时，不需要间隔
    isInterval = isCutLine ? false : isInterval;
    
    return (
      <div className={styles.interval} { ...options }>
        {resAction.map((item, index) => {
          if (item.render) {
            // 自定义
            return item.render;
          } else if (item.type === 'cutLine') {
            // 分割线
            return (<span key={index} className="ant-divider" />);
          } else if (item.isConfirm) {
            // 需要显示气泡确认框进行二次确认
            return (<Popconfirm
              placement={item.placement ? item.placement : 'top'}
              key={index}
              title={item.confirmTitle}
              okText='确定'
              cancelText='取消'
              onConfirm={e => { e.stopPropagation(); item.callback(); }}
              { ...item.confirmOptions }
            >{this.buttonType(item, index, true)}</Popconfirm>);
          } else if (item.isModal) {
            // 需要显示弹窗提示
            return this.buttonType(item, index, false, true);
          } else {
            // 点击即触发
            return this.buttonType(item, index);
          }
        })}
      </div>
    );
  }
}

export default Auth;