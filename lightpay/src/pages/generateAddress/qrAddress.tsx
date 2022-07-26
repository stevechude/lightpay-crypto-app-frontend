import "./qrAddress.module.css";
import styles from "./qrAddress.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRcode from "qrcode.react";
import { IoRefresh } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

interface LocationState {
  coinAddress: string;
}

const copyIcon = <FontAwesomeIcon icon={faCopy} />;

const GenerateQr = () => {
  const [qrValue, setQrValue] = useState([] as any);
  const [copyMessage, setCopyMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { coinAddress } = state;

  const handleOnChange = (event: any) => {
    const { value } = event.target;
    setQrValue(value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coinAddress);
    setCopyMessage("Address copied to clipboard.");
    setTimeout(() => {
      setCopyMessage("");
    }, 4000);
  }

  
  useEffect(() => {
    setQrValue(coinAddress);
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.check}>
          <div className={styles.topIcons}>
            <IoCloseOutline className={styles.close} onClick={() => navigate(-1)}/>
            <div className={styles.refreshIcon}>
              {/* <IoRefresh />
              <p className={styles.para}>Refresh</p> */}
            </div>
          </div>
          <h3 className={styles.title}>
            Wallet Address
          </h3>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              {" "}
              <i className={styles.copy} onClick={copyToClipboard}> {copyIcon} </i>
              <input
                onChange={(e) => handleOnChange(e)}
                disabled={true}
                value={qrValue}
                className={styles.icon}
                type="text"
              />
            </div>
          </div>
          <div className={styles.qrContains}>
            <QRcode
              id="qrgen"
              value={qrValue}
              level={"H"}
              includeMargin={false}
              size={220}
              className={styles.qrContainer}
            />
          </div>
          <div className={styles.copyMsg}>&nbsp;{copyMessage}&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

export default GenerateQr;
