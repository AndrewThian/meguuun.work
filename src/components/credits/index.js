import React from 'react'
import styles from './Credits.module.css'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (_, children) => {
      return <ul className={styles.ul}>{children}</ul>
    },
    [BLOCKS.LIST_ITEM]: (_, children) => {
      return <li className={styles.li}>{children}</li>
    }
  }
}

export default ({ className, creditInfo: { richTextDocument } }) => {
  return (
    <div className={className}>
      {documentToReactComponents(richTextDocument, options)}
    </div>
  )
}