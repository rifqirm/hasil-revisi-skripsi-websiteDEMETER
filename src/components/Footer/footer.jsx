import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaArrowUp } from "react-icons/fa";
import Styles from "../../styles/global.module.css";
import footerLogo from "../../assets/logo-demeter-footer.png";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`${Styles.row2} ${Styles.bg_primary2} ${Styles.footer}`}>
      <div className={Styles.footerLeft}>
        <div className={Styles.logoContainer}>
          <img src={footerLogo} alt="logo" />
          <h4>DEMETER</h4>
        </div>
        <div className={Styles.hubungiKami}>
          <h5>Hubungi Penjual:</h5>
          <div className={Styles.sosmedIcons}>
            <a
              href="https://wa.me/082237914066"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.facebook.com/rifqi.r.m.54"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/rifqirm1512/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className={Styles.footerRight}>
        <p>&copy; Copyright DEMETER 2024</p>
      </div>
      <button
        className={Styles.scrollTop}
        onClick={scrollTop}
        style={{ display: showScroll ? "flex" : "none" }}
      >
        <FaArrowUp size={25} />
      </button>
    </div>
  );
};

export default Footer;
