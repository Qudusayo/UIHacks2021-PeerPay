import React from "react";
import logo from "./../../../assets/icons/logo.svg";

import styles from "./style.module.scss";

function RecentCard({ peerId, date, amount, positive }) {
  return (
    <div className={styles.recentCard}>
      <div className={styles.recentCardImage}>
        <div className={styles.recentCardImageMain}>
          <img crossOrigin="anonymous" src={logo} alt="logo" width="40" />
        </div>
        <div>
          <h2>{peerId}</h2>
          <span>{date}</span>
        </div>
      </div>
      <div className={styles.recentCardDate}></div>
      <div className={positive ? styles.positive : styles.negative}>
      {positive ? '+' : '-' } ₦ {amount}
      </div>
    </div>
  );
}

export default RecentCard;
