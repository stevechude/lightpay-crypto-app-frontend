import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsCardList } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { RiHome7Fill, RiWallet3Fill } from "react-icons/ri";

export const BottomNavBar = () => {
  const navigate = useNavigate();

  return (
    <footer className="dash-footer">
      <div className="home" onClick={() => navigate("/auth/dashboard/")}>
        <IconContext.Provider value={{ className: "home1" }}>
          <RiHome7Fill />
        </IconContext.Provider>
        <p>Home</p>
      </div>
      <div
        className="transaction"
        onClick={() => navigate("/auth/transactions/")}
      >
        <IconContext.Provider value={{ className: "transaction1" }}>
          <BsCardList />
        </IconContext.Provider>
        <p>Transactions</p>
      </div>
      <div className="transfer" onClick={() => navigate("/auth/transfer")}>
        <IconContext.Provider value={{ className: "transfer1" }}>
          <GrTransaction />
        </IconContext.Provider>
        <p>Transfer</p>
      </div>
      <div className="wallet" onClick={() => navigate("/wallets/")}>
        <IconContext.Provider value={{ className: "wallet1" }}>
          <RiWallet3Fill />
        </IconContext.Provider>
        <p>Wallets</p>
      </div>
    </footer>
  );
};
