import React from "react";

import Layout from "../components/layout/layout";
import Block from "../components/block";
import SEO from "../components/seo";

const IndexPage = () => {
  return (
    <Layout isMainPage>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    </Layout>
  );
};

export default IndexPage;
