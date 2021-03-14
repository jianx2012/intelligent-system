import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
// import TableDemo from '../../component/Table/TableDemo'
@inject("WorkSpaceAddMod")
@withRouter
@observer
class WorkSpaceAdd extends React.Component {
  constructor (props) {
    super(props);
    this.store = this.props.WorkSpaceAddMod;
    this.state = {
  
    };
  }
  
  componentDidMount () {
  
    }

  componentWillMount(){ 
  
  }  
  render () {

    return (<div>
         WorkSpaceAddaaa
    </div>);
  }
}

export default WorkSpaceAdd;