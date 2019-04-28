import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Subtitle from "./subtitle";
import { ScrollSidebar, Sidebar } from "./sidebar";

import styles from "./header.module.css";

const Header = ({ title, subtitle, isMainPage }) => {
  return (
    <header className={styles.header}>
      <div className={styles.horizontal__container}>
        <h1 className={styles.h1}>
          <Link to="/" className={styles.anchor}>
            {title}
          </Link>
        </h1>
        {isMainPage && <Subtitle>{subtitle}</Subtitle>}
      </div>
      {isMainPage ? <ScrollSidebar /> : <Sidebar />}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isMainPage: PropTypes.bool,
};

Header.defaultProps = {
  title: ``,
  subtitle: ``,
};

export default Header;
