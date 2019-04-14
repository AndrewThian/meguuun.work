import React from "react";
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
              comments {
                comments
              }
              featuredOn
              contact {
                id
                email
                phoneNumber
                etc
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
              summary: { summary: summaryText },
              comments: { comments: commentsText },
              featuredOn,
              contact: { email, phoneNumber, etc },
            },
          }) => (
            <div className={styles.about__container}>
              <div>
                <span>{summaryText}</span>
              </div>
              <div>
                <span>Featured on</span>
                <div className={styles.featured__innerContainer}>
                  {featuredOn.map(feature => (
                    <span className={styles.bold}>{feature}</span>
                  ))}
                </div>
              </div>
              <div>
                <span>{commentsText}</span>
              </div>
              <div>
                <div>
                  <span className={styles.contatct__title}>Email </span>
                  <span>{email}</span>
                </div>
                <div>
                  <span className={styles.contatct__title}>Phone </span>
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