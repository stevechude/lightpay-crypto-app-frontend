import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { SpinnerCircular } from "spinners-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { BottomNavBar } from "./bottomNavBar";
import { coins } from "./coinList";
import "../components/css/wallet.css";

const add = <FontAwesomeIcon icon={faCirclePlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;

const Wallets = () => {
  const [userWallet, setUserWallet] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState("Retrieving wallets...");
  // const [walletBalances, setWalletBalances] = useState<any[]>([]);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchedWallets = userWallet.filter((wallet) => {
    const coinName = coins.filter((coin) => coin.symbol === wallet.coin)[0]
      .name;
    return (
      wallet.coin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coinName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    const wallets = JSON.parse(
      localStorage.getItem("walletsWithBal") as string
    );
    if (wallets) {
      setUserWallet(wallets);
      setIsLoading(false);
    }

    // Add a request interceptor
    const token = JSON.parse(localStorage.getItem("userToken") as string);
    axios.interceptors.request.use(function (config: AxiosRequestConfig) {
      if (config.headers === undefined) {
        config.headers = {};
      }

      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    });

    // const
    const getWallets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/wallets/userwallet"
        );
        setIsLoading(false);
        setUserWallet(response.data);
        console.log(response.data);
      } catch (error: any) {
        setTimeout(() => {
          setRefreshStatus("Network error. Unable to retrieve wallets.");
          setIsSpinning(false);
        }, 2000);
        console.log(error);
        // if (error.response.status === 400) {
        //   console.log("Session expired, Login!");
        //   navigate("/signin/");
        // }
      }
    };

    const getWalletsBalances = async () => {
      const walletsWithBal = [];
      for (let i = 0; i < userWallet.length; i++) {
        const coin = userWallet[i].coin;
        try {
          const walletBalance = await axios.get(
            `http://localhost:3001/wallets/${coin}/balance`
          );
          walletsWithBal.push({
            address: userWallet[i].address,
            coin,
            balance: walletBalance.data.balance,
          });
        } catch (error: any) {
          console.log(error);
          // if (error.response.status === 400) {
          //   console.log("Session expired, Login!");
          //   navigate("/signin/");
          // }
        }
      }
      console.log("All Balances", walletsWithBal);
      setUserWallet(walletsWithBal);
    };

    // axios
    //   .get("https://api.coinstats.app/public/v1/coins")
    //   .then((response) => {
    //     // console.log(response.data.coins);
    //     setCoinList(response.data.coins);
    //   }).catch((err: any) => {
    //     console.log(err);
    //   if (error.response.status === 400) {
    // console.log("Session expired, Login!");
    // navigate("/signin/");
    // }
    //   })

    getWallets();
    // getWalletsBalances();
  }, []);

  return (
    <div className="wallet-screen-container">
      <div className="container-wallet">
        <div className="wrap-wallet-screen">
          <div className="add">
            <i> {add} </i>
            <span className="add-wallet">Add Wallet</span>
          </div>

          <span className="wallet-title-main">Wallets</span>

          <div
            className="wrap-input-wallet"
            data-validate="enter wallet address"
          >
            <i className="search"> {search} </i>
            <input
              className="input-wallet"
              type="text"
              name="search-wallet"
              placeholder="Search wallet"
              id="wallet"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>

          {isLoading ? (
            <span className="rtrv-parent">
              <p className="rtrv">{refreshStatus}</p>
              <SpinnerCircular
                className="wallet-spinner"
                enabled={isSpinning}
                size={15}
                thickness={200}
                speed={100}
                color="#36ad47"
                secondaryColor="rgba(255, 255, 255, 1)"
              />
            </span>
          ) : null}

          <div className="wrap-wallet-currency">
            {searchedWallets.map((wallet, index) => {
              const coinIcon = coins.filter(
                (coin) => coin.symbol === wallet.coin
              )[0].icon;
              const coinName = coins.filter(
                (coin) => coin.symbol === wallet.coin
              )[0].name;
              const coinSymbol = wallet.coin;
              const coinAddress = wallet.address;
              const coinBalance = Number(wallet.balance.toFixed(5));
              const coinPrice = coins.filter(
                (coin) => coin.symbol === wallet.coin
              )[0].price;
              const coinBalanceUSD = (
                Number(coinBalance) * Number(coinPrice)
              ).toFixed(2);

              return (
                <div key={index}>
                  <div
                    className="coins"
                    onClick={() =>
                      navigate("/auth/wallet-deets/", {
                        state: {
                          coinAddress,
                          coinName,
                          coinSymbol,
                          coinBalance,
                          coinBalanceUSD,
                        },
                      })
                    }
                  >
                    <img src={coinIcon} alt="crypto coins" />
                    <div className="eth">
                      <h6>{coinName}</h6>
                    </div>
                    <div className="symbol">
                      <h6>
                        {coinSymbol +
                          ": " +
                          coinAddress.slice(0, 7) +
                          "..." +
                          coinAddress.slice(-4)}
                      </h6>
                    </div>

                    <div>
                      <div className="bal">
                        <h5>{coinBalance}</h5>
                        {/* <h5>0</h5> */}
                      </div>
                      <div className="bal-usd">
                        <h5>${coinBalanceUSD}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Wallets;
