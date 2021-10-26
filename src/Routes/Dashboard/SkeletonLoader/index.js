import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import logo from './../../../assets/icons/logo.svg'

import styles from './style.module.scss'

export default function SkeletonLoader() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonCardImage}>
        <div className={styles.skeletonCardImageMain}>
          <img crossOrigin="anonymous" src={logo} alt="logo" width="40" />
        </div>
        <div>
          <h2><Skeleton height="1.1em" width="55%" /></h2>
          <span><Skeleton /></span>
        </div>
      </div>
      <div style={{ margin: "0", flex: "3" }}>
          <Skeleton  height="1em" width='70%' />
          <Skeleton  height="1.5em" />
      </div>
      <div  style={{ margin: "0", marginLeft: '2em', flex: "1" }}><Skeleton height="1.3em" /></div>
    </div>
  );
}
