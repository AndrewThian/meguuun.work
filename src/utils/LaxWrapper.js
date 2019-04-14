import React, { useEffect } from "react";
import lax from "lax.js";

const LaxWrapper = ({ children }) => {
  lax.setup();

  useEffect(() => {
    const updateLax = () => {
      lax.update(window.scrollY);
    };

    document.addEventListener("scroll", updateLax, false);

    updateLax();

    return () => {
      document.removeEventListener("scroll", updateLax);
    };
  }, []);

  return <>{children}</>;
};

export default LaxWrapper;
