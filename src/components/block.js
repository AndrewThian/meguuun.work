import React from "react";
import PropTypes from "prop-types";
import { useLaxElement } from "use-lax";

const Block = ({ color }) => {
  const ref = useLaxElement();

  return (
    <div
      ref={ref}
      className="block"
      data-lax-opacity="0 1, 100 1, 200 0"
      style={{ backgroundColor: color }}
    />
  );
};

Block.propTypes = {
  color: PropTypes.string,
};

Block.defaultProps = {
  color: "#fedd00",
};

export default Block;
