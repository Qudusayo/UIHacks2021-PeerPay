import React, { Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

import logo from "./../../assets/icons/logo.svg";
import styles from "./style.module.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
    };

    axios
      .post(`http://localhost:4000/auth/signin`, data)
      .then((response) => {
        console.log(response.data)
        Cookies.set('_peer__pay', response.data.authToken, { expires: 1/48 })
        return this.props.history.push('/dashboard')
      })
      .catch((error) => {
        return this.error("Error Fetching user info, Kindly try again");
      });
  };

  error = (msg) => alert(msg);

  render() {
    return (
      <div className={styles.formComponent}>
        <div className={styles.logo}>
          <div className={styles.logoInfo}>
            <img src={logo} alt="logo" />
            <h2>PeerPay</h2>
          </div>
          <span>Account Login</span>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className={styles.input}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              onChange={this.onChange}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default Login;
