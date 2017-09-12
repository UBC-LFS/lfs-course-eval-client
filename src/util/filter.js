import R from 'ramda'

const greaterThanNumber = (number) => R.filter(x => x > number)

const byYear = (year) => R.filter(x => x.AcademicPeriod === year)


export {
    greaterThanNumber,
    byYear
}