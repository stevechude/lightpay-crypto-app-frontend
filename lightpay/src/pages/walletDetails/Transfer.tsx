import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { SpinnerCircular } from "spinners-react";
// import { SiEthereum } from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { coins } from "../../components/coinList";
import axios from "axios";
import "./WalletDetails.css";

const Transfer = () => {
  const [userWallet, setUserWallet] = useState<any[]>([]);
  // const [coinName, setCoinName] = useState("BNB");
  const [transferDisabled, setTransferDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [formData, setFormData] = useState({
    fromAddress: "",
    toAddress: "",
    amount: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken") as string);
    if (!token) {
      navigate("/signin");
    }
    // const wallets = JSON.parse(
    //   localStorage.getItem("walletsWithBal") as string
    // );
    // if (wallets) {
    //   setUserWallet(wallets);
    //   setFormData({ ...formData, fromAddress: wallets[0].address });
    // }

    const getUserWallet = async () => {
      try {
        const response = await axios.get("http://localhost:3001/wallets/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const json = await response.data[0].address;
        // console.log(response.data);
        setUserWallet(response.data);
        setFormData({ ...formData, fromAddress: response.data[0].address });
        // setCoinName(response.data[1].coin);
      } catch (error) {
        console.log(error);
      }
    };
    getUserWallet();
  }, []);

  // const coinIcon = coins.filter((coin: any) => coin.symbol === coinName)[0].icon;
  const handleError = () => {
    setIsSpinning(false);
    setTransferDisabled(false);
    console.log("Transfer failed.");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //setSubmitted(true);
    setMessage("");
    setTransferDisabled(true);
    setIsSpinning(true);
    // console.log(formData);

    const token = JSON.parse(localStorage.getItem("userToken") as string);
    if (!token) {
      navigate("/signin");
    }

    axios
      .post("http://localhost:3001/auth/transfer", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data);
        const message = response.data.message;

        response.data.message.includes("was successful")
          ? navigate("/auth/transfer-success/", {
            state: {
              message
            },
          })
          : handleError();
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("CATCH A")
          console.log(error.response.data);
          if (error.response.data.message.includes("Invalid token")) {
            navigate("/signin");
          }
          setMessage(error.response.data.message);
          handleError();
        } else if (error.request) {
          // The request was made but no response was received
          console.log("CATCH B")
          console.log(error.request);
          setMessage(error.request);
          handleError();
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("CATCH C")
          console.log("Error", error.message);
          setMessage("Error" + error.message);
          handleError();
        }
      });
  };

  return (
    <section className="sr-screen-container">
      <div className="container">
        <div className="wrap-wallet">
          <div>
            <MdArrowBack
              fontSize="2em"
              cursor="pointer"
              onClick={() => navigate(-1)}
            ></MdArrowBack>
          </div>

          <form
            action="#"
            className="wallet-form validate-form"
            onSubmit={handleSubmit}
          >
            <span className="wallet-title">Send</span>

            <div className="from">
              <label>From</label>

              <div className="from_container">
                {/* if eth/btc is selected, SiEthereum/SiBitcoin */}
                {/* <img src={coinIcon} alt="crypto coins" /> */}
                {/* <SiEthereum style={style}></SiEthereum> */}
                {/* <p>{coinName}</p> */}
                <select
                  className="select"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fromAddress: e.target.value.split(" ")[1],
                    })
                  }
                >
                  {userWallet.map((wallet: any, index) => {
                    return (
                      <option key={index}>
                        {wallet.coin + ": " + wallet.address}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <label className="to" htmlFor="recipient">
              To
            </label>
            <input
              className="input"
              name="recipient"
              placeholder="Recipient Address"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, toAddress: e.target.value })
              }
            />
            <label className="to" htmlFor="amount">
              Amount
            </label>
            <input
              className="input"
              name="amount"
              placeholder="Amount"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />

            <button
              className="xxf-continue-btn"
              type="submit"
              disabled={transferDisabled}
            >
              Transfer
            </button>

            {isSpinning ? (
              <div>
                <div className="xf-overlay"></div>
                <div className="xf-spinner">
                  <SpinnerCircular
                    // className="xf-spinner"
                    enabled={isSpinning}
                    size={50}
                    thickness={100}
                    speed={100}
                    color="#36ad47"
                    secondaryColor="#E4E4E6"
                  />

                  <p>
                    <br></br>Processing transfer...
                  </p>
                </div>
              </div>
            ) : null}

            {message.length > 0 ? (
              <div className="xf-error-msg">
                <FontAwesomeIcon
                  className="xf-email-error-icon"
                  icon={solid("triangle-exclamation")}
                />
                {message}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Transfer;
