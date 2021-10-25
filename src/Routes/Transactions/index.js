import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import axios from "axios";
import Wrapper from "./../../Components/Wrapper";

import RecentCard from "../Dashboard/RecentCard";

import styles from "./style.module.scss";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }
  componentDidMount() {
    // console.log("mounted");
    const api = `http://localhost:4000/clientTransaction`;
    const token = Cookies.get("_peer__pay");
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        this.setState({
          transactions: res.data.transactions.reverse(),
        });
        // console.log(res.data);
      });
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>PeerPay | Transactions </title>
        </Helmet>
        <div className={styles.dashboard}>
          <div className={styles.dashboardPanel1}>
            <div  className={styles.dashboardPanel1Nav}>
              Transactions
            </div>
            <div className={styles.recent}>
              <div className={styles.recentHeaderTransactions} >
                {this.state.transactions.length ? (
                  this.state.transactions.map((transaction) => (
                    <RecentCard
                      key={transaction.id}
                      peerId={transaction.to}
                      date={transaction.date}
                      amount={transaction.amount}
                    />
                  ))
                ) : (
                  <span
                    style={{
                      display: "block",
                      margin: "auto",
                      textAlign: "center",
                      color: "#E7EAF3",
                      border: "1px solid #E7EAF3",
                      padding: "1em 0",
                      borderRadius: "12px",
                    }}
                  >
                    No Recent Transactions
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.dashboardPanel2}></div>
        </div>
      </Wrapper>
    );
  }
}

export default Transactions;
