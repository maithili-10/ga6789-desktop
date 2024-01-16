import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AgencyRegister from "./pages/AgencyRegister/AgencyRegister";
import Promotions from "./pages/Promotions/Promotions";
import Profile from "./pages/Profile/Profile";
import Deposit from "./pages/Deposit/Deposit";
import Withdraw from "./pages/withdraw/Withdraw";
import AllWallet from "./pages/AllWallet/AllWallet";
import Transactions from "./pages/Transactions/Transactions";
import BankAccountManagement from "./pages/BankAccountManagement/BankAccountManagement";
import GameLinks from "./pages/GameLinks/LinksPage";
import Downloads from "./pages/Downloads/Downloads";
import IOS from "./pages/Downloads/IOS/IOS";
import Android from "./pages/Downloads/Android/Android";
import DownloadVpn from "./pages/Downloads/DownloadVpn/DownloadVpn";
import Layout from "./layout/Layout/Layout";
import ProfileLayout from "./layout/ProfileLayout/ProfileLayout";
import Ga6789 from "./pages/FooterPages/Ga6789Page/Ga6789Page";
import TermsConditions from "./pages/FooterPages/TermsConditions/TermsConditions";
import PlayResponsibility from "./pages/FooterPages/PlayResponsibility/PlayResponsibility";
import Disclaimer from "./pages/FooterPages/Disclaimer/Disclaimer";
import Privacy from "./pages/FooterPages/Privacy/Privacy";
import DepositInstructions from "./pages/FooterPages/DepositInstructions/DepositInstructions";
import WithdrawInstructions from "./pages/FooterPages/WithdrawInstructions/WithdrawInstructions";
import FAQs from "./pages/FooterPages/FAQs/FAQs";
import Contact from "./pages/FooterPages/Contact/Contact";
// import Casion from "./pages/Casino/Casion";
// import Sports from "./pages/Sports/Sports";
// import CockFight from "./pages/CockFight/CockFight";
// import Chess from "./pages/Chess/Chess";
// import ESports from "./pages/ESports/ESports";
// import Lottery from "./pages/Lottery/Lottery";

function App() {
  // Auth routes
  const AuthRoute = ({ children }) => {
    if (!localStorage.getItem("auth_token")) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Guest routes, login , reg
  const GuestRoute = ({ children }) => {
    if (localStorage.getItem("auth_token")) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="login"
          element={
            <GuestRoute>
              {" "}
              <Login />{" "}
            </GuestRoute>
          }
        />
        <Route
          path="register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route path="agency-register" element={<AgencyRegister />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="/game-links" element={<GameLinks />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/ios" element={<IOS />} />
        <Route path="/android" element={<Android />} />
        <Route path="/vpn" element={<DownloadVpn />} />

        <Route path="/ga6789" element={<Ga6789 />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/play-responsibility" element={<PlayResponsibility />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/deposit-instructions" element={<DepositInstructions />} />
        <Route path="/withdraw-instructions" element={<WithdrawInstructions />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        
        {/*
          <Route path="casino" element={ <Casion /> } />
          <Route path="sports" element={ <Sports /> } />
          <Route path="cockfight" element={ <CockFight /> } />
          <Route path="chess" element={ <Chess /> } />
          <Route path="e-sports" element={ <ESports /> } />
          <Route path="lottery" element={ <Lottery /> } />
        */}
        <Route path="/profile" element={<ProfileLayout />}>
          <Route
            index
            element={
              <AuthRoute>
                {" "}
                <Profile />{" "}
              </AuthRoute>
            }
          />
          <Route
            path="deposit"
            element={
              <AuthRoute>
                {" "}
                <Deposit />{" "}
              </AuthRoute>
            }
          />
          <Route
            path="withdraw"
            element={
              <AuthRoute>
                {" "}
                <Withdraw />{" "}
              </AuthRoute>
            }
          />
          <Route
            path="all-wallet"
            element={
              <AuthRoute>
                {" "}
                <AllWallet />{" "}
              </AuthRoute>
            }
          />
          <Route
            path="transactions"
            element={
              <AuthRoute>
                {" "}
                <Transactions />{" "}
              </AuthRoute>
            }
          />
          <Route
            path="bank-account-management"
            element={
              <AuthRoute>
                {" "}
                <BankAccountManagement />{" "}
              </AuthRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
