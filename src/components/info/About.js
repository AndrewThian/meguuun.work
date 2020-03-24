import React from "react";
import classNames from "classnames";
import { StaticQuery, graphql } from "gatsby";
import styles from "./About.module.css";

const About = () => (
  <StaticQuery
    query={graphql`
      query AboutDataQuery {
        allContentfulAbout {
          edges {
            node {
              id
              summary {
                summary
              }
              contact {
                id
                email
                phoneNumber
              }
            }
          }
        }
      }
    `}
    render={({ allContentfulAbout: { edges } }) => (
      <div className={styles.container}>
        {edges.map(
          ({
            node: {
              id,
              summary: { summary: summaryText },
              contact: { email, phoneNumber },
            },
          }) => (
            <div key={id} className={styles.about__container}>
              <div>
                <span>{summaryText}</span>
              </div>
              <div>
                <span>Featured on</span>
                <div className={styles.featured__innerContainer}>
                  {[].map(feature => (
                    <span
                      key={feature}
                      className={classNames(styles.bold, styles.italic)}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <span className={classNames(styles.bold, styles.italic)}>
                    Email{" "}
                  </span>
                  <span>{email}</span>
                </div>
                <div>
                  <span className={classNames(styles.bold, styles.italic)}>
                    Phone{" "}
                  </span>
                  <span>{phoneNumber}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    )}
  />
);

export default About;
