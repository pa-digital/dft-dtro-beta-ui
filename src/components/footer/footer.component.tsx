import React from "react";
import styles from "./footer.module.css";
import OGLLogo from "../../assets/ogl-logo.svg";
import ArmsLogo from "../../assets/arms-logo.svg";
import YouTube from "../../assets/youtube.svg";
import LinkedIn from "../../assets/linked-in.svg";
import Twitter from "../../assets/twitter.svg";
import Facebook from "../../assets/facebook.svg";

const FooterComponent: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLogoContainer}>
        <img src={OGLLogo}></img>
        <img className={styles.armsLogo} src={ArmsLogo}></img>
        <p>© Copyright 2023 DFT</p>
      </div>
      <div className={styles.linkGrid}>
        <a href="/">Home</a>
        <a href="/">You at DfT</a>
        <a href="/">Opportunities</a>
        <a href="/">Tech Support</a>
        <a href="/">Our DfT Family</a>
      </div>
      <div className={styles.externalLinkContainer}>
        <div className={styles.spacer}></div>
        <div className={styles.socialMediaIconsContainer}>
          <img src={YouTube}></img>
          <img src={LinkedIn}></img>
          <img src={Twitter}></img>
          <img src={Facebook}></img>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.links}>
          <a href="/">Website Accessibility</a>
          <a href="/">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
