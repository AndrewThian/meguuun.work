import React from "react";
import { WindowSize } from "react-fns";
import cx from "classnames";
import ReactPlayer from "react-player";

const getReactPlayerHeight = width => Math.trunc((width / 16) * 9);

const Video = ({ data, className }) => {
  return (
    <div
      className={cx({
        [className]: data.typeOfVideo !== "full bleed",
      })}
    >
      <WindowSize
        render={({ width }) => {
          return (
            <ReactPlayer
              config={{ youtube: { playerVars: { showInfo: 0 } } }}
              url={data.videoUrl}
              width="100%"
              height={getReactPlayerHeight(width)}
            />
          );
        }}
      />
    </div>
  );
};

export default Video;
