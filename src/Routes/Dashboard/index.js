import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Wrapper from "./../../Components/Wrapper";

import RecentCard from "./RecentCard";

import send from "./../../assets/icons/send.svg";
import plus from "./../../assets/icons/plus.svg";
import recieve from "./../../assets/icons/recieve.svg";

import styles from "./style.module.scss";

class index extends Component {
  componentDidMount() {
    console.log("mounted");
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
                <h1>₦ 80,000</h1>
              </div>
              <div className={styles.balanceCardControllers}>
                <Link to='/fund' >
                  <div>
                    <img src={plus} alt="plus" width="25" />
                  </div>
                </Link>
                <div>
                  <img src={send} alt="send" width="25" />
                </div>
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
              <div>
                <RecentCard />
                <RecentCard />
                <RecentCard />
                <RecentCard />
                <RecentCard />
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
