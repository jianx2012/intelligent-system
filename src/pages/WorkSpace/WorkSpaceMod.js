
import { observable, action, runInAction, autorun } from 'mobx';
import Serv from '../../api'
// eslint-disable-next-line react-hooks/rules-of-hooks
// useStrict(true);


class WorkSpaceMod {
    @observable state = {
      approvallist:[],
      pageInfo:{}
    }

    @action getApprovalList(){
        let result = Serv.reqworkList()
        console.log(result);
        this.state.approvallist = result.list
        this.state.pageInfo = {
          pageNum: result.pageNum,
          pageSize: result.pageSize,
          total: result.total
        }

    }



}

const workSpaceMod = new WorkSpaceMod();

export default workSpaceMod;