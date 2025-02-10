import "./App.css";
import FooterComponent from "./components/footer/footer.component";
import NavbarComponent from "./components/navbar/navbar.component";
import LoginPage from "./pages/login/login.page";

function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <div className="content">
        <LoginPage />
      </div>
      <div className="footer">
        <FooterComponent />
      </div>
    </div>
  );
}

export default App;
