import React, { useState, useEffect, FC } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface LocationState {
  amount: number;
  to: string;
  from: string;
  status: string;
  transactionId: string;
  nonce: number;
  gasLimit: number;
  gasPrice: number;
}

export const TransactionDetails = (props: any) => {
  const [userWallet, setUserWallet] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { amount, to, from, status, transactionId, nonce, gasLimit, gasPrice } =
    state;
  const direction =
  userWallet.find((val) => val.address === from) ? "Send (Outbound)" : "Receive (Inbound)";

  const [showModal, setShowModal] = useState(true);

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
    <>
      {showModal ? (
        <Background>
          <ModalWrapper>
            {/* showModal={showModal}> */}
            <ModalContent>
              <h1>{direction}</h1>
              <h3>Status: {status}</h3>
              <p>
                <strong>From:&nbsp;</strong>
                {from.slice(0, 5) + "..." + from.slice(-4)}
              </p>
              <p>
                <strong>To:&nbsp;</strong>
                {to.slice(0, 5) + "..." + to.slice(-4)}
              </p>
              <p>
                <strong>Transaction ID:&nbsp;</strong>
                {transactionId.slice(0, 10) + "..." + transactionId.slice(-5)}
              </p>
              <hr></hr>
              <h3>Transaction</h3>
              <p>
                Nonce:<span>{nonce}</span>
              </p>
              <p>
                Amount:
                <span>
                  <strong>{amount}&nbsp;ETH</strong>
                </span>
              </p>
              <p>
                Gas Limit (Units):<span>{gasLimit}</span>
              </p>
              <p>
                Gas Price:<span>{gasPrice}</span>
              </p>
              <p>
                <strong>Total:</strong>
                <span>
                  <strong>{amount + 0.02}&nbsp;ETH</strong>
                </span>
              </p>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => {
                setShowModal((prev: any) => !prev);
                navigate(-1);
              }}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 330px;
  height: 450px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  font-family: "Outfit", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  line-height: 1;
  color: #141414;

  h1 {
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 8px;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    padding: 8px 0;
  }

  p {
    margin-bottom: 1rem;
    font-size: 14px;
    display: flex;
    // overflow: ellipses;
  }

  span {
    flex: 1;
    text-align: right;
    white-space: nowrap;
  }

  hr {
    width: 290px;
  }

  button {
    background: #141414;
    color: #fff;
    border: none;
    padding: 10px 24px;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

interface Props {
  showModal: boolean;
  setShowModal: any;
}
