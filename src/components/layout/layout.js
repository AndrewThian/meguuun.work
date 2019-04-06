import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "../header/header";
import styles from "./layout.module.css";
import "./layout.css";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={({ site: { siteMetadata } }) => (
      <>
        <Header {...siteMetadata} />
        <div className={styles.layout__container}>
          <main>{children}</main>
          <footer />
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
