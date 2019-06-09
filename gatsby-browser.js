/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import React, { useEffect } from "react";
// import { useLax } from "use-lax";

// const LaxWrapper = ({ children }) => {
//   useLax();

//   return <>{children}</>;
// };
import React from "react";
import LaxWrapper from "./src/utils/LaxWrapper";
import { ParallaxProvider } from "react-scroll-parallax";

export const wrapRootElement = ({ element }) => {
  return (
    <ParallaxProvider>
      <LaxWrapper>{element}</LaxWrapper>
    </ParallaxProvider>
  );
};
