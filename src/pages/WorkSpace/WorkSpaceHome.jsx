import React from 'react';
import { Switch,Route } from "react-router-dom";
import WorkSpace from "./WorkSpace";
import WorkSpaceAdd from "../WorkSpaceAdd/WorkSpaceAdd";
import WorkSpaceDetail from "../WorkSpaceDetail/WorkSpaceDetail";
import Hook from './hook'
class WorkSpaceHome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  
  componentDidMount () {
  
    }
    
  render () {

    return (
      <Switch>
        <Route path='/workspace' component={WorkSpace} exact/>
        <Route path='/workspace/workadd' component={WorkSpaceAdd} />
        <Route path='/workspace/workdetail' component={WorkSpaceDetail} />
        <Route path='/workspace/hook' component={Hook} />
      </Switch>
    );
  }
}

export default WorkSpaceHome;