import React, { Component } from "react";
import throttle from "lodash.throttle";

import styles from "./DynamicTitle.module.css";

// const DynamicTitle = ({ text }) => {
//   const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });

//   const handleCoordinates = throttle(
//     e => {
//       setCoordinates({
//         top: e.pageY,
//         left: e.pageX,
//       });
//     },
//     16,
//     { leading: true }
//   );

//   useEffect(() => {
//     document.addEventListener("pointermove", handleCoordinates, false);
//     return () => {
//       document.removeEventListener("pointermove", handleCoordinates, false);
//     };
//   }, [coordinates]);

//   return (
//     <span
//       className={styles.title}
//       onPointerMove={e => e.stopPropagation()}
//       style={coordinates}
//     >
//       {text}
//     </span>
//   );
// };

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
    // console.log(prevState, prevProps);

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
