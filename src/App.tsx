import "./App.css";
import FooterComponent from "./components/footer/footer.component";
import NavbarComponent from "./components/navbar/navbar.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TwoFactorAuthPage from "./pages/two-factor-auth/two-factor-auth.page";
import NavigationPage from "./pages/navigation/navigation.page";
import IntegrationAppCreationPage from "./pages/app-creation/publisher/integration/app-creation.page";
import ProductionAppCreationPage from "./pages/app-creation/publisher/production/app-creation.page";
import AppDetailsPage from "./pages/app-details/app-details.page";
import AppListPage from "./pages/app-list/app-list.page";
import PendingRequestsPage from "./pages/cso/pending-requests/pending-requests.page";
import ActiveUsersPage from "./pages/cso/active-users/active-users.page";
import UserDetailsPage from "./pages/cso/user-details/user-details.page";
import CSONavigationPage from "./pages/cso/navigation/navigation.page";
import { isProductionEnv } from "./utils/env";
import SuccessPage from "./pages/success/success.component";
import ErrorReportingPage from "./pages/error-reporting/error-reporting.page";
import ErrorReportingIsTROPage from "./pages/error-reporting/error-reporting-is-tro.page";
import ErrorReportingIsNoTROPage from "./pages/error-reporting/error-reporting-is-no-tro.page";
import ErrorReportingSubmittedPage from "./pages/error-reporting/submitted/submitted.page";
import LoginPage from "./pages/login/login.page";
import PrivateRoute from "./components/private-route/private-route.component";
import { Routes as r } from "./constants/routes";
import AccessPage from "./pages/access/access.page";
import { useAuth } from "./contexts/auth.context";
import AdminRoute from "./components/admin-route/admin-route.component";
import UnauthorizedPage from "./pages/error/unauthorized.page";
import NotFoundPage from "./pages/error/not-found.page";
import ConsumerAppCreationNamePage from "./pages/app-creation/consumer/app-creation-name/app-creation-name.page";

function App() {
  const { isAdmin } = useAuth();

  return (
    <Router>
      <div className="container">
        <NavbarComponent />
        <div className="content">
          <Routes>
            {/* Error pages */}
            <Route path={r.Unauthorized} element={<UnauthorizedPage />} />

            <Route path={r.Login} element={<LoginPage />} />
            <Route path={r.Auth} element={<TwoFactorAuthPage />} />

            <Route element={<PrivateRoute />}>
              <Route path={r.Home} element={isAdmin ? <CSONavigationPage /> : <NavigationPage />} />
              <Route path={r.Access} element={<AccessPage />} />
              <Route
                path={r.Publisher.Create}
                element={
                  !isProductionEnv() ? (
                    <IntegrationAppCreationPage />
                  ) : (
                    <ProductionAppCreationPage />
                  )
                }
              />
              <Route path={r.Details} element={<AppDetailsPage />} />
              <Route path={r.Apps} element={<AppListPage />} />
              <Route path={r.Publisher.Request} element={<SuccessPage />} />
              <Route
                path={r.Consumer.Create.One}
                element={<ConsumerAppCreationNamePage />}
              />
              <Route
                path={r.Consumer.Create.Two}
                element={<ConsumerAppCreationNamePage />}
              />
              <Route path="/error-report/1" element={<ErrorReportingPage />}></Route>
              <Route path="/error-report/is-tro" element={<ErrorReportingIsTROPage />}></Route>
              <Route path="/error-report/no-tro" element={<ErrorReportingIsNoTROPage />}></Route>
              <Route path="/error-report/submitted" element={<ErrorReportingSubmittedPage />}></Route>
            </Route>

            <Route element={<AdminRoute />}>
              <Route path={r.CSO.Requests} element={<PendingRequestsPage />} />
              <Route path={r.CSO.Users} element={<ActiveUsersPage />} />
              <Route path={r.CSO.User} element={<UserDetailsPage />} />
            </Route>

            {/* Not found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <div className="footer">
          <FooterComponent />
        </div>
      </div>
    </Router>
  );
}

export default App;
