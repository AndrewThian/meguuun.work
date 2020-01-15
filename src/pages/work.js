import React, { useState, useEffect, Fragment } from "react";
import { graphql } from "gatsby";
import classNames from "classnames";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

const WorkPage = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div>
        <span>still under construction</span>
      </div>
    </Layout>
  );
};

export default WorkPage;

export const query = graphql`
  query($slug: String!) {
    contentfulDetailPage(metadata: { slug: { eq: $slug } }) {
      id
      content {
        position
        contentType
        title
        childContentfulDetailPageContentContentRichTextNode {
          content
          json
        }
      }
    }
  }
`;
