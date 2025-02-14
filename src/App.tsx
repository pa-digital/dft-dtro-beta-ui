import "./App.css";
import FooterComponent from "./components/footer/footer.component";
import NavbarComponent from "./components/navbar/navbar.component";
import ConsumerLoginPage from "./pages/login/consumer-login.page";

function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <div className="content">
        <ConsumerLoginPage />
      </div>
      <div className="footer">
        <FooterComponent />
      </div>
    </div>
  );
}

export default App;
