/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import {
    PlusOutlined,
    RightOutlined,
} from '@ant-design/icons';
// import AddForm from "./add_form";
// import UpdataForm from "./updata_form";
import Serv from '../../api'
import storageUtils from "../../utils/storageUtils";
class Announcement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            list: '',
            userInfo:{},
        };
    }

    onAdd = () => {
        this.props.history.push('/announcementadd')
    }

    getList = async () => {
        let userInfo = storageUtils.getUser()
        this.setState({ loading: true })
        const result = await Serv.reqAnnouncementList()
        this.setState({ loading: false })
        if (result.status == 0) {
            let { list } = result.data
            if(userInfo.role !=='管理员'){
                list = list.filter(item=>{
                    return item.status === 1
                 
                })
              
            }
            console.log(list, 'list');
            this.setState({ list })
        }
    }
    onCheck = (record) => {
        let id = record._id
        this.props.history.push(`announcementdetail?id=${id}`)
    }
    componentDidMount() {
        this.getList()
      

    }
    //初始化table所有列的数组
    onStatus = async (record, type) => {
        
        //type 1上线 2下架 3删除
        let params = {
            id: record._id
        }
        let result
        switch (type) {
            case 1:
                console.log(record, 'record');
                params.state = 1

                result = await Serv.reqUpdateAnnounce(params)
                if (result.status === 0) {
                    this.getList()
                    message.success('编辑成功')
                }
                break;
            case 2:
                console.log(record, 'record');
                params.state = 3
                console.log(params, 'params');
                result = await Serv.reqUpdateAnnounce(params)
                if (result.status === 0) {
                    this.getList()
                    message.success('编辑成功')
                }
                break
            case 3:
                result = await Serv.reqDeleteAnnounce(params)
                if (result.status === 0) {
                    this.getList()
                    message.success('删除成功')
                }
                break
            default:
                break;
        }
    }
    componentWillMount() {
        //  this.initColumns()
        let userInfo = storageUtils.getUser()
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
                render: (record) => {
                    let status
                    if (record.status == 1) {
                        status = '进行中'
                    } else if (record.status == 2) {
                        status = '草稿'
                    } else {
                        status = '结束'
                    }
                    return <span>{status}</span>
                }
            },
            {
                title: '操作',
                fixed: 'right',
                width: 150,
                render: (record) => (
                    <span>
                    {userInfo.role=='管理员' && <span>
                        <a style={{ marginRight: 24 }} onClick={() => { this.onAdd(record) }}>编辑</a>
                        <a style={{ marginRight: 24 }} onClick={() => { this.onStatus(record, 1) }}>上线</a>
                        {record.status == 1 && <a style={{ marginRight: 24 }} onClick={() => { this.onStatus(record, 2) }}>下架</a>}
              {record.status == 3 &&<a style={{ marginRight: 24 }} onClick={() => { this.onStatus(record, 3) }}>删除</a>}
                    </span>}
                    <span>
                        <a onClick={() => { this.onCheck(record) }}>查看</a>
                    </span>
                    </span>
                )
            },
        ]
    }

    render() {
        let userInfo = storageUtils.getUser()
        const { loading, list, } = this.state
        const extra = (
       
            <Button type="primary" onClick={() => this.onAdd()}>
                <PlusOutlined /> 新增
            </Button>
        
        )

        return (<div>
            <Card title='公告中心' extra={userInfo.role=='管理员'?extra:undefined} bordered={false}>
                <Table bordered dataSource={list} columns={this.columns} rowKey='_id' loading={loading} />
            </Card>


        </div>);
    }
}

export default Announcement;