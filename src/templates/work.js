import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { WindowSize } from "react-fns";
import cx from "classnames";
import ReactPlayer from "react-player";
import Grid from "../components/grid-image/GridImage";
import extractor from "../utils/position-extractor";
import Text from "../components/text";
import Credits from "../components/credits";

import styles from "./work.module.css";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

const getHeight = width => Math.trunc((width / 16) * 9);

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

const Video = ({ data, className }) => {
  return (
    <div
      className={cx({
        [className]: data.typeOfVideo !== "full bleed",
      })}
    >
      <WindowSize
        render={({ width }) => {
          return (
            <ReactPlayer
              config={{ youtube: { playerVars: { showInfo: 0 } } }}
              url={data.videoUrl}
              width="100%"
              height={getHeight(width)}
            />
          );
        }}
      />
    </div>
  );
};

const componentMap = {
  images: Image,
  content: Text,
  // and the video component
  videos: Video,
};

function insertAt(arr, index, ...ele) {
  arr.splice(index, 0, ...ele);
}

const WorkPage = ({ data }) => {
  const {
    detailPage: {
      content = null,
      credits = null,
      images = null,
      videos = null,
      gridImages = null,
    },
  } = data;

  const { hash, positionIDs } = extractor({ content }, { images }, { videos });

  // hardcode grid images at position 3
  if (gridImages) {
    insertAt(positionIDs, 2, "gridImages");
  }

  return (
    <Layout innerClassName={cx(styles.layout, styles.layout)}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={styles.container}>
        {positionIDs.map(position => {
          if (position === "gridImages") {
            return (
              <Grid
                className={styles.element}
                key="grid-images-megunnn.work"
                images={gridImages.gridTypeImages}
              />
            );
          } else {
            const { componentType } = hash[position];
            return React.createElement(componentMap[componentType], {
              className: styles.element,
              key: hash[position].id,
              data: hash[position],
            });
          }
        })}
        <Credits className={styles.element} creditInfo={credits} />
      </div>
    </Layout>
  );
};

export default WorkPage;

export const query = graphql`
  query($id: String!) {
    detailPage: contentfulDetailPage(id: { eq: $id }) {
      id
      content {
        id
        position
        contentType
        title
        textNode: childContentfulDetailPageContentContentRichTextNode {
          richTextDocument: json
        }
      }
      credits: childContentfulDetailPageCreditsRichTextNode {
        richTextDocument: json
      }
      videos {
        id
        position
        typeOfVideo
        videoUrl
      }
      images {
        id
        position
        typeOfImage
        asset {
          fluid(maxWidth: 1500, quality: 100) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
      gridImages {
        gridTypeImages {
          id
          fluid(maxWidth: 500, quality: 100) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
    }
  }
`;
