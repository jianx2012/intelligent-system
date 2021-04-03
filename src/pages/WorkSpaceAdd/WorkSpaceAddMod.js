
import { observable, action, runInAction, autorun } from 'mobx';

// eslint-disable-next-line react-hooks/rules-of-hooks

class WorkSpaceAddMod {
    @observable state = {
      formItem:{
      },
      formArray:[],
      detailData:{}
    }

    @action setValue = (key,value)=>{
        this.state[key] = value;
    }
    @action clearState = () => {

    }




}

const workSpaceAddMod = new WorkSpaceAddMod();

export default workSpaceAddMod;