import R from 'ramda'

const getDepts = data => R.uniq(R.map(x => x.deptName)(data))
const getTerms = data => R.uniq(R.map(x => x.term.slice(4, 6))(data))

export {
    getDepts,
    getTerms
}
