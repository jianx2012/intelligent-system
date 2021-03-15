import React from 'react';
class FormConfig extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
  
    };
  }
  
  componentDidMount () {
    }

  componentWillMount(){ 
  
  }  
  render () {
    let { form = {}, formConfig = [], actionData = {}, callback, options = {} } = this.props;
    console.log(formConfig,'ss');
    return (<div>
        
    </div>);
  }
}

export default FormConfig;