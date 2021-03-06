import React, { Component } from "react";
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

class IndexPage extends Component {
  state = {
    currentTitle: "",
  };

  handleCurrentTitle = title => {
    this.setState(state => ({
      ...state,
      currentTitle: title,
    }));
  };

  render() {
    const {
      data: {
        contentfulIndexPagePositioning: { thumbnails },
      },
    } = this.props;

    const projectThumbnails = ({ width: innerWidth, height: innerHeight }) => {
      return (
        <section id="work" className={styles.container}>
          {thumbnails.map((asset, idx) => {
            const {
              metadata: { title },
              id,
            } = asset;
            return (
              <ProjectThumbnail
                idx={idx}
                currentTitle={this.state.currentTitle}
                isCurrent={this.state.currentTitle === title}
                key={id}
                asset={asset}
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                handleCurrentTitle={this.handleCurrentTitle}
                isFirst={idx === 0}
                isLast={idx === thumbnails.length - 1}
              />
            );
          })}
        </section>
      );
    };

    return (
      <Layout isMainPage>
        <SEO title="Megun" keywords={[`gatsby`, `application`, `react`]} />
        <WindowSize throttle={32} render={projectThumbnails} />
      </Layout>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query {
    contentfulIndexPagePositioning {
      thumbnails {
        id
        metadata {
          slug
          title
        }
        thumbnail {
          file {
            details {
              originalImg: image {
                width
                height
              }
            }
          }
          fluid(maxWidth: 800, quality: 99) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
    }
  }
`;
