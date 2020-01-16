import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/materialLayouts/Header.js'
import Footer from './components/materialLayouts/Footer.js'
import AddNewCustomer from './components/customer/AddNewCustomer.js'
import SingleCustomer from './components/customer/SingleCustomer.js'
import AddNewInventoryItem from './components/inventory/AddNewInventoryItem.js'
import SingleInventoryItem from './components/inventory/SingleInventoryItem'
import AddNewInvoice from './components/invoice/AddNewInvoice.js'
import SingleInvoice from './components/invoice/SingleInvoice.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Footer} />
          <Route exact path="/customer/create-customer" component={AddNewCustomer} />
          <Route exact path="/customer/:customerId" component={SingleCustomer} />
          <Route exact path="/inventory/new-piece" component={AddNewInventoryItem} />
          <Route exact path="/inventory/:inventoryId" component={SingleInventoryItem} />
          <Route exact path="/all-invoices/create-invoice/:customerId" component={AddNewInvoice} />
          <Route exact path="/all-invoices/:invoiceId" component={SingleInvoice} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
