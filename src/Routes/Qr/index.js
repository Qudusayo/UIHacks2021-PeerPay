import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import QRCode from "qrcode.react";

import Wrapper from "./../../Components/Wrapper";
import Scan from "./Scan";

import styles from "./style.module.scss";

function Qr() {
  const [scanStatus, scanStatusHandler] = useState(false);

  const scanController = () => scanStatusHandler(!scanStatus);

  const saveQr = () => {
    var canvas = document.getElementById("svg");
    console.log(canvas);
    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
    window.location.href = image;
  };

  return (
    <Wrapper>
      <Helmet>
        <title>PeerPay | Qr scan </title>
      </Helmet>
      <div className={styles.qr}>
        {!scanStatus ? (
          <>
            <div className={styles.qrCodes}>
              {/* <div className={styles.qrCodesBlock}>
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
              </div> */}
              <div className={styles.qrCodesBlock}>
                <div>
                  <h2>Payment Qr</h2>
                  <span>Scan my QR to make payment</span>
                </div>
                <QRCode
                  id="svg"
                  value={`https://peerpay.vercel.app/transfer?peerId=qudusayo&amount=&description=${"Wallet Fund"}`}
                  size={250}
                  bgColor={"#ffffff"}
                  fgColor={"#6055A9"}
                  level={"Q"}
                  includeMargin={false}
                  renderAs={"canvas"}
                  imageSettings={{
                    src: "https://i.ibb.co/tZY7Kny/peerpay.png",
                    x: null,
                    y: null,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
                <div>
                  <button onClick={() => saveQr()} >Save QR</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Scan />
        )}
        <button onClick={() => scanController()}>
          {scanStatus ? "Show" : "Scan"} Qr
        </button>
      </div>
    </Wrapper>
  );
}

export default Qr;
