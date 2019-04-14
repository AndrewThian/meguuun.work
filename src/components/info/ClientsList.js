import React from "react";
import { StaticQuery, graphql } from "gatsby";

import styles from "./ClientsList.module.css";

const WorkList = () => {
  return (
    <StaticQuery
      query={graphql`
        query ClientsDataQuery {
          allContentfulClients {
            edges {
              node {
                id
                companies
              }
            }
          }
        }
      `}
      render={({ allContentfulClients: { edges } }) => (
        <div className={styles.container}>
          {edges.map(({ node: { companies } }) =>
            companies.map((company, index) => (
              <span key={company} className={styles.item}>
                {company}
                {index !== companies.length - 1 && ","}
              </span>
            ))
          )}
        </div>
      )}
    />
  );
};

export default WorkList;
