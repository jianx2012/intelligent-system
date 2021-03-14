
import { observable, action, runInAction, autorun } from 'mobx';

// eslint-disable-next-line react-hooks/rules-of-hooks
// useStrict(true);
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];


class WorkSpaceMod {
    @observable state = {
        obj:[{
          _id:1,
          name:'请假表',
          desc:'所有人请假通道',
          creator:'admin',
          status:'1',//进行中
          manager:['admin'],
          folder:[
            {
              title:'姓名',
              key:'file1',
              dataIndex:'file1',
              type:'input',//文本框，单选，多选，复选，文本域，附件上传
              required:'1',//1必填，2非必填
              isShow:'1',//是否显示列表
            },
            {
              title:'年龄',
              key:'file2',
              dataIndex:'file2',
              type:'inputNumber',//文本框，单选，多选，复选，文本域，附件上传，日期选择
              required:'1',//1必填，2非必填
              isShow:'1',//是否显示列表
            },
            {
              title:'性别',
              key:'file3',
              dataIndex:'file3',
              type:'inputNumber',//文本框，单选，多选，复选，文本域，附件上传，日期选择
              required:'1',//1必填，2非必填
              isShow:'1',//是否显示列表
            },
          ]
        }
        ]
    }





}

const workSpaceMod = new WorkSpaceMod();

export default workSpaceMod;