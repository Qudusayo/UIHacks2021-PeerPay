import React from "react";
import { Switch, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.scss";

import Dashboard from "./Routes/Dashboard";
import Qr from "./Routes/Qr";
import Payment from "./Routes/Payment";

function App() {
  return (
    <Switch>
      <Route path='/' exact > 
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>PeerPay</h2>
            <p>Making Peer Payment Simpler.</p>
          </header>
        </div>
      </Route>
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/qr' component={Qr} />
      <Route path='/transfer' component={Payment} />
    </Switch>
  );
}

export default App;
