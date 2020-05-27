import React from "react";
import { graphql } from "gatsby";
import cx from "classnames";

import Video from "../components/video/Video";
import Image from "../components/image/Image";
import Grid from "../components/grid-image/GridImage";
import Text from "../components/text";
import Credits from "../components/credits";

import styles from "./work.module.css";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

const WorkPage = ({ data }) => {
  const {
    detailPage: { credits = null, components = null },
  } = data;

  return (
    <Layout innerClassName={cx(styles.layout, styles.layout)}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={styles.container}>
        {components &&
          components.map(({ __typename, id, ...rest }) => {
            if (__typename === "ContentfulDetailPageImage") {
              return <Image className={styles.element} key={id} data={rest} />;
            } else if (__typename === "ContentfulDetailPageContent") {
              return <Text className={styles.element} key={id} data={rest} />;
            } else if (__typename === "ContentfulDetailPageVideo") {
              return <Video className={styles.element} key={id} data={rest} />;
            } else if (__typename === "ContentfulGridImages") {
              return (
                <Grid
                  className={styles.element}
                  key={id}
                  images={rest.gridTypeImages}
                />
              );
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
      credits: childContentfulDetailPageCreditsRichTextNode {
        richTextDocument: json
      }
      components {
        __typename
        ... on ContentfulDetailPageContent {
          id
          contentType
          title
          textNode: childContentfulDetailPageContentContentRichTextNode {
            richTextDocument: json
          }
        }
        ... on ContentfulDetailPageImage {
          id
          typeOfImage
          asset {
            fluid(maxWidth: 1500, quality: 100) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
        ... on ContentfulDetailPageVideo {
          id
          typeOfVideo
          videoUrl
        }
        ... on ContentfulGridImages {
          id
          gridTypeImages {
            id
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
