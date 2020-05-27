import React from "react";
import Img from "gatsby-image";
import cx from "classnames";

import styles from "../../templates/work.module.css";

const Image = ({
  className,
  data: {
    asset: { fluid },
    typeOfImage,
  },
}) => {
  return (
    <div
      className={cx(className, {
        [styles.fullBleed]: typeOfImage === "full bleed",
      })}
    >
      <Img fluid={fluid} />
    </div>
  );
};

export default Image;
