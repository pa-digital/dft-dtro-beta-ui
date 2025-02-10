import React from "react";
import styles from "./login.module.css";
import Logo from "../../assets/logo.svg";
import TextComponent from "../../components/TypographyComponent";
import InputComponent, {
  InputType,
} from "../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={Logo}></img>
      <div className={styles.something}>
        <TextComponent content="Welcome to the DTRO service" />
        <div style={{ width: "60%" }}>
          <InputComponent
            value=""
            type={InputType.Text}
            label="Email address"
          />
        </div>
        <InputComponent value="" type={InputType.Password} label="Password" />
        <ButtonComponent
          type={ButtonType.Primary}
          text="Submit"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default LoginPage;
