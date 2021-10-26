import React, { Component } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Spinner from "./../../Components/Spinner";

import logo from "./../../assets/icons/logo.svg";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      peerId: "",
      password: "",
      phoneNumber: "",
      processing: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
    console.log(process.env.REACT_APP_BACKEND_URI);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      fullName: this.state.fullName,
      peerId: this.state.peerId,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
    };

    console.log(data);

    this.setState({ processing: true });

    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/auth/signup`, data)
      .then((response) => {
        console.log(response.data);
        if (!response.data.error) {
          this.props.history.push("/login");
        } else {
          this.setState({ processing: false });
        }
        return Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        }).fire({
          icon: response.data.error ? "error" : "success",
          title: response.data.errorMsg,
        });
      })
      .catch((error) => {
        this.setState({ processing: false });
        return this.error("Error Fetching user info, Kindly try again");
      });
  };

  error = (msg) => alert(msg);

  render() {
    return (
      <div className={styles.container}>
        <header>
          <div className={styles.accountHead}>
            <div className={styles.icon}>
              <img src={logo} alt="logo" />
            </div>
            <div className={styles.accountSignIn}>
              Already using? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </header>
        <main>
          <div className={styles.accSetup}>
            <div className={styles.accSetupBenefit}>
              <h1>Create an account</h1>
              <div>
                <img src="pictures/shield.svg" alt="payment-shield" />
                <p> Secure payment through reliable partners</p>
              </div>
              <div>
                <img src="pictures/lightning.svg" alt="fast" />
                <p>Fast transfers</p>
              </div>
              <div>
                <img src="pictures/percentage.svg" alt="fair" />
                <p>Fair commisions</p>
              </div>
              <div>
                <img src="pictures/heartbeat.svg" alt="bestrate" />
                <p>Best available rates</p>
              </div>
              <div>
                <img src="pictures/thumbs.svg" alt="Convenience" />
                <p>Convenience</p>
              </div>
            </div>

            <div className={styles.accSetupForm}>
              <form onSubmit={this.onSubmit}>
                <div className={styles.input}>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.fullName}
                    autoComplete="off"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Usman Akinyemi"
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    autoComplete="off"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="usmanakinyemi202@gmail.com"
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor="peerId">PeerId</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.peerId}
                    autoComplete="off"
                    type="peerId"
                    name="peerId"
                    id="peerId"
                    placeholder="PeerId"
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.phoneNumber}
                    autoComplete="off"
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    autoComplete="off"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <button type="submit">
                  {this.state.processing ? <Spinner /> : "Sign Up"}
                </button>
                {/* <div id="checkbox">
                  <input type="checkbox" checked="checked" />
                  <span>
                    I agree to our Terms of Service and Privacy Policy
                  autoComplete='off'</
                  span>
                </div> */}
              </form>
            </div>
          </div>
        </main>
        <footer></footer>
      </div>
    );
  }
}
