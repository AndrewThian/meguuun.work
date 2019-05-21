import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

import styles from "./index.module.css";

const IndexPage = ({
  data: {
    allContentfulIndexPage: { edges: assets },
  },
}) => {
  return (
    <Layout isMainPage>
      <SEO title="Megun" keywords={[`gatsby`, `application`, `react`]} />
      <section className={styles.container}>
        {assets.map(({ node: { id, title, thumbnail: { fluid } } }) => {
          return (
            <article className={styles.image__container}>
              <Img key={id} fluid={fluid} alt={title} />
            </article>
          );
        })}
      </section>
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
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
