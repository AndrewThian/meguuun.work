import React from "react";
import Img from "gatsby-image";
import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./GridImage.module.css";

function GridImage({ images, className }) {
  return (
    <div className={cx(className, styles.grid)}>
      {images.map(({ id, fluid }) => {
        return <Img key={id} fluid={fluid} />;
      })}
    </div>
  );
}

GridImage.propTypes = {
  images: PropTypes.array,
};

export default GridImage;
