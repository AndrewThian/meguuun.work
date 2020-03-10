import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styles from "./WorkList.module.css";
import WorkItem from "./WorkItem";

const WorkList = () => {
  return (
    <StaticQuery
      query={graphql`
        query WorkDataQuery {
          allContentfulWork(sort: { fields: [startOfJob], order: DESC }) {
            edges {
              node {
                id
                title
                position
                startOfJob
                endOfJob
              }
            }
          }
        }
      `}
      render={({ allContentfulWork: { edges } }) => (
        <div className={styles.container}>
          {edges.map(({ node }) => {
            return <WorkItem key={node.id} {...node} />;
          })}
        </div>
      )}
    />
  );
};

export default WorkList;
