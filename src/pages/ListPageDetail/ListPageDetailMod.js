
import { observable, action, runInAction, autorun } from 'mobx';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { cloneDeep } from 'lodash';
// eslint-disable-next-line react-hooks/rules-of-hooks
// 搜索条件
const queryList = [

    { name: '搜索条件', key: 'state', type: 'select', value: '', list: [] },
    // { name: '所属区域项目', key: 'projectIds', type: 'cascader', value: [], list: [] },
    { name: '模板名称', key: 'name', type: 'text', value: '' },
  ];
  const defaultState = {
    queryList,
    pageNum: 1,
    pageSize: 10,
    loading: false,
      // 表格页面配置
}
class ListPageDetailMod {
    @observable state = cloneDeep(defaultState);

    // @action updateStore(key ,value){
    //     this.state[key] = value
    // }

    @action setVal = (key, val) => this.state[key] = val
    
    // 初始化函数
    @action
    initState () {
        this.state = cloneDeep(defaultState);
    }

    // 保存函数
    @action
    updateStore (payload) {
        this.state = { ...this.state, ...payload };
    }


}

const listPageDetailMod = new ListPageDetailMod();

export default listPageDetailMod;