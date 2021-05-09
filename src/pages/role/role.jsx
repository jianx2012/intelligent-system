import React from 'react';
import { Table } from 'antd';
import Serv from "../../api/index";
class Rote extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource:[]
    };
  }
  
 async componentDidMount () {
    const result = await Serv.reqRoles()
    if(result.status == 0){
        this.setState({dataSource:result.data})
    }
    // const result1 = await Serv.reqAddRole('管理员')
    }
    
  render () {
    let { dataSource } = this.state
    
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '角色描述',
        dataIndex: 'role_desc',
        key: 'role_desc',
      },
    ];
    return (<div>
           <Table dataSource={dataSource} columns={columns} />;
    </div>);
  }
}

export default Rote;