import React from "react";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

import styles from "./info.module.css";

const InfoPage = () => {
  return (
    <Layout className={styles.layout}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    </Layout>
  );
};

export default InfoPage;
