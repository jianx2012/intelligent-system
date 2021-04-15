import React from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import {
    PlusOutlined,
    RightOutlined,
} from '@ant-design/icons';
// import AddForm from "./add_form";
// import UpdataForm from "./updata_form";
import Serv from '../../api'
class Announcement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            list: '',
        };
    }

    onAdd = () => {
        this.props.history.push('/announcementadd')
    }

    getList = async () => {
        this.setState({ loading: true })
        const result = await Serv.reqAnnouncementList()
        this.setState({ loading: false })
        if (result.status == 0) {
            let { list } = result.data
            console.log(list, 'list');
            this.setState({ list })
        }
    }
    onCheck = (record)=>{
        let id = record._id
        this.props.history.push(`announcementdetail?id=${id}`)  
    }
    componentDidMount() {
        this.getList()

    }
    //初始化table所有列的数组

    componentWillMount() {
        //  this.initColumns()
        this.columns = [
            {
                title: '公告名称',
                dataIndex: 'title',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
            },
            {
                title: '状态',
                render:(record)=>{
                    let status 
                    if(record.status == 1){
                        status = '进行中'
                    }else if(record.status == 2){
                        status = '草稿'
                    }else{
                        status = '结束'
                    }
                   return <span>{status}</span>
                }
            },
            {
                title: '操作',
                fixed: 'right',
                width: 200,
                render: (record) => (
                    <span>
                        <a style={{ marginRight: 24 }} onClick={() => { this.onAdd(record) }}>编辑</a>
                         <a onClick={() => { this.onCheck(record) }}>查看</a> 
                    </span>
                )
            },
        ]
    }

    render() {
        const { loading,  list, } = this.state
        const extra = (
            <Button type="primary" onClick={() => this.onAdd()}>
                <PlusOutlined /> 新增
            </Button>
        )

        return (<div>
            <Card title='公告中心' extra={extra} bordered={false}>
                <Table bordered dataSource={list} columns={this.columns} rowKey='_id' loading={loading} />
            </Card>


        </div>);
    }
}

export default Announcement;