import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Signup from './pages/Signup/Signup';
import Signin from './components/signin';
import AccountsDashboard from './pages/AccountsDashboard/AccountsDashboard';
import "./components/css/main.css";
import ReceiveSend from './pages/Transactions/ReceiveSend';
import { TransactionDetails } from './pages/Transactions/TransactionDeets';
import Wallets from './components/walletscreen';
import GenerateQr from "./pages/generateAddress/qrAddress";
import Transfer from './pages/walletDetails/Transfer';
import WalletDetails from './pages/walletDetails/WalletDetails';
import Transaction from './pages/Transactions/Transactions';
import SuccessTransfer from './components/SuccessTransfer';
import StartScreen from './pages/StartScreen/StartScreen';

function App() {

  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />
      <Route path="/auth/dashboard" element={<AccountsDashboard />} />
      <Route path="/wallets" element={<Wallets/>} />
      <Route path="/wallet-qr" element={<GenerateQr />} />
      <Route path="/auth/wallet-deets" element={<ReceiveSend />} />
      <Route path="/auth/transactions" element={<Transaction />} />
      <Route path="/auth/transaction-deets" element={<TransactionDetails />} />
      <Route path="/auth/transfer" element={<Transfer />} />
      <Route path="/auth/send" element={<WalletDetails />} />
      <Route path="/auth/transfer-success" element={<SuccessTransfer/>} />
    </Routes>
  );
}

export default App;
