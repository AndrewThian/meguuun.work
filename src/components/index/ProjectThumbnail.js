import React, { Component, createRef } from "react";
import { navigate } from "gatsby";
import Img from "gatsby-image";
import throttle from "lodash.throttle";
import classNames from "classnames";
import { Parallax } from "react-scroll-parallax";

import styles from "./ProjectThumbnail.module.css";

/* diff ratio constants */
const landscape = 4.5;
const portrait = 6;

/* parallax constants */
const parallaxMin = 10;
const parallaxMax = -10;

const getOriginalImgDetails = ({
  details: {
    originalImg: { width, height },
  },
}) => {
  return [width, height];
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
 */

const getAreaLimit = browserAspectRatio => {
  return browserAspectRatio < 1 ? landscape : portrait;
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
  yOffset = 0;

  componentDidMount() {
    this.yOffset = getRandomInt(parallaxMin, parallaxMax);
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

  getBrowserHeight() {
    const { innerHeight } = this.props;

    let height = innerHeight;
    if (typeof window !== "undefined") {
      height = document.documentElement.clientHeight;
    }

    return height;
  }

  getDiffRatio(srcWidth, srcHeight) {
    const { innerWidth } = this.props;
    const height = this.getBrowserHeight();
    const browserAspectRatio = getAspectRatio(innerWidth, height);
    const areaLimit = getAreaLimit(browserAspectRatio);
    const maxArea = (innerWidth * height) / areaLimit;
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
    e.stopPropagation();
    this.throttledEventHandler(e);
  };

  handlePointerEnter = e => {
    e.persist();
    e.stopPropagation();
    const {
      asset: {
        metadata: { title },
      },
      handleCurrentTitle,
    } = this.props;
    handleCurrentTitle(title);
  };

  handlePointerLeave = e => {
    e.persist();
    e.stopPropagation();
    const { handleCurrentTitle } = this.props;
    handleCurrentTitle("");
  };

  navigate = () => {
    const {
      asset: {
        metadata: { slug },
      },
    } = this.props;
    navigate(`/work/${slug}`);
  };

  render() {
    const {
      idx,
      isFirst,
      isLast,
      innerWidth,
      asset: {
        metadata: { title },
        thumbnail: { fluid, file },
      },
    } = this.props;

    const [srcWidth, srcHeight] = getOriginalImgDetails(file);
    const diffRatio = this.getDiffRatio(srcWidth, srcHeight);
    const className = classNames(styles.image__container, {
      [styles.isFirst]: isFirst,
      [styles.isLast]: isLast,
    });

    const thumbnailImage = (
      <>
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
      </>
    );

    const mobileContainer = (
      <div
        onClick={this.navigate}
        className={className}
        style={{
          width: srcWidth * diffRatio,
          height: srcHeight * diffRatio + 40,
        }}
      >
        {thumbnailImage}
      </div>
    );

    const desktopContainer = (
      <Parallax
        className={styles.parallax__container}
        y={[this.yOffset * (idx + 1) + "px", -this.yOffset * (idx + 1) + "px"]}
      >
        <div
          onClick={this.navigate}
          className={className}
          onPointerEnter={this.handlePointerEnter}
          onPointerMove={this.handlePointerMove}
          onPointerLeave={this.handlePointerLeave}
          style={{
            width: srcWidth * diffRatio,
            height: srcHeight * diffRatio,
          }}
        >
          {thumbnailImage}
        </div>
      </Parallax>
    );

    const isMobile = innerWidth < 1024;

    return isMobile ? mobileContainer : desktopContainer;
  }
}

export default ProjectThumbnail;
