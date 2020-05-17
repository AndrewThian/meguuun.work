import React, { Component } from "react";

import styles from "./DynamicTitle.module.css";

class DynamicTitle extends Component {
  state = {
    top: 0,
    left: 0,
  };

  componentDidMount() {
    document.addEventListener("pointermove", this.handleCoordinates, false);
  }

  componentWillUnmount() {
    document.addEventListener("pointermove", this.handleCoordinates, false);
  }

  shouldComponentUpdate(prevState, prevProps) {
    return (
      prevState.top !== this.state.top ||
      prevState.left !== this.state.left ||
      prevProps.text !== this.props.text
    );
  }

  handleCoordinates = e => {
    const pageY = e.pageY;
    const pageX = e.pageX;
    this.setState(state => {
      return {
        ...state,
        top: pageY,
        left: pageX,
      };
    });
  };

  render() {
    return (
      <span
        className={styles.title}
        onPointerMove={e => e.stopPropagation()}
        style={this.state}
      >
        {this.props.text}
      </span>
    );
  }
}

export default DynamicTitle;
