//  https://repl.it/@AndrewThian/extracting-position-from-data

const hash = {}

function extract(obj) {
  /**
   * accepts an obj with only and single key value pair
   * 
   * attempts to extract a position value out of the value
   * and add it to an object with [position]:[object]
   */
  const key = Object.keys(obj)[0]
  const value = obj[key]
  value.forEach((ele, idx) => {
    ele.componentType = key
    hash[ele.position] = ele
  })
}

export default (...datas) => {
  const isNotNull = e => {
    const k = Object.keys(e)
    return !!e[k]
  }
  datas.filter(isNotNull).forEach(data => {
    extract(data)
  })

  const positionIDs = Object.keys({ ...hash }).map(e => parseInt(e, 10)).sort((a, b) => a - b)

  return {
    positionIDs,
    hash
  }
}