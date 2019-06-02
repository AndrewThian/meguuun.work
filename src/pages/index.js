import React from "react";
import { graphql } from "gatsby";
import { WindowSize } from "react-fns";
import Img from "gatsby-image";
import classNames from "classnames";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

import styles from "./index.module.css";

/**
 *
 * @description Current process of retrieving images from contentful
 * and resizing it based on the browser.
 *
 * [Process]:
 *
 * 1. use fluid images, use default image sizes provided by gatsby-image
 * 2. also fetch the actual width and height of the actual image from contenful
 * 3. make use of window resize and a simple formula to derive how to scale the images
 */

const getOriginalImgDetails = ({
  details: {
    originalImg: { width, height },
  },
}) => {
  return [width, height];
};

const getAspectRatio = (width, height) => {
  return (height / width).toFixed();
};

const getAreaLimit = browserAspectRatio => {
  return browserAspectRatio < 1 ? 4.5 : 7;
};

const IndexPage = ({
  data: {
    allContentfulIndexPage: { edges: assets },
  },
}) => {
  return (
    <Layout isMainPage>
      <SEO title="Megun" keywords={[`gatsby`, `application`, `react`]} />
      <WindowSize
        render={({ width: innerWidth, height: innerHeight }) => {
          return (
            <section className={styles.container}>
              {assets.map(
                (
                  {
                    node: {
                      id,
                      title,
                      thumbnail: { fluid, file },
                    },
                  },
                  idx
                ) => {
                  const [srcWidth, srcHeight] = getOriginalImgDetails(file);
                  const browserAspectRatio = getAspectRatio(
                    innerWidth,
                    innerHeight
                  );
                  const areaLimit = getAreaLimit(browserAspectRatio);
                  const maxArea = (innerWidth * innerHeight) / areaLimit;
                  const diffRatio = Math.sqrt(maxArea / (srcWidth * srcHeight));

                  return (
                    <div
                      key={id}
                      className={classNames(styles.image__container, {
                        [styles.isFirst]: idx === 0,
                        [styles.isLast]: idx === assets.length,
                      })}
                      style={{
                        width: srcWidth * diffRatio,
                        height: srcHeight * diffRatio,
                      }}
                    >
                      <Img
                        fluid={fluid}
                        alt={title}
                        imgStyle={{ objectFit: "contain" }}
                      />
                    </div>
                  );
                }
              )}
            </section>
          );
        }}
      />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allContentfulIndexPage {
      edges {
        node {
          id
          title
          thumbnail {
            file {
              details {
                originalImg: image {
                  width
                  height
                }
              }
            }
            fluid {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
