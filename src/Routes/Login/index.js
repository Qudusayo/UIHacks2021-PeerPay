import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "./../../Components/Spinner";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'

import logo from "./../../assets/icons/logo.svg";
import styles from "./style.module.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      processing: false,
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

    this.setState({ processing: true });

    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/auth/signin`, data)
      .then((response) => {
        console.log(response.data);
        if (response.data.authenticated) {
          Cookies.set("_peer__pay", response.data.authToken);
          return this.props.history.push("/dashboard");
        } else {
          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          }).fire({
            icon: 'error',
            title: response.data.errorMsg
          })
          return this.setState({ processing: false });
        }
      })
      .catch((error) => {
        this.setState({ processing: false });
        return this.error("Error Fetching user info, Kindly try again");
      });
  };

  error = (msg) => alert(msg);

  render() {
    return (
      <div className={styles.formComponent}>
        <div className={styles.logo}>
          <div className={styles.logoInfo}>
            <img crossOrigin="anonymous" src={logo} alt="logo" />
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
          <button type="submit">
            {this.state.processing ? <Spinner /> : "Sign In"}
          </button>
          <p><Link to='/register'> New User ? Sign Up</Link></p>
        </form>
      </div>
    );
  }
}

export default Login;
