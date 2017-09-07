import R from 'ramda'

const greaterThanNumber = (number) => R.filter(x => x > number)

export {
    greaterThanNumber
}