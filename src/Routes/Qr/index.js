import React, { useState } from "react";
import { Helmet } from "react-helmet";
import QRCode from "qrcode.react";

import Wrapper from "./../../Components/Wrapper";
import Scan from "./Scan";

import styles from "./style.module.scss";

function Qr() {
  const [scanStatus, scanStatusHandler] = useState(false);

  const scanController = () => scanStatusHandler(!scanStatus);

  return (
    <Wrapper>
      <Helmet>
        <title>PeerPay | Qr scan </title>
      </Helmet>
      <div className={styles.qr}>
        {!scanStatus ? (
          <>
            <div className={styles.qrCodes}>
              <div className={styles.qrCodesBlock}>
                <div>
                  <h2>Invite Qr</h2>
                  <span>Scan my QR to add me as a friend</span>
                </div>
                <QRCode
                  value={"http://localhost:3000/?peerId=Qudusayo"}
                  size={250}
                  bgColor={"#ffffff"}
                  fgColor={"#6055A9"}
                  level={"M"}
                  includeMargin={false}
                  renderAs={"svg"}
                  imageSettings={{
                    src: "https://i.ibb.co/tZY7Kny/peerpay.png",
                    x: null,
                    y: null,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>
              <div className={styles.qrCodesBlock}>
                <div>
                  <h2>Payment Qr</h2>
                  <span>Scan my QR make payment</span>
                </div>
                <QRCode
                  value={
                    "http://localhost:3000/payId=Memme%20amount=500%20currency=dollar"
                  }
                  size={250}
                  bgColor={"#ffffff"}
                  fgColor={"#6055A9"}
                  level={"Q"}
                  includeMargin={false}
                  renderAs={"svg"}
                  imageSettings={{
                    src: "https://i.ibb.co/tZY7Kny/peerpay.png",
                    x: null,
                    y: null,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <Scan />
        )}
        <button onClick={() => scanController()}>{ scanStatus ? 'Show' : 'Scan' } Qr</button>
      </div>
    </Wrapper>
  );
}

export default Qr;
