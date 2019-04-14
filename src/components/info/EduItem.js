import React from "react";

import styles from "./EduItem.module.css";

const EduItem = ({ school, course, award, year }) => {
  return (
    <div>
      <span className={styles.title}>{school}</span>
      <div className={styles.container}>
        <span>{course}, </span>
        <span>{award}</span>
        <span>{new Date(year).getUTCFullYear()}</span>
      </div>
    </div>
  );
};

export default EduItem;
