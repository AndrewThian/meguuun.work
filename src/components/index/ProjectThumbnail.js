import React, { useState, useRef } from "react";
import Img from "gatsby-image";
import classNames from "classnames";
import throttle from "lodash.throttle";

import styles from "./ProjectThumbnail.module.css";

const getOriginalImgDetails = ({
  details: {
    originalImg: { width, height },
  },
}) => {
  return [width, height];
};

/**
 * @description returns the aspect ratio from window
 * inner measurements
 * @param {number} width innerWidth
 * @param {number} height innerHeight
 */
const getAspectRatio = (width, height) => {
  return (height / width).toFixed();
};

/**
 * @description uses an arbitrary number to get
 * the area limit of each project thumbnail
 * @param {number} browserAspectRatio
 * @hardcoded landscape: [4.5]
 * @hardcoded potrait: [7]
 */
const getAreaLimit = browserAspectRatio => {
  return browserAspectRatio < 1 ? 4.5 : 7;
};

const defaultMouseState = {
  posX: 0,
  posY: 0,
  intersect: false,
};

const getRelativePos = (event, bounding) => {
  return [
    Math.round(Math.ceil(event.clientY - bounding.top)),
    Math.round(Math.ceil(event.clientX - bounding.left)),
  ];
};

const ProjectThumbnail = ({
  asset: {
    node: {
      title,
      thumbnail: { file, fluid },
    },
  },
  innerWidth,
  innerHeight,
  isFirst,
  isLast,
}) => {
  const [srcWidth, srcHeight] = getOriginalImgDetails(file);
  const browserAspectRatio = getAspectRatio(innerWidth, innerHeight);
  const areaLimit = getAreaLimit(browserAspectRatio);
  const maxArea = (innerWidth * innerHeight) / areaLimit;
  const diffRatio = Math.sqrt(maxArea / (srcWidth * srcHeight));

  // const [mouseState, setMouseState] = useState(defaultMouseState);

  // const onMouseMove = event => {
  //   event.persist();
  //   console.log("moving");
  //   // useRef to get dom element then set the bounding client
  //   const bounding = event.target.getBoundingClientRect();
  //   const { clientX, clientY } = event;
  //   const { top, left } = bounding;
  //   const [posX, posY] = getRelativePos({ clientX, clientY }, { top, left });
  //   setMouseState({
  //     posX,
  //     posY,
  //     intersect: true,
  //   });
  // };

  // const handleMouseLeave = () => {
  //   setMouseState(defaultMouseState);
  // };

  // const throttleOnMouseMove = useRef(
  //   throttle(onMouseMove, 16, { leading: true })
  // );

  // const persistMouseMove = e => {
  //   e.persist();
  //   throttleOnMouseMove.current(e);
  // };

  return (
    <div
      className={classNames(styles.image__container, {
        [styles.isFirst]: isFirst,
        [styles.isLast]: isLast,
      })}
      style={{
        width: srcWidth * diffRatio,
        height: srcHeight * diffRatio,
      }}
      // onMouseMove={persistMouseMove}
      // onMouseLeave={handleMouseLeave}
    >
      <Img fluid={fluid} alt={title} />
      {/* <span
        className={classNames(styles.title, {
          [styles.title__mouseEnter]: mouseState.intersect,
        })}
        onMouseMove={e => e.stopPropagation()}
        style={{
          top: mouseState.posX,
          left: mouseState.posY,
        }}
      >
        {title}
      </span> */}
    </div>
  );
};

export default ProjectThumbnail;
