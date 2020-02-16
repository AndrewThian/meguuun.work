import React from "react";
import cx from "classnames";
import styles from "./text.module.css";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className={styles.p}>{children}</p>;
    },
  },
};

const Title = ({ children }) => {
  const regexp = RegExp("_newline_");
  if (typeof children !== "string") return "";
  if (regexp.test(children)) {
    const titles = children.split("_newline_");
    return titles.map((e, idx) => {
      return (
        <h3
          key={`${e}_${idx}`}
          className={cx(styles.title, {
            [styles.marginBottom]: idx === titles.length - 1,
          })}
        >
          {e}
        </h3>
      );
    });
  }
  return <h3 className={cx(styles.title, styles.marginBottom)}>{children}</h3>;
};

export default ({ className, data: { textNode: { richTextDocument }, title, contentType } }) => {
  return (
    <div className={cx(className, styles.container, {
      [styles.center]: contentType === 'center'
    })}>
      <div className={cx(styles.element)}>
        {title && <Title>{title}</Title>}
        {documentToReactComponents(richTextDocument, options)}
      </div>
    </div>
  );
};
