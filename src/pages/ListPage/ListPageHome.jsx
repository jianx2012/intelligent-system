import React from 'react';
import { Switch,Route } from "react-router-dom";
import ListPage from "./ListPage";
import ListPageAdd from "../ListPageAdd/ListPageAdd";
import ListPageDetail from "../ListPageDetail/ListPageDetail";
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
        <Route path='/listpage' component={ListPage} exact/>
        <Route path='/listpage/listpageadd' component={ListPageAdd} />
        <Route path='/listpage/listpagedetail' component={ListPageDetail} />
      </Switch>
    );
  }
}

export default WorkSpaceHome;