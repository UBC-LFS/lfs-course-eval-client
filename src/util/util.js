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
const compare = (a, b) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}

const compareCourse = (course1, course2) => {
  const courseArray1 = course1.split(' ')
  const courseArray2 = course2.split(' ')
  const faculty1 = courseArray1[0]
  const faculty2 = courseArray2[0]
  const code1 = courseArray1[1]
  const code2 = courseArray2[1]
  return compare(faculty1, faculty2) || compare(code1, code2)
}

const compareLastNameFirstName = (instructor1, instructor2) => {
  const nameArray1 = instructor1.name.split(', ')
  const nameArray2 = instructor2.name.split(', ')
  const lastName1 = nameArray1[0]
  const lastName2 = nameArray2[0]
  const firstName1 = nameArray1[1]
  const firstName2 = nameArray2[1]
  return compare(lastName1, lastName2) || compare(firstName1, firstName2)
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
    if (a.year.slice(0, 4) === b.year.slice(0, 4)) {
      return (order[a.year.slice(4, 6)] < order[b.year.slice(4, 6)]) ? -1
           : (order[a.year.slice(4, 6)] > order[b.year.slice(4, 6)]) ? 1 : 0
    } else {
      return (a.year.slice(0, 4) < b.year.slice(0, 4) ? -1 : 1)
    }
  }, arr)
}

export {
  stripMiddleName,
  roundToTwoDecimal,
  convertCountIntoArray,
  sortByTerm,
  compare,
  compareLastNameFirstName,
  compareCourse
}
