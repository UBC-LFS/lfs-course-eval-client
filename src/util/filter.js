import R from 'ramda'

const greaterThanNumber = (number) => R.filter(x => x > number)

const byYear = (year) => R.filter(x => x.AcademicPeriod === year)

const filterByTerm = (term, arr) => {
  if (term === 'all') return arr.slice(-15)
  return arr.filter(x => x.year.slice(4, 6) === term).slice(-15)
}

const filterArrayByTerm = (term, arr) => {
  if (term === 'all') return arr.slice(-15)
  return arr.filter(x => x.slice(4, 6) === term).slice(-15)
}

export {
  greaterThanNumber,
  byYear,
  filterByTerm,
  filterArrayByTerm
}
