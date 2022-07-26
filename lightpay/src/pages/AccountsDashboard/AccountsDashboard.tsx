import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { BiLogOut } from "react-icons/bi";
import { SpinnerCircular } from "spinners-react";
import { BottomNavBar } from "../../components/bottomNavBar";
import { coins } from "../../components/coinList";
import "./AccountsDashboard.css";

const AccountsDashboard = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState("Updating balance...");
  const [totalUSDBal, setTotalUSDBal] = useState(0);
  const navigate = useNavigate();

  // const [coinList, setCoinList] = useState<any[]>([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken") as string);
    if (!token) {
      navigate("/signin");
    }

    const total = JSON.parse(localStorage.getItem("totalBal") as string);
    if (total) {
      setTotalUSDBal(total);
    }

    axios
      .get("http://localhost:3001/auth/username", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) {
        //   console.log("Session expired, Login!");
        //   navigate("/signin/");
        // }
      });

    //   axios.get("https://api.coinstats.app/public/v1/coins").then((response) => {
    //     // console.log(response.data.coins);
    //     setCoinList(response.data.coins);
    //   });

    const getWallets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/wallets/userwallet",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // setUserWallet(response.data);
        console.log(response.data);
        const walletsWithBal = response.data;
        localStorage.setItem("walletsWithBal", JSON.stringify(walletsWithBal));

        let totalBal = 0;
        walletsWithBal.forEach((wallet: any) => {
          const coinBalance = wallet.balance;
          const coinPrice = coins.filter(
            (coin) => coin.symbol === wallet.coin
          )[0].price;
          const coinBalanceUSD: number = +(
            Number(coinBalance) * Number(coinPrice)
          ).toFixed(2);
          totalBal += coinBalanceUSD;
          totalBal = Number(totalBal.toFixed(2));
        });
        setIsLoading(false);
        setTotalUSDBal(totalBal);
        localStorage.setItem("totalBal", JSON.stringify(totalBal));
        console.log("Total Balance", totalBal);
      } catch (error: any) {
        setTimeout(() => {
          setRefreshStatus("Network error. Unable to update balance.");
          setIsSpinning(false);
        }, 2000);
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
    <section className="container1">
      <div className="acc-container">
        <div className="collective">
          <img src="/images/user-icon.webp" alt="" />
          <div className="user">
            <p>{"Hello, " + username.slice(0, username.indexOf(" "))}</p>
          </div>
          <div
            className="logout"
            onClick={() => {
              localStorage.clear();
              navigate("/signin/");
            }}
          >
            <IconContext.Provider value={{ className: "logout-icon" }}>
              <BiLogOut />
            </IconContext.Provider>
            <p>Logout</p>
          </div>

          <div className="show-balance">
            <p className="total">Total Balance</p>
            {isLoading === true ? <p className="balance">...</p> : <p className="balance">${totalUSDBal}</p>}
            {isLoading ? (
              <span className="retrieve-parent">
                <p className="retrieve">{refreshStatus}</p>
                <SpinnerCircular
                  className="spinner"
                  enabled={isSpinning}
                  size={15}
                  thickness={200}
                  speed={100}
                  color="#36ad47"
                  secondaryColor="rgba(255, 255, 255, 1)"
                />
              </span>
            ) : (
              <p className="retrieve-parent">&nbsp;</p>
            )}
            <div className="connect-account">
              <img src="/images/blue-shield.jpeg" alt="" />
              <div className="trust">
                <p className="first">Connect your Trust Account</p>
                <p className="second">
                  Connect your Trust Account to easily deposit <br />
                  and withdraw funds.
                </p>
              </div>
            </div>
          </div>

          <div className="exchange">
            <h4>Exchange Rates</h4>
            <div className="exchange-rates">
              {coins.map((coin, index) => {
                return (
                  <div className="exchange-rate-list" key={index}>
                    <div className="coins">
                      <img src={coin.icon} alt="crypto coins" />
                      <div className="eth">
                        <h6>{coin.name}</h6>
                      </div>
                      <div className="symbol">
                        <h6>{coin.symbol}</h6>
                      </div>
                      <div className="price">
                        <h6>${coin.price.toFixed(2)}</h6>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNavBar />
      </div>
    </section>
  );
};

export default AccountsDashboard;
