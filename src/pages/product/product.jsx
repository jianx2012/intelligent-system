import React from 'react';
import { Switch,Route } from "react-router-dom";
import ProductDetail from "./product_detail";
import ProductHome from "./product_home";
import ProductOpt from "./product_opt";
class Product extends React.Component {
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
        <Route path='/product' component={ProductHome} exact/>
        <Route path='/product/option' component={ProductOpt} />
        <Route path='/product/detail' component={ProductDetail} />
      </Switch>
    );
  }
}

export default Product;