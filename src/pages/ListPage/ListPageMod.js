
import { observable, action, runInAction, autorun } from 'mobx';
import Serv from '../../api'
// eslint-disable-next-line react-hooks/rules-of-hooks
// useStrict(true);


class ListPageMod {
    @observable state = {
      approvallist:[],
      pageInfo:{}
    }

    @action getApprovalList(){
        let result = Serv.reqlistPage()
        console.log(result);
        this.state.approvallist = result.list
        this.state.pageInfo = {
          pageNum: result.pageNum,
          pageSize: result.pageSize,
          total: result.total
        }

    }



}

const listPageMod = new ListPageMod();

export default listPageMod;