import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./TransactionDeets.css";

interface LocationState {
  amount: number;
  to: string;
  from: string;
  status: string;
  transactionId: string;
  nonce: number;
  gas: number;
  gasPrice: number;
}

export const TransactionDetails = () => {
  const [userWallet, setUserWallet] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { amount, to, from, status, transactionId, nonce, gas, gasPrice } =
    state;
  const direction = userWallet.find((val) => val.address === from)
    ? "Debit (Outbound)"
    : "Credit (Inbound)";

  // const [showModal, setShowModal] = useState(true);

  // const openModal = () => {
  //   setShowModal(prev => !prev);
  // };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken") as string);
    const getWallets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/wallets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserWallet(response.data);
        console.log(response.data);
      } catch (error: any) {
        console.log(error);
        // if (error.response.status === 400) {
        //   console.log("Session expired, Login!");
        //   navigate("/signin/");
        // }
      }
    };
    getWallets();
  }, []);

  return (
    <section className="receipt-screen-container">
      <div className="receipt-container">
        <div className="wrap-receipt">
          <IoCloseOutline className="close" onClick={() => navigate(-1)} />

          <span className="receipt-title">Transaction Receipt</span>
          <hr></hr>

          <div>
            <div className="column">
              {userWallet.find((val) => val.address === from) ? (
                <div>
                  <img src="/images/arrow-up.png" alt="Debit" /> <p>{direction} - {status}</p>
                </div>
              ) : (
                <div>
                  <img src="/images/arrow-down.png" alt="Credit" />
                  <p>
                    {direction} - {status}
                  </p>
                </div>
              )}
            </div>

            <p className="xp">
              <strong>From:&nbsp;</strong>
              {from.slice(0, 15) + "..." + from.slice(-5)}
            </p>
            <p className="xp">
              <strong>To:&nbsp;</strong>
              {to.slice(0, 15) + "..." + to.slice(-5)}
            </p>
            <p className="xp">
              <strong>Transaction ID:&nbsp;</strong>
              {transactionId.slice(0, 10) + "..." + transactionId.slice(-5)}
            </p>
            <hr></hr>
            <p className="xh3">More Details</p>
            <p className="xp">
              Nonce:&nbsp;<span>{nonce}</span>
            </p>
            <p className="xp">
              Amount:&nbsp;
              <span>
                <strong>{amount}&nbsp;ETH</strong>
              </span>
            </p>
            <p className="xp">
              Gas Limit (Units):&nbsp;<span>{gas}</span>
            </p>
            <p className="xp">
              Gas Price:&nbsp;<span>{gasPrice}</span>
            </p>
            <p className="xp">
              <strong>Total:&nbsp;</strong>
              <span>
                <strong>{amount}&nbsp;ETH</strong>
              </span>
            </p>
          </div>
        </div>

        {/* <BottomNavBar /> */}
      </div>
    </section>
  );
};
