import React, { Component } from "react";
import QrReader from "react-qr-reader";

import styles from "./style.module.scss";

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "No result",
    };
  }

  getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  handleScan = (data) => {
    let validPeerLink = data && data.startsWith('https://peerpay.vercel.app/transfer');
    let info = {
      peerId: this.getParameterByName('peerId', data),
      amount: this.getParameterByName('amount', data),
      description: this.getParameterByName('description', data)
    }
    if (data) {
      // console.log(validPeerLink, info);
      return this.props.scanResponse(info);
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div
        className={[
          styles.scan,
          this.props.newClass ? styles[this.props.newClass] : null,
        ].join(" ")}
      >
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
      </div>
    );
  }
}

export default Scan;
