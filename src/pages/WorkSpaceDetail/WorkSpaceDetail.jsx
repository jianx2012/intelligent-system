import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
// import TableDemo from '../../component/Table/TableDemo'
@inject("WorkSpaceDetailMod")
@withRouter
@observer
class WorkSpaceDetail extends React.Component {
  constructor (props) {
    super(props);
    this.store = this.props.WorkSpaceDetailMod;
    this.state = {
  
    };
  }
  
  componentDidMount () {
    // let path = new URLSearchParams(this.props.location.search.substring(this.props.location.indexOf('?'),this.props.location.length))
    let path = this.props.location.search
    path = new URLSearchParams(path.substring(1,this.props.location.length))
    // console.log(path,'ss');
    console.log(path.get('abc'),'path');
    // console.log( ,' this.params');
    // this.params = new URLSearchParams(location.hash.substring(location.hash.indexOf('?'), location.hash.length));
    }

  componentWillMount(){ 
  
  }  
  render () {

    return (<div>
         WorkSpaceAddaaa
    </div>);
  }
}

export default WorkSpaceDetail;