import React, { Component } from "react";
import styles from './style.module.css'
import { Link } from 'react-router-dom'


import logo from './../../assets/icons/logo.svg'

export default class Signup extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header>
          <div className={styles.accountHead}>
            <div className={styles.icon}>
              <img src={logo} />
            </div>
            <div className={styles.accountSignIn}>
              Already using? <Link to='/login' >Sign in</Link>
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
              <form action="#">
                <div className={styles.input}>
                  <label for="fullName">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullname"
                    placeholder="Usman Akinyemi"
                  />
                </div>
                <div className={styles.input}>
                  <label for="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="usmanakinyemi202@gmail.com"
                  />
                </div>
                <div className={styles.input}>
                  <label for="phoneNumber">Phone Number</label>
                  <input type="tel" name="phoneNumber" id="phoneNumber" />
                </div>
                <div className={styles.input}>
                  <label for="password">Password</label>
                  <input type="password" name="password" id="password" />
                </div>
                <button type="submit">Sign Up</button>
                {/* <div id="checkbox">
                  <input type="checkbox" checked="checked" />
                  <span>
                    I agree to our Terms of Service and Privacy Policy
                  </span>
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
