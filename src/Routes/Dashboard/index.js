import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import axios from "axios";
import Wrapper from "./../../Components/Wrapper";

import RecentCard from "./RecentCard";

import send from "./../../assets/icons/send.svg";
import plus from "./../../assets/icons/plus.svg";
import recieve from "./../../assets/icons/recieve.svg";

import styles from "./style.module.scss";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
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
        // console.log(res.data);
        this.setState({
          transactions: res.data.transactions.reverse().slice(0, 9),
          balance: res.data.balance
        });
      });
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>PeerPay | Dashboard </title>
        </Helmet>
        <div className={styles.dashboard}>
          <div className={styles.dashboardPanel1}>
            <div className={styles.balanceCard}>
              <div className={styles.balanceCardContent}>
                <span>Balance</span>
                <h1>₦ {parseFloat(this.state.balance).toFixed(2)}</h1>
              </div>
              <div className={styles.balanceCardControllers}>
                <Link to="/fund">
                  <div>
                    <img src={plus} alt="plus" width="25" />
                  </div>
                </Link>
                <Link to="/transfer">
                  <div>
                    <img src={send} alt="send" width="25" />
                  </div>
                </Link>
                <div>
                  <img src={recieve} alt="recieve" width="25" />
                </div>
              </div>
            </div>
            <div className={styles.recent}>
              <div className={styles.recentHeader}>
                <h3>Recent Activity</h3>
                <h3>
                  <Link to="/transactions">See All &gt;</Link>
                </h3>
              </div>
              <div className={styles.recentHeaderTransactions} >
                {/* <RecentCard />
                <RecentCard />
                <RecentCard />
                <RecentCard />
                <RecentCard /> */}

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

export default index;
