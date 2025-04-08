import React from "react";
import styles from "../success/success.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
import useAuthNavigate from "../../hooks/use-auth-navigate";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component";
import { Routes as r } from "../../constants/routes";

const AccessPage: React.FC = () => {
  const navigate = useAuthNavigate();

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link={r.Home} />
      <div className={styles.headerContainer}>
        <div className={styles.headerContainer}>
          <h2>Not found</h2>
        </div>
      </div>
      <>
        <TextComponent
          type={TypographyType.SubDescription}
          content="This page was not found."
        />
        <div className={styles.buttonContainer}>
          <ButtonComponent
            type={ButtonType.Primary}
            onClick={() => {
              navigate(r.Home);
            }}
          >
            Home
          </ButtonComponent>
        </div>
      </>
    </div>
  );
};

export default AccessPage;
