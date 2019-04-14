import React from "react";
import PropTypes from "prop-types";
import { templateDate } from "../../utils/DateFormat";

import styles from "./WorkItem.module.css";

const WorkItem = ({ title, position, startOfJob, endOfJob, misc }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <div>
        <span>{position}</span>
      </div>
      <span>{templateDate`(${startOfJob} — ${endOfJob})`}</span>
      {misc && (
        <div className={styles.misc}>
          {misc.map((e, i) => (
            <span className={styles.misc__item} key={e}>
              {e}
              {i !== misc.length - 1 && ","}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

WorkItem.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  startOfJob: PropTypes.string.isRequired,
  endOfJob: PropTypes.string.isRequired,
};

export default WorkItem;
