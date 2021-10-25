import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PaystackedButton from "./PaystackedButton";
import QRCode from "qrcode.react";

import Wrapper from "./../../Components/Wrapper";
import Collapse from "./Collapse";

import styles from "./style.module.scss";

class Fund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: false,
      qr: false,
      account: false,
      amount: 0,
      readyToPay: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ readyToPay: true });
  };

  switchStatus(id) {
    switch (id) {
      case "card":
        this.setState({
          card: true,
          qr: false,
          account: false,
        });
        break;
      case "qr":
        this.setState({
          card: false,
          qr: true,
          account: false,
        });
        break;
      case "account":
        this.setState({
          card: false,
          qr: false,
          account: true,
        });
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>PeerPay | Wallet Fund </title>
        </Helmet>
        <div className={styles.Funding}>
          {this.state.readyToPay ? (
            <div className={styles.FundingBlock}>
              <Collapse
                status={this.state.card}
                switchStatus={() => this.switchStatus("card")}
                title="Use A Card"
              >
                <PaystackedButton amount={this.state.amount} />
              </Collapse>
              <Collapse
                status={this.state.qr}
                switchStatus={() => this.switchStatus("qr")}
                title="Accept with QR Scan"
              >
                <QRCode
                  value={`http://localhost:3000/login?phoneNumber=qudusayo&password=qudusayo#`}
                  size={250}
                  bgColor={"#ffffff"}
                  fgColor={"#6055A9"}
                  level={"M"}
                  includeMargin={false}
                  renderAs={"svg"}
                  imageSettings={{
                    src: "https://i.ibb.co/tZY7Kny/peerpay.png",
                    x: null,
                    y: null,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </Collapse>
              <Collapse
                status={this.state.account}
                switchStatus={() => this.switchStatus("account")}
                title="Use Dedicated Account"
              >
                Coming Soon
              </Collapse>
            </div>
          ) : (
            <form className={styles.FundingAmount} onSubmit={this.onSubmit} >
              <label>Amount</label>
              <span className={styles.inputSymbolNaira}>
                <input
                  type="number"
                  id="amount"
                  value={this.state.amount}
                  onChange={this.onChange}
                />
              </span>
              <button>Proceed</button>
            </form>
          )}
        </div>
      </Wrapper>
    );
  }
}

export default Fund;
