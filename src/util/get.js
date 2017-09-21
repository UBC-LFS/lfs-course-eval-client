import R from 'ramda'

const getDepts = (data) => R.uniq(R.map(x => x.deptName)(data))
const getYears = (data) => R.uniq(R.map(x => Number(x.term.slice(0,4)))(data))
const getTerms = (data) => R.uniq(R.map(x => x.term.slice(4,6))(data))

export {
    getYears,
    getDepts,
    getTerms
}