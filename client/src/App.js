import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AllCustomers from './components/customer/AllCustomers.js'
import SingleCustomer from './components/customer/SingleCustomer.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/customer" component={AllCustomers}/>
          <Route exact path="/customer/:customerId" component={SingleCustomer}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
