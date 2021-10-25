import React, { Component } from "react";
import { Helmet } from "react-helmet";
import transfer from "../../controllers/transfer";

import Wrapper from "./../../Components/Wrapper";
import Scan from "./../Qr/Scan";

import styles from "./style.module.scss";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: "form",
      peerId: "",
      amount: "",
      description: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const transferResponse = await transfer(
      this.state.peerId,
      this.state.amount,
      this.state.description
    );

    console.log(transferResponse);
  };

  error = (msg) => alert(msg);

  switchPaymentType(type) {
    this.setState({ paymentType: type });
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>PeerPay | Qr scan </title>
        </Helmet>
        <div className={styles.payment}>
          <div className={styles.paymentType}>
            <div className={styles.paymentTypeSelection}>
              <div onClick={() => this.switchPaymentType("qr")}>
                <h2>Qr Scan</h2>
              </div>
              <div onClick={() => this.switchPaymentType("form")}>
                <h2>Manual Transfer</h2>
              </div>
            </div>
          </div>

          <div className={styles.paymentForm}>
            {this.state.paymentType === "qr" ? (
              <Scan newClass="scanForm" />
            ) : (
              <form className={styles.Form} onSubmit={this.onSubmit}>
                <div>
                  <label htmlFor="peerId">PeerId</label>
                  <input
                    autoComplete='off'
                    onChange={this.onChange}
                    type="text"
                    id="peerId"
                  />
                </div>
                <div>
                  <label htmlFor="amount">Amount</label>
                  <span className={styles.inputSymbolNaira}>
                    <input
                      autoComplete='off'
                      onChange={this.onChange}
                      type="number"
                      id="amount"
                    />
                  </span>
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <input
                    autoComplete='off'
                    onChange={this.onChange}
                    type="text"
                    id="description"
                  />
                </div>
                <button type="submit">Transfer</button>
              </form>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Payment;
