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

export const wrapRootElement = ({ element }) => {
  console.log("running");
  return <LaxWrapper>{element}</LaxWrapper>;
};
