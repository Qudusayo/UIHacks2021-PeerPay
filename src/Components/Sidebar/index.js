import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styles from "./style.module.scss";

import dashboard from "./../../assets/icons/dashboard.svg";
import logo from "./../../assets/icons/logo.svg";
import insight from "./../../assets/icons/insight.svg";
import settings from "./../../assets/icons/settings.svg";
import qr from "./../../assets/icons/qr.svg";
import transfer from "./../../assets/icons/transfer.svg";
import logout from "./../../assets/icons/logout.svg";

class Index extends Component {
  render() {
    return (
      <div
        className={[
          styles.sidebar,
          this.props.visible ? styles.visibleNav : styles.inVisibleNav,
        ].join(" ")}
      >
        <nav>
          <ul>
            <NavLink to="/" exact className={styles.logo} activeClassName={styles.active}>
              <li>
                <img src={logo} alt="logo" width="50" />
              </li>
            </NavLink>
            <NavLink to="/dashboard" exact activeClassName={styles.active}>
              <li>
                <img src={dashboard} alt="dashboard" width="25" />
              </li>
            </NavLink>
            <NavLink to="/transfer" exact activeClassName={styles.active}>
              <li>
                <img src={transfer} alt="transfer" width="25" />
              </li>
            </NavLink>
            <NavLink to="/qr" exact activeClassName={styles.active}>
              <li>
                <img src={qr} alt="qr" width="25" />
              </li>
            </NavLink>

            <NavLink to="/transactions" exact activeClassName={styles.active}>
              <li>
                <img src={insight} alt="insight" width="25" />
              </li>
            </NavLink>
            
            <NavLink to="/airtime-topup" exact activeClassName={styles.active}>
              <li>
                <img src={settings} alt="settings" width="25" />
              </li>
            </NavLink>
            
            <NavLink
              to="/login"
              exact
              className={styles.logout}
              activeClassName={styles.active}
              onClick={this.logout}
            >
              <li>
                <img src={logout} alt="logout" width="25" />
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Index;
