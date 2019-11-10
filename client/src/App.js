import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AllCustomers from './components/customer/AllCustomers.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/customer" component={AllCustomers}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
