import React from "react";
import PropTypes from "prop-types";
import UseLaxElement from "../utils/UseLaxElement";

const Block = ({ color }) => {
  const ref = UseLaxElement();

  return (
    <div
      ref={ref}
      className="block lax"
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
