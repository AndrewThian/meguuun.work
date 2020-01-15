import React, { useState, useEffect, Fragment } from "react";
import { graphql } from "gatsby";
import classNames from "classnames";

import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className={paragraphClass(node)}>{children}</p>;
    },
  },
};

function paragraphClass(node) {
  const className = "odd";
  //alternate logic for 'odd' | 'even'
  return className;
}

const WorkPage = ({ data }) => {
  const {
    detailPage: { content },
  } = data;

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div>
        <span>still under construction</span>
        {content.map(({ textNode: { richTextDocument } }) => {
          console.log(richTextDocument);
          return documentToReactComponents(richTextDocument, options);
        })}
      </div>
    </Layout>
  );
};

export default WorkPage;

export const query = graphql`
  query($slug: String!) {
    detailPage: contentfulDetailPage(metadata: { slug: { eq: $slug } }) {
      id
      content {
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
