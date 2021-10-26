import React, { useState } from "react";
import { Helmet } from "react-helmet";
import QRCode from "qrcode.react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

import Wrapper from "./../../Components/Wrapper";
import Scan from "./Scan";

import styles from "./style.module.scss";
import transfer from "../../controllers/transfer";

function Qr(props) {
  const [scanStatus, scanStatusHandler] = useState(false);
  const [transferStatus, transferStatusHandler] = useState(false);

  const scanController = () => scanStatusHandler(!scanStatus);
  const transferController = () => transferStatusHandler(!transferStatus);

  const fixScanData = (data) => {
    if (data.peerId && data.amount && data.description) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Transfer!",
      }).then(async (result) => {
        transferController();
        if (result.isConfirmed) {
          const transferResponse = await transfer(
            data.peerId,
            data.amount,
            data.description
          );

          if (!transferResponse.data.error) {
            transferController();
            return Swal.fire(
              "Success!",
              "Your transfer was successful.",
              "success"
            );
          } else {
            transferController();
            return Swal.fire("Failed!", transferResponse.data.message, "error");
          }
        }
      });
    } else {
      alert("Move to transfer Page");
    }
    if (!(!!data.amount && !!data.peerId && !!data.description)) {
      props.history.push(
        `transfer?peerId=${data.peerId}&amount=${data.amount}&description=${data.description}`
      );
    }
    console.log(data);
  };

  // const saveQr = () => {
  //   const canvasSave = document.getElementById('svg');
  //   const d = canvasSave.toDataURL('image/png');
  //   const w = window.open('about:blank', 'image from canvas');
  //   w.document.write("<img crossOrigin='anonymous'  src='"+d+"' alt='from canvas'/>");
  //   console.log('Saved!');
  // };

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
                  value={`https://peerpay.vercel.app/transfer?peerId=${localStorage.getItem(
                    "_peer__ID"
                  )}&amount=&description=${"Wallet Fund"}`}
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
                {/* <div>
                  <button onClick={() => saveQr()} >Save QR</button>
                </div> */}
              </div>
            </div>
          </>
        ) : (
          <Scan scanResponse={fixScanData} />
        )}
        <button onClick={() => scanController()}>
          {scanStatus ? "Show" : "Scan"} Qr
        </button>
      </div>
    </Wrapper>
  );
}

export default withRouter(Qr);
