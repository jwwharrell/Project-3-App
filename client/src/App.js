import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard.js'
import AllCustomers from './components/customer/AllCustomers.js'
import AddNewCustomer from './components/customer/AddNewCustomer.js'
import SingleCustomer from './components/customer/SingleCustomer.js'
import EntireInventory from './components/inventory/EntireInventory.js'
import AddNewInventoryItem from './components/inventory/AddNewInventoryItem.js'
import SingleInventoryItem from './components/inventory/SingleInventoryItem'
import EveryInvoice from './components/invoice/EveryInvoice.js'
import AddNewInvoice from './components/invoice/AddNewInvoice.js'
import SingleInvoice from './components/invoice/SingleInvoice.js'
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
          <Route exact path="/inventory/new-piece" component={AddNewInventoryItem}/>
          <Route exact path="/inventory/:inventoryId" component={SingleInventoryItem}/>
          <Route exact path="/all-invoices" component={EveryInvoice}/>
          <Route exact path="/all-invoices/create-invoice/:customerId" component={AddNewInvoice}/>
          <Route exact path="/all-invoices/:invoiceId" component={SingleInvoice}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
