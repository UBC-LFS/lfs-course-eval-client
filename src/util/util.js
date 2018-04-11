import R from 'ramda'

const stripMiddleName = name => {
  const splitName = name.split(' ')
  if (name.split(' ').pop().length === 1) {
    splitName.pop()
    return splitName.join(' ')
  } else return name
}

const roundToTwoDecimal = x => Math.round(x * 100) / 100

const convertYearTermtoDate = array => {
  for (var i = 0; i < array.length; i++) {
    const date = new Date(2017, 0, 1, 0, 0)
    date.setMinutes(date.getMinutes() + i)
    array[i].date = date.toString()
  }
  return array
}

const expandCount = count => {
  let result = []
  Object.keys(count).map(x => {
    const temp = Array(count[x]).fill(Number(x))
    result = [...result, ...temp]
  })
  return result
}

const compare = (a, b) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}

const compareCourse = (course1, course2) => {
  const courseArray1 = course1.split(' ')
  const courseArray2 = course2.split(' ')
  const dept1 = courseArray1[0]
  const dept2 = courseArray2[0]
  const courseCode1 = courseArray1[1]
  const courseCode2 = courseArray2[1]
  return compare(dept1, dept2) || compare(courseCode1, courseCode2)
}

const compareLastNameThenFirstName = (instructor1, instructor2) => {
  const nameArray1 = instructor1.name.split(', ')
  const nameArray2 = instructor2.name.split(', ')
  const lastName1 = nameArray1[0]
  const lastName2 = nameArray2[0]
  const firstName1 = nameArray1[1]
  const firstName2 = nameArray2[1]
  return compare(lastName1, lastName2) || compare(firstName1, firstName2)
}
const sortByTerm = arr => {
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
// this 'fills in' any missing counts with 0
const fillInMissingCounts = count => {
  for (let i = 1; i <= 5; i++) {
    const key = String(i)
    if (!count.hasOwnProperty(key)) count[key] = 0
  }
  return count
}

const sumCount = counts => counts.reduce((acc, cur) => {
  cur = fillInMissingCounts(cur)
  for (let scoreIndex = 1; scoreIndex <= 5; scoreIndex++) {
    if (acc[scoreIndex + '']) {
      acc[scoreIndex + ''] = acc[scoreIndex + ''] + cur[scoreIndex + '']
    } else acc[scoreIndex + ''] = cur[scoreIndex + '']
  }
  return acc
}, {})

const umiAvg = count => {
  count = fillInMissingCounts(count)

  const numberOfResponses = Object.keys(count).reduce((acc, curKey) => (acc += count[curKey]), 0)
  const UMITimesCount = Object.keys(count).reduce((acc, key) => (acc += count[key] * Number(key)), 0)

  return roundToTwoDecimal(UMITimesCount / numberOfResponses)
}

export {
  stripMiddleName,
  roundToTwoDecimal,
  sortByTerm,
  compareLastNameThenFirstName,
  compareCourse,
  convertYearTermtoDate,
  expandCount,
  sumCount,
  umiAvg
}
