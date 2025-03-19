import "./App.css";
import FooterComponent from "./components/footer/footer.component";
import NavbarComponent from "./components/navbar/navbar.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TwoFactorAuthPage from "./pages/two-factor-auth/two-factor-auth.page";
import NavigationPage from "./pages/navigation/navigation.page";
import IntegrationAppCreationPage from "./pages/app-creation/integration/app-creation.page";
import ProductionAppCreationPage from "./pages/app-creation/production/app-creation.page";
import AppDetailsPage from "./pages/app-details/app-details.page";
import AppListPage from "./pages/app-list/app-list.page";
import PendingRequestsPage from "./pages/cso/pending-requests/pending-requests.page";
import ActiveUsersPage from "./pages/cso/active-users/active-users.page";
import UserDetailsPage from "./pages/cso/user-details/user-details.page";
import CSONavigationPage from "./pages/cso/navigation/navigation.page";
import { isProductionEnv } from "./utils/env";
import SuccessPage from "./pages/success/success.component";
import ConsumerAppCreationPage from "./pages/app-creation/consumer/consumer-app-creation..page";
import TrosPage from "./pages/cso/tros/tros.page";

function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/auth" element={<TwoFactorAuthPage />}></Route>
            <Route path="/home" element={<NavigationPage />}></Route>
            <Route
              path="/create"
              element={
                !isProductionEnv() ? (
                  <IntegrationAppCreationPage />
                ) : (
                  <ProductionAppCreationPage />
                )
              }
            ></Route>
            <Route path="/details" element={<AppDetailsPage />}></Route>
            <Route path="/list" element={<AppListPage />}></Route>
            <Route path="/cso/nav" element={<CSONavigationPage />}></Route>
            <Route path="/requests" element={<PendingRequestsPage />}></Route>
            <Route path="/users" element={<ActiveUsersPage />}></Route>
            <Route path="/user" element={<UserDetailsPage />}></Route>
            <Route path="/success" element={<SuccessPage />}></Route>
            <Route
              path="/consumer/create"
              element={<ConsumerAppCreationPage />}
            ></Route>
            <Route path="/tros" element={<TrosPage />}></Route>
          </Routes>
        </Router>
      </div>
      <div className="footer">
        <FooterComponent />
      </div>
    </div>
  );
}

export default App;
