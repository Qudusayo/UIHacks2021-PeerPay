import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import Wrapper from "./../../Components/Wrapper";

import RecentCard from "../Dashboard/RecentCard";

import styles from "./style.module.scss";

class Settings extends Component {
  componentDidMount() {
    // console.log("mounted");
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>PeerPay | Transactions </title>
        </Helmet>
        <div className={styles.dashboard}>
          <div className={styles.dashboardPanel1}>
            <div className={styles.dashboardPanel1Nav}>Settings</div>
            <div className={styles.recent}>
              <div className={styles.recentHeaderTransactions}>
                <Link to='/login' >
                <span
                  style={{
                    display: "block",
                    margin: "auto",
                    textAlign: "center",
                    color: "#F00",
                    border: "1px solid #E7EAF3",
                    padding: "1em 0",
                    borderRadius: "12px",
                  }}
                >
                  Logout
                </span></Link>
              </div>
            </div>
          </div>
          <div className={styles.dashboardPanel2}></div>
        </div>
      </Wrapper>
    );
  }
}

export default Settings;
