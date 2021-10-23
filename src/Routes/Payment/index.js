import React, { Component } from "react";
import { Helmet } from "react-helmet";

import Wrapper from "./../../Components/Wrapper";
import Scan from "./../Qr/Scan";

import styles from "./style.module.scss";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: "qr",
    };
  }

  switchPaymentType(type) {
    this.setState({ paymentType: type })
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>PeerPay | Qr scan </title>
        </Helmet>
        <div className={styles.payment}>
          <div className={styles.paymentType}>
            <h1>Peer Pay</h1>
            <div className={styles.paymentTypeSelection}>
              <div onClick={() => this.switchPaymentType('qr')} >
                <h2>Qr Scan</h2>
              </div>
              <div onClick={() => this.switchPaymentType('form')} >
                <h2>Manual Transfer</h2>
              </div>
            </div>
          </div>
          <div className={styles.paymentForm}>
            {this.state.paymentType === "qr" ? (
              <Scan newClass="scanForm" />
            ) : (
              <form className={styles.Form}>
                <div>
                  <label htmlFor="peerId">PeerId</label>
                  <input type="text" id="peerId" />
                </div>
                <div>
                  <label htmlFor="amount">Amount</label>
                  <span className={styles.inputSymbolNaira}>
                    <input type="number" id="amount" />
                  </span>
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <input type="text" id="description" />
                </div>
                <button type="button">Transfer</button>
              </form>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Payment;
