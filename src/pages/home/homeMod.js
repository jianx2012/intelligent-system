
import { observable, action, runInAction, autorun } from 'mobx';

// eslint-disable-next-line react-hooks/rules-of-hooks
// useStrict(true);
class HomeMod {
    @observable state = {
        a:'test'
    }





}

const homeMod = new HomeMod();

export default homeMod;