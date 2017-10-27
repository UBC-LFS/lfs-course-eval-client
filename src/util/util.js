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

export {
    stripMiddleName,
    roundToTwoDecimal,
    convertCountIntoArray
}
