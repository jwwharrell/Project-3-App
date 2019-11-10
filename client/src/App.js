import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard.js'
import AllCustomers from './components/customer/AllCustomers.js'
import AddNewCustomer from './components/customer/AddNewCustomer.js'
import SingleCustomer from './components/customer/SingleCustomer.js'
import EntireInventory from './components/inventory/EntireInventory.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/customer" component={AllCustomers}/>
          <Route exact path="/customer/create-customer" component={AddNewCustomer}/>
          <Route exact path="/customer/:customerId" component={SingleCustomer}/>
          <Route exact path="/inventory" component={EntireInventory}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
