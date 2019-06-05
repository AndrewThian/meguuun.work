import React, { Component, createRef } from "react";
import Img from "gatsby-image";
import throttle from "lodash.throttle";
import classNames from "classnames";

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

class ProjectThumbnail extends Component {
  titleEle = null;
  imgEle = null;

  state = {
    top: 0,
    left: 0,
    titleWidth: 0,
  };

  titleRef = createRef();

  componentDidMount() {
    const titleElement = this.titleRef.current;
    if (titleElement) {
      this.storeElementDimensions({ titleWidth: titleElement.offsetWidth });
    }
  }

  storeElementDimensions(titleDimensions) {
    this.setState(state => ({
      ...state,
      ...titleDimensions,
    }));
  }

  getDiffRatio(srcWidth, srcHeight) {
    const { innerWidth, innerHeight } = this.props;
    const browserAspectRatio = getAspectRatio(innerWidth, innerHeight);
    const areaLimit = getAreaLimit(browserAspectRatio);
    const maxArea = (innerWidth * innerHeight) / areaLimit;
    return Math.sqrt(maxArea / (srcWidth * srcHeight));
  }

  throttledEventHandler = throttle(
    e => {
      const { top: imgTop, left: imgLeft } = e.target.getBoundingClientRect();
      const { clientX, clientY } = e;

      this.setState(state => ({
        ...state,
        top: clientY - imgTop,
        left: clientX - imgLeft,
      }));
    },
    16,
    { leading: true }
  );

  handlePointerMove = e => {
    e.persist();
    this.throttledEventHandler(e);
  };

  handlePointerEnter = () => {
    const {
      asset: {
        node: { title },
      },
      handleCurrentTitle,
    } = this.props;
    handleCurrentTitle(title);
  };

  handlePointerLeave = () => {
    const { handleCurrentTitle } = this.props;
    handleCurrentTitle("");
  };

  render() {
    const {
      isFirst,
      isLast,
      asset: {
        node: {
          title,
          thumbnail: { fluid, file },
        },
      },
    } = this.props;

    const [srcWidth, srcHeight] = getOriginalImgDetails(file);
    const diffRatio = this.getDiffRatio(srcWidth, srcHeight);

    return (
      <div
        className={classNames(styles.image__container, {
          [styles.isFirst]: isFirst,
          [styles.isLast]: isLast,
        })}
        onPointerEnter={this.handlePointerEnter}
        onPointerMove={this.handlePointerMove}
        onPointerLeave={this.handlePointerLeave}
        style={{
          width: srcWidth * diffRatio,
          height: srcHeight * diffRatio,
        }}
      >
        <Img fluid={fluid} alt={title} className={styles.image} />
        {this.props.isCurrent && (
          <p
            className={styles.text__dynamic}
            style={{
              top: this.state.top,
              left: this.state.left - this.state.titleWidth,
            }}
          >
            {this.props.currentTitle}
          </p>
        )}
        <p ref={this.titleRef} className={styles.text__static}>
          {title}
        </p>
      </div>
    );
  }
}

export default ProjectThumbnail;
