import React, { useState, useEffect } from "react";
import classNames from "classnames";

import Layout from "../components/layout/layout";
import SEO from "../components/seo";

import styles from "./info.module.css";

import About from "../components/info/About";
import WorkList from "../components/info/WorkList";
import ClientsList from "../components/info/ClientsList";
import EduList from "../components/info/EduList";

const transitionTime = 500;

const FadeIn = ({ children, show }) => (
  <div
    className={classNames(styles.column, styles.column__hide, {
      [styles.column__show]: show,
    })}
  >
    {children}
  </div>
);

const InfoPage = () => {
  const [showLeft, setShowLeft] = useState(false);
  const [showCenter, setShowCenter] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    setShowLeft(true);

    if (showLeft) {
      setTimeout(() => setShowCenter(true), transitionTime);
    }
    if (showCenter) {
      setTimeout(() => setShowRight(true), transitionTime);
    }
  }, [showLeft, showCenter]);

  return (
    <Layout className={styles.layout}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={styles.columns}>
        <FadeIn show={showLeft}>
          <div>
            <h1 className={styles.h1}>About</h1>
            <About />
          </div>
        </FadeIn>
        <FadeIn show={showCenter}>
          <div>
            <div className={styles.small__container}>
              <h1 className={styles.h1}>Clients</h1>
              <ClientsList />
            </div>
            <div>
              <h1 className={styles.h1}>Education</h1>
              <EduList />
            </div>
          </div>
        </FadeIn>
        <FadeIn show={showRight}>
          <div>
            <h1 className={classNames(styles.h1, styles.info__title)}>Work</h1>
            <WorkList />
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
};

export default InfoPage;
