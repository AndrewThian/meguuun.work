/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");
const slash = require("slash");

module.exports = {
  createPages: async ({ graphql, actions }) => {
    const { data } = await graphql(`
      {
        allContentfulIndexPage {
          edges {
            node {
              metadata {
                slug
              }
            }
          }
        }
      }
    `);

    const workTemplate = path.resolve("./src/pages/work.js");

    const {
      allContentfulIndexPage: { edges },
    } = data;
    edges.forEach(edge => {
      const {
        node: {
          metadata: { slug },
        },
      } = edge;
      const { createPage } = actions;
      createPage({
        path: `/work/${slug}`,
        component: slash(workTemplate),
        context: {
          slug,
          id: edge.node.id,
        },
      });
    });
  },
};
