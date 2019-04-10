import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useLaxElement } from "use-lax";

import styles from "./sidebar.module.css";

export const ScrollSidebar = () => {
  const verticalBarRef = useLaxElement();
  return (
    <div ref={verticalBarRef} data-lax-translate-x="0 -100, 100 0 | speed=0.5">
      <Sidebar withScroll />
    </div>
  );
};

export const Sidebar = ({ withScroll }) => {
  return (
    <div
      className={classNames({
        [`${styles.withoutScroll__container}`]: !withScroll,
        [`${styles.withScroll__container}`]: withScroll,
      })}
    >
      <h3 className={styles.h3}>
        <Link
          to="/info"
          activeClassName={styles.activeAnchor}
          className={classNames(styles.anchor, styles.infoAnchor)}
        >
          Info
        </Link>
      </h3>
      <h3 className={styles.h3}>
        <Link
          to="/work"
          activeClassName={styles.activeAnchor}
          className={styles.anchor}
        >
          work
        </Link>
      </h3>
    </div>
  );
};
