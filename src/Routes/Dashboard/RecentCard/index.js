import React from "react";
import logo from "./../../../assets/icons/logo.svg";

import styles from './style.module.scss'

function RecentCard() {
  return (
    <div className={styles.recentCard} >
      <div className={styles.recentCardImage} >
        <div className={styles.recentCardImageMain}>
          <img src={logo} alt="logo" width='40' />
        </div>
        <div>
          <h2>PeerId</h2>
          <span>Oct 22, 2021 4:44 AM</span>
        </div>
      </div>
      <div className={styles.recentCardDate}></div>
      <div>+ ₦ 200.00</div>
    </div>
  );
}

export default RecentCard;
