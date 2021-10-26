import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.scss";

import Dashboard from "./Routes/Dashboard";
import Qr from "./Routes/Qr";
import Payment from "./Routes/Payment";
import Fund from "./Routes/Fund";
import Login from './Routes/Login'
import Signup from "./Routes/Signup";
import Transactions from "./Routes/Transactions";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <div className="App">
          <header className="App-header">
            <img crossOrigin='anonymous' src={logo} className="App-logo" alt="logo" />
            <h2>PeerPay</h2>
            <p>Making Peer Payment Simpler.</p>
            <Link to="/login">
              <button>Get Started </button>
            </Link>
          </header>
        </div>
      </Route>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/qr" component={Qr} />
      <Route path="/transfer" component={Payment} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Signup} />
      <Route path="/fund" component={Fund} />
      <Route path="/transactions" component={Transactions} />
    </Switch>
  );
}

export default App;
