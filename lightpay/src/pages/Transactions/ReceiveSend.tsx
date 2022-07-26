import { MdArrowBack } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import "./ReceiveSend.css";

interface LocationState {
  coinAddress: string;
  coinName: string;
  coinSymbol: string;
  coinBalance: string;
  coinBalanceUSD: string;
}

const ReceiveSend = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { coinAddress, coinName, coinSymbol, coinBalance, coinBalanceUSD } =
    state;

  return (
    <section className="sr-container1">
      <div className="sr-container2">
        <div className="wrap-sr-container">
          <div className="nav-icon-container">
            <div>
              <MdArrowBack
                fontSize="2em"
                cursor="pointer"
                onClick={() => navigate(-1)}
              ></MdArrowBack>
            </div>
            <div className="nav">
              <div id="nav-icon">
                <FaHandHoldingUsd fontSize="1.5em"></FaHandHoldingUsd>
              </div>
              <div
                id="nav-link"
                onClick={() =>
                  navigate("/wallet-qr", {
                    state: {
                      coinAddress,
                    },
                  })
                }
              >
                <a>Make Request</a>
              </div>
            </div>
          </div>
          <section className="main">
            <p>{coinName}</p>
            <div id="eth">
              <h2>{coinBalance}</h2>
              <p>{coinSymbol}</p>
            </div>
            <h5>${coinBalanceUSD}</h5>
          </section>
          <section className="send-receive-icon">
            <div className="receive-icon-and-title">
              <div
                className="receive"
                onClick={() =>
                  navigate("/wallet-qr", {
                    state: {
                      coinAddress,
                    },
                  })
                }
              >
                <MdArrowCircleDown fontSize="2.5rem"></MdArrowCircleDown>
              </div>
              <div className=" receive-title">
                <p>Receive</p>
              </div>
            </div>
            <div className="send-icon-and-title">
              <div
                className="send"
                onClick={() =>
                  navigate("/auth/send", {
                    state: {
                      coinAddress,
                    },
                  })
                }
              >
                <MdArrowCircleUp fontSize="2.5rem"></MdArrowCircleUp>
              </div>
              <div className="send-title">
                <p>Send</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
export default ReceiveSend;
