import React, { Component } from "react";
import lax from "lax.js";

class LaxWrapper extends Component {
  constructor() {
    super();

    lax.setup();

    const updateLax = () => {
      lax.update(window.scrollY);
    };

    document.addEventListener("scroll", updateLax, false);

    updateLax();
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default LaxWrapper;
