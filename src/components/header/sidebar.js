import React from "react";
import { Link } from "gatsby";
import { Scroll } from "react-fns";
import classNames from "classnames";
import UseLaxElement from "../../utils/UseLaxElement";

import styles from "./sidebar.module.css";

export const ScrollSidebar = () => {
  const verticalBarRef = UseLaxElement();
  return (
    <div ref={verticalBarRef} data-lax-translate-x="0 0, 100 153 | speed=0.5">
      <Sidebar withScroll />
    </div>
  );
};

export const Sidebar = ({ withScroll }) => {
  return (
    <Scroll
      render={({ y }) => {
        return (
          <div
            className={classNames({
              [`${styles.withoutScroll__container}`]: !withScroll,
              [`${styles.withScroll__container}`]: withScroll,
            })}
          >
            <h3 className={styles.h3}>
              <Link
                to="/info/"
                activeClassName={styles.activeAnchor}
                className={classNames(styles.anchor, styles.infoAnchor)}
              >
                Info
              </Link>
            </h3>
            <h3 className={styles.h3}>
              <Link
                to="/#work"
                getProps={() =>
                  y > 220 && {
                    className: styles.activeAnchor,
                  }
                }
                activeClassName={styles.activeAnchor}
                className={styles.anchor}
              >
                work
              </Link>
            </h3>
          </div>
        );
      }}
    />
  );
};
