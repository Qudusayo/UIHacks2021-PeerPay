import React, { Component } from "react";

import styles from "./style.module.scss";
import Sidebar from "./../Sidebar";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      userName: "User",
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <Sidebar visible={this.state.visible} />
        <div className={styles.dashboard}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Index;
