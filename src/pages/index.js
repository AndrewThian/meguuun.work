import React from "react";

import Layout from "../components/layout/layout";
import Block from "../components/block";
import SEO from "../components/seo";

import styles from "./index.module.css";

const IndexPage = () => {
  return (
    <Layout isMainPage>
      <SEO title="Megun" keywords={[`gatsby`, `application`, `react`]} />
    </Layout>
  );
};

export default IndexPage;
