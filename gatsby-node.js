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
        allContentfulDetailPage {
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

    const workTemplate = path.resolve("./src/templates/work.js");

    const {
      allContentfulDetailPage: { edges },
    } = data;

    await Promise.all(
      edges.map(async edge => {
        const slug = edge.node.metadata.slug;
        const {
          data: { contentfulDetailPage },
        } = await graphql(
          `
            query($slug: String!) {
              contentfulDetailPage(metadata: { slug: { eq: $slug } }) {
                id
              }
            }
          `,
          { slug: slug }
        );
        const { createPage } = actions;

        if (contentfulDetailPage) {
          createPage({
            path: `/work/${slug}`,
            component: slash(workTemplate),
            context: {
              id: contentfulDetailPage.id,
            },
          });
        }
      })
    );
  },
};
