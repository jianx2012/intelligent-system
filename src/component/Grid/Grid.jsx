/**
 * @(#)Grid.jsx 0.5.1 2017-09-13
 * Copyright (c) 2017, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import React from 'react';
import { Table } from 'antd';
import { cloneDeep, isEmpty } from 'lodash';
import cx from 'classnames';
import styles from './Grid.less';
// import '../../assets/css/modal.less'

class TableComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    if(props.valLength != this.props.valLength) {
      props.onChange()
    }
  }
  
  //分页控件
  pagination () {
    let { pageChange, data, pageOptions } = this.props;
    let { tableData, pageConfig } = data;
    const { total } = tableData;
    
    return {
      pageSize: pageConfig.pageSize,
      showTotal: total => `共 ${total} 条`,
      showQuickJumper: true,
      current: pageConfig.current || 1,
      total,
      showSizeChanger: true,
      onChange: (current, pageSize) => pageChange(current, pageSize),
      pageSizeOptions: pageConfig.pageSizeOptions || ['10', '20', '30', '40'],
      onShowSizeChange: (current, pageSize) => pageChange(current, pageSize),
      ...pageOptions
    }
  };

  handleChange( record, selected, selectedRows, nativeEvent ){
    console.log("00000000000000:",record, selected, selectedRows, nativeEvent)
    if(selected){
      this.props.selectedKeysChange && this.props.selectedKeysChange(selectedRows)
    }
    
  }
  
  render () {
    let { data, paginationFlag = true, scroll, loading, disableVerify, isDisplayOrder = false,
      rowSelectionOptions, className, option, selectedKeysChange, type } = this.props;
    const { columns, tableData, selectedRowKeys, pageConfig = {} } = data;
    const { total, dataSource } = tableData;
    const { current = 1, pageSize = 0 } = pageConfig;
    
    const rowSelection = {
      selectedRowKeys,
      type: type ? type : 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => selectedKeysChange(selectedRowKeys,selectedRows),
      getCheckboxProps: record => ({
        disabled: disableVerify ? disableVerify(record) : false,
      }),
      ...rowSelectionOptions
    };
    
    const copyDataSource = dataSource.map((item, index) => {
      return {
        key: item.id || index,
        ...item
      };
    });
    
    let copyColumns = cloneDeep(columns);
    copyColumns = copyColumns.filter(item => !item.hide);
    isDisplayOrder && copyColumns.unshift({
      title: '序号',
      width: 60,
      dataIndex: 'commonOrder',
      key: 'commonOrder',
      // render: (data, record, index) => (current - 1) * pageSize + index + 1
      render: (data, record, index) => index + 1
    });
    
    return (<Table
      className={className}
      columns={copyColumns}
      rowSelection={selectedRowKeys ? rowSelection : null}
      dataSource={copyDataSource}
      loading={loading}
      scroll={{ y: (!isEmpty(copyDataSource) && copyDataSource.length > 15) ? 500: undefined, ...scroll}}
      pagination={paginationFlag ? this.pagination() : false}
      { ...option }
    />);
  }
}

export default TableComponent;