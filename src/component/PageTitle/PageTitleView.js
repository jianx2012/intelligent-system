import React, { Component } from 'react';
import './PageTitleLess.less';

export default class PageTabs extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    let { style = {}, title, rightContent } = this.props;
    return (
      <div className='pageTitle'>
        <div className='title' style={style}>{title || ''}</div>
        <div>{rightContent}</div>
      </div>
    );
  }
}