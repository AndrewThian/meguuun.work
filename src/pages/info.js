import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useLaxElement } from "use-lax";

import styles from "./info.module.css";

import SEO from "../components/seo";
import About from "../components/info/About";
import Layout from "../components/layout/layout";
import WorkList from "../components/info/WorkList";
import ClientsList from "../components/info/ClientsList";
import EduList from "../components/info/EduList";
import { isMobile } from "../utils/CheckMobile";

const WAIT_TIME = 100;
const MULTIPLIER = 2;

const FadeMobile = ({ children }) => {
  const fadeInRef = useLaxElement();

  useEffect(() => {
    if (!isMobile()) {
      setTimeout(() => setShowFade(true), animOffset);
    }
  }, []);

  return (
    <div
      ref={fadeInRef}
      data-lax-opacity="(vh-100) 0, (vh-200) 1, (vh-300) 1"
      data-lax-anchor="self"
      className={classNames(styles.column, styles.column__hide)}
    >
      {children}
    </div>
  );
};

const FadeDesktop = ({ children, index }) => {
  const [showFade, setShowFade] = useState(false);

  let animOffset = WAIT_TIME;
  if (index > 0) {
    animOffset = index * MULTIPLIER * WAIT_TIME;
  }

  useEffect(() => {
    if (!isMobile()) {
      setTimeout(() => setShowFade(true), animOffset);
    }
  }, []);

  return (
    <div
      className={classNames(styles.column, styles.column__hide, {
        [styles.column__show]: showFade,
      })}
    >
      {children}
    </div>
  );
};

const FadeIn = ({ children, component }) =>
  React.cloneElement(component, null, children);

const InfoPage = () => {
  return (
    <Layout className={styles.layout}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={styles.columns}>
        <FadeIn
          component={isMobile() ? <FadeMobile /> : <FadeDesktop index={0} />}
        >
          <div>
            <h1 className={styles.h1}>About</h1>
            <About />
          </div>
        </FadeIn>
        <FadeIn
          component={isMobile() ? <FadeMobile /> : <FadeDesktop index={1} />}
        >
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
        <FadeIn
          component={isMobile() ? <FadeMobile /> : <FadeDesktop index={2} />}
        >
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
