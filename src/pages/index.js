import React from "react";
import { graphql } from "gatsby";
import { WindowSize } from "react-fns";

import ProjectThumbnail from "../components/index/ProjectThumbnail";
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
              {assets.map((asset, idx) => {
                return (
                  <ProjectThumbnail
                    key={asset.node.id}
                    asset={asset}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                    isFirst={idx === 0}
                    isLast={idx === assets.length - 1}
                  />
                );
              })}
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
