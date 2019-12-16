import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './component/Navbar';
import TableList from './component/table/TableList';
import Orders from './component/Orders';
import Product from './component/product/Product'
import Default from './component/Default'


class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={TableList}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/product" component={Product}/>
          <Route component={Default}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
