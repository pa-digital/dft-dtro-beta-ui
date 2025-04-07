import "./App.css";
import FooterComponent from "./components/footer/footer.component";
import NavbarComponent from "./components/navbar/navbar.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TwoFactorAuthPage from "./pages/two-factor-auth/two-factor-auth.page";
import NavigationPage from "./pages/navigation/navigation.page";
import IntegrationAppCreationPage from "./pages/app-creation/publisher/integration/app-creation.page";
import ProductionAppCreationPage from "./pages/app-creation/publisher/production/app-creation.page";
import ConsumerAppCreationNamePage from './pages/app-creation/consumer/app-creation-name/app-creation-name.page';
import ConsumerAppCreationDetailsPage from './pages/app-creation/consumer/app-creation-details/app-creation-details.page';
import AppDetailsPage from "./pages/app-details/app-details.page";
import AppListPage from "./pages/app-list/app-list.page";
import PendingRequestsPage from "./pages/cso/pending-requests/pending-requests.page";
import ActiveUsersPage from "./pages/cso/active-users/active-users.page";
import UserDetailsPage from "./pages/cso/user-details/user-details.page";
import CSONavigationPage from "./pages/cso/navigation/navigation.page";
import { isProductionEnv } from "./utils/env";
import SuccessPage from "./pages/success/success.component";
import LoginPage from "./pages/login/login.page";
import PrivateRoute from "./components/private-route/private-route.component";
import { Routes as r } from "./constants/routes";
import AccessPage from "./pages/access/access.page";

function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <div className="content">
        <Router>
          <Routes>
            <Route path={r.Login} element={<LoginPage />}></Route>
            <Route path={r.Auth} element={<PrivateRoute element={<TwoFactorAuthPage />} />} />
            <Route path={r.Home} element={<PrivateRoute element={<NavigationPage />} />} />
            <Route path={r.Access} element={<PrivateRoute element={<AccessPage />} />} />
            <Route
              path={r.Publisher.Create}
              element={<PrivateRoute element={!isProductionEnv() ? (
                <IntegrationAppCreationPage />
              ) : (
                <ProductionAppCreationPage />
              )} />}
            />
            <Route path={r.Details} element={<PrivateRoute element={<AppDetailsPage />} />} />
            <Route path={r.Apps} element={<PrivateRoute element={<AppListPage />} />} />
            <Route path={r.CSO.Nav} element={<PrivateRoute element={<CSONavigationPage />} />} />
            <Route path={r.CSO.Requests} element={<PrivateRoute element={<PendingRequestsPage />} />} />
            <Route path={r.CSO.Users} element={<PrivateRoute element={<ActiveUsersPage />} />} />
            <Route path={r.CSO.User} element={<PrivateRoute element={<UserDetailsPage />} />} />
            <Route path={r.Publisher.Request} element={<PrivateRoute element={<SuccessPage />} />} />
            <Route path={r.Consumer.Create.One} element={<PrivateRoute element={<ConsumerAppCreationNamePage />} />} />
            <Route path={r.Consumer.Create.Two} element={<PrivateRoute element={<ConsumerAppCreationDetailsPage />} />} />
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
