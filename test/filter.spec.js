import * as filter from '../src/util/filter'
import assert from 'assert'

const data = [1,2,3,4,5]
describe('filterGreaterThanNumber', () => {
    const expected = [3,4,5]
    it('takes an array of numbers and a number and returns an array with numbers greater than the supplied number', () => {
        const filterGReaterThan2 = filter.greaterThanNumber(2)
        assert.deepEqual(expected, filterGReaterThan2(data))
    })
})