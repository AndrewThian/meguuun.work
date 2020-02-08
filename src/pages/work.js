import React, { useState, useEffect, Fragment } from "react";
import { graphql } from "gatsby";
import cx from "classnames";
import Text from "../components/text";
import styles from "./work.module.css";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

const WorkPage = ({ data }) => {
  const { detailPage } = data;

  return (
    <Layout innerClassName={cx(styles.layout, styles.layout)}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Text detailPage={detailPage} />
    </Layout>
  );
};

export default WorkPage;

export const query = graphql`
  query($slug: String!) {
    detailPage: contentfulDetailPage(metadata: { slug: { eq: $slug } }) {
      id
      content {
        id
        position
        contentType
        title
        textNode: childContentfulDetailPageContentContentRichTextNode {
          content
          richTextDocument: json
        }
      }
    }
  }
`;
