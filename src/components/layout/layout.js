import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "../header/header";
import Block from "../block";
import styles from "./layout.module.css";
import "./global.css";

const Layout = ({ children, isMainPage, className, innerClassName }) => {
  return (
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
          <Header {...siteMetadata} isMainPage={isMainPage} />
          <div
            className={classNames(styles.container, className, {
              [styles.isMain]: isMainPage,
            })}
          >
            {isMainPage && <Block />}
            <main
              className={classNames(innerClassName, styles.main__container, {
                [styles.isMain]: isMainPage,
                [styles.main__isMain]: isMainPage,
              })}
            >
              {children}
            </main>
            <footer />
          </div>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isMainPage: PropTypes.bool,
  layoutClassName: PropTypes.string,
};

Layout.defaultProps = {
  isMainPage: false,
};

export default Layout;
