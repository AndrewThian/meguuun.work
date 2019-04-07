import PropTypes from "prop-types";
import React from "react";
import { useLaxElement } from "use-lax";

import styles from "./subtitle.module.css";

const Subtitle = ({ children }) => {
  const ref = useLaxElement();
  return (
    <h1 ref={ref} className={styles.h1} data-lax-translate-y="0 0, 100 -100">
      {children}
    </h1>
  );
};

export default Subtitle;
