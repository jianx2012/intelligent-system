import React from 'react';
// import { Form } from 'antd';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
@inject("HomeMod")
@withRouter
@observer
class Home extends React.Component {
  constructor (props) {
    super(props);
    this.store = this.props.HomeMod;
    this.state = {
  
    };
  }
  
  componentDidMount () {
  
    }
    
  render () {
    let {a} = this.store.state
    console.log(a);
    return (<div>
            <i className='iconfont iconuser'></i> home
    </div>);
  }
}

export default Home;