import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import styles from "./header.module.css";

const Header = ({ title, subtitle }) => (
  <header className={styles.header}>
    <div className={styles.div__container}>
      <h1 className={styles.h1}>
        <Link to="/" className={styles.anchor}>
          {title}
        </Link>
      </h1>
      <h1 className={styles.h1}>{subtitle}</h1>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

Header.defaultProps = {
  title: ``,
  subtitle: ``,
};

export default Header;
