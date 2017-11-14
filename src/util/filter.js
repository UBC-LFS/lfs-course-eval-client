import R from 'ramda'

const greaterThanNumber = (number) => R.filter(x => x > number)

const byYear = (year) => R.filter(x => x.AcademicPeriod === year)

const filterByTerm = (term, arr) => {
  if (term === 'all') return arr.slice(-15)
  return arr.filter(x => x.year.slice(-2) === term).slice(-15)
}

export {
    greaterThanNumber,
    byYear,
    filterByTerm
}
