import React from "react";
import { StaticQuery, graphql } from "gatsby";

import EduItem from "./EduItem";
import styles from "./EduList.module.css";

const EduList = () => {
  return (
    <StaticQuery
      query={graphql`
        query EducationDataQuery {
          allContentfulEducation(sort: { fields: [year], order: DESC }) {
            edges {
              node {
                id
                school
                course
                award
                year
              }
            }
          }
        }
      `}
      render={({ allContentfulEducation: { edges } }) => (
        <div className={styles.container}>
          {edges.map(({ node }) => {
            return <EduItem key={node.id} {...node} />;
          })}
        </div>
      )}
    />
  );
};

export default EduList;
