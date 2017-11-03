import R from 'ramda'

const stripMiddleName = (name) => {
  const splitName = name.split(' ')
  if (name.split(' ').pop().length === 1) {
    splitName.pop()
    return splitName.join(' ')
  } else return name
}

const roundToTwoDecimal = (x) => Math.round(x * 100) / 100

const flattenArray = (array) => array.reduce((acc, cur) => {
  if (Array.isArray(cur)) {
    return ([...acc, ...cur])
  } else return ([...acc, cur])
})

const convertCountIntoArray = (count) => {
  let resultArray = []
  for (let i = 1; i <= 5; i++) {
    let c = count[i]
    // if c is undefined continue
    if (!c) continue
    let a = Array(c).fill(Number(i))
    resultArray = [resultArray, ...a]
    resultArray = flattenArray(resultArray)
  }
  return resultArray
}

const sortByTerm = (arr) => {
  const order = {
    'S1': 0,
    'SA': 1,
    'S2': 2,
    'S': 3,
    'W1': 4,
    'WA': 5,
    'W2': 6,
    'WC': 7,
    'W': 8
  }
  return R.sort((a, b) => {
    if (a.slice(0, 4) === b.slice(0, 4)) {
      return (order[a.slice(4, 6)] < order[b.slice(4, 6)]) ? -1
                   : (order[a.slice(4, 6)] > order[b.slice(4, 6)]) ? 1 : 0
    } else {
      return (a.slice(0, 4) < b.slice(0, 4) ? -1 : 1)
    }
  }, arr)
}

export {
    stripMiddleName,
    roundToTwoDecimal,
    convertCountIntoArray,
    sortByTerm
}
