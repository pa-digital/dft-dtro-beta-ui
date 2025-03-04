import "./App.css";
import FooterComponent from "./components/footer/footer.component";
import NavbarComponent from "./components/navbar/navbar.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/publisher-login.page";
import TwoFactorAuthPage from "./pages/two-factor-auth/two-factor-auth.page";
import NavigationPage from "./pages/navigation/navigation.page";
import AppCreationPage from "./pages/app-creation/app-creation.page";
import AppDetailsPage from "./pages/app-details/app-details.page";
import AppListPage from "./pages/app-list/app-list.page";
import PublisherAppCreationPage from "./pages/publisher-app-creation/publisher-app-creation.page";
import CSOBasePage from "./pages/cso/base/base.page";
import PendingRequestsPage from "./pages/cso/pending-requests/pending-requests.page";
import ActiveUsersPage from "./pages/cso/active-users/active-users.page";
import UserDetailsPage from "./pages/cso/user-details/user-details.page";

function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/auth" element={<TwoFactorAuthPage />}></Route>
            <Route path="/home" element={<NavigationPage />}></Route>
            <Route path="/create" element={<AppCreationPage />}></Route>
            <Route path="/details" element={<AppDetailsPage />}></Route>
            <Route path="/list" element={<AppListPage />}></Route>
            <Route
              path="/publisher-create"
              element={<PublisherAppCreationPage />}
            ></Route>
            <Route path="/requests" element={<PendingRequestsPage />}></Route>
            <Route path="/users" element={<ActiveUsersPage />}></Route>
            <Route path="/user" element={<UserDetailsPage />}></Route>
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
