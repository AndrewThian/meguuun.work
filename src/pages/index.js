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
        {/* {[10, 13, 19, 15, 16, 10, 11, 12, 13, 13, 19, 11, 11, 13].map(
          (val, idx) => {
            return (
              <article
                className={styles.outer}
                style={{ width: `${val * 10}px`, height: `${val * 10}px` }}
                key={`${val}_${idx}`}
              >
                {`${val}_${idx}`}
              </article>
            );
          }
        )} */}
        <article>
          {assets.map(({ node: { title, fluid } }) => {
            return <Img key={fluid.src} fluid={fluid} alt={title} />;
          })}
        </article>
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
          slug
          thumbnail {
            fluid {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
