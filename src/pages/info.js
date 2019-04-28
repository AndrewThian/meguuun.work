import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
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

const FadeIn = ({ children, show }) => {
  const fadeInRef = useLaxElement();

  return (
    <div
      ref={fadeInRef}
      className={classNames(styles.column, styles.column__hide, {
        [styles.column__show]: show,
        lax: !show,
      })}
    >
      {children}
    </div>
  );
};

FadeIn.propTypes = {
  show: PropTypes.bool,
};

FadeIn.defaultProps = {
  show: false,
};

const InfoPage = () => {
  const [showLeft, setShowLeft] = useState(false);
  const [showCenter, setShowCenter] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    if (!isMobile()) {
      setTimeout(() => setShowLeft(true), WAIT_TIME);
      setTimeout(() => setShowCenter(true), WAIT_TIME * 2);
      setTimeout(() => setShowRight(true), WAIT_TIME * 4);
    }
  }, []);

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
