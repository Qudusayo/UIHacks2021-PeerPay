import React, { Component } from "react";
import { Helmet } from "react-helmet";
import transfer from "../../controllers/transfer";
import Swal from "sweetalert2";
import qs from "qs";
import Spinner from "../../Components/Spinner";

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
      processing: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Transfer!",
    }).then(async (result) => {
      this.setState({ processing: true });
      if (result.isConfirmed) {
        const transferResponse = await transfer(
          this.state.peerId,
          this.state.amount,
          this.state.description
        );

        if (!transferResponse.data.error) {
          Swal.fire("Success!", "Your transfer was successful.", "success");
          this.setState({ processing: false });
          return this.setState({ peerId: "", amount: "", description: "" });
        } else {
          this.setState({ processing: false });
          Swal.fire("Failed!", transferResponse.data.message, "error");
        }
      }
    });
  };

  error = (msg) => alert(msg);

  switchPaymentType(type) {
    if (this.state.processing) return;
    this.setState({ paymentType: type });
  }

  componentDidMount() {
    let query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    const { peerId, amount, description } = query;
    this.setState({ peerId, amount, description });
    console.log(query);
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>PeerPay | Pay </title>
        </Helmet>
        <div className={styles.payment}>
          <span className={styles.header} >Transfer</span>
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
                    autoComplete="off"
                    onChange={this.onChange}
                    type="text"
                    id="peerId"
                    value={this.state.peerId}
                  />
                </div>
                <div>
                  <label htmlFor="amount">Amount</label>
                  <span className={styles.inputSymbolNaira}>
                    <input
                      autoComplete="off"
                      onChange={this.onChange}
                      type="number"
                      id="amount"
                      value={this.state.amount}
                    />
                  </span>
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <input
                    autoComplete="off"
                    onChange={this.onChange}
                    type="text"
                    id="description"
                    value={this.state.description}
                  />
                </div>
                <button type="submit">
                  {" "}
                  {this.state.processing ? <Spinner /> : "Transfer"}{" "}
                </button>
              </form>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Payment;
