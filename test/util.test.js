/* global describe, it */

import * as util from '../src/util/util'
import assert from 'assert'

describe('stripMiddleName', () => {
  it('returns an empty name if given an empty name', () => {
    const data = ''
    const expected = ''
    const stripEmptyName = util.stripMiddleName(data)
    assert.deepEqual(expected, stripEmptyName)
  })
  it('it takes a full name and returns a name without the middle name', () => {
    const data = 'Callie Torres I'
    const expected = 'Callie Torres'
    const stripFullName = util.stripMiddleName(data)
    assert.deepEqual(expected, stripFullName)
  })
  it('should return the name if it does not have a middle name', () => {
    const data = 'Callie Torres'
    const expected = 'Callie Torres'
    const stripFullName = util.stripMiddleName(data)
    assert.deepEqual(expected, stripFullName)
  })
})

describe('roundToTwoDecimal', () => {
  const data = 12.12345678
  const zero = 0
  it('takes in a number and returns that number with two decimal places', () => {
    const expected = 12.12
    assert.deepEqual(expected, util.roundToTwoDecimal(data))
  })
  it('should return 0 if given 0 as input', () => {
    assert.deepEqual(0, util.roundToTwoDecimal(zero))
  })
  it('should round as expected', () => {
    const data = 12.125612321
    const expected = 12.13
    assert.deepEqual(expected, util.roundToTwoDecimal(data))
  })
  it('should round as expected', () => {
    const data = 12.124912321
    const expected = 12.12
    assert.deepEqual(expected, util.roundToTwoDecimal(data))
  })
  it('should round as expected', () => {
    const data = 0.124912321
    const expected = 0.12
    assert.deepEqual(expected, util.roundToTwoDecimal(data))
  })
  it('should round as expected', () => {
    const data = -0.124912321
    const expected = -0.12
    assert.deepEqual(expected, util.roundToTwoDecimal(data))
  })
  it('should round as expected', () => {
    const data = 0.0001
    const expected = 0
    assert.deepEqual(expected, util.roundToTwoDecimal(data))
  })
})

describe('convertCountIntoArray', () => {
  it('takes a count object and returns the array', () => {
    let sampleCount = {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5
    }
    let output = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]
    assert.deepEqual(util.convertCountIntoArray(sampleCount), output)
  })
  it('can handle missing count properties', () => {
    let sampleCount = {
      '1': 1,
      '2': 2
    }
    assert.deepEqual(util.convertCountIntoArray(sampleCount), [1, 2, 2])
    sampleCount = {
      '5': 100
    }
    assert.deepEqual(util.convertCountIntoArray(sampleCount), Array(100).fill(5))
  })
})

describe('sortByTerm', () => {
  it('takes an empty array and returns an empty array', () => {
    const data = []
    const expected = []
    assert.deepEqual(expected, util.sortByTerm(data))
  })
  it('takes an array and returns the sorted version of the array by year and term', () => {
    const data = [{year: '2009W1'}, {year: '2009W2'}, {year: '2010W1'}, {year: '2010W2'}, {year: '2011W2'}, {year: '2011W1'}, {year: '2012W1'}, {year: '2012W2'}, {year: '2013SA'}, {year: '2013WA'}, {year: '2013W1'}, {year: '2013W2'}, {year: '2014SA'}, {year: '2014W2'}, {year: '2016W2'}, {year: '2016W1'}]
    const expected = [{year: '2009W1'}, {year: '2009W2'}, {year: '2010W1'}, {year: '2010W2'}, {year: '2011W1'}, {year: '2011W2'}, {year: '2012W1'}, {year: '2012W2'}, {year: '2013SA'}, {year: '2013W1'}, {year: '2013WA'}, {year: '2013W2'}, {year: '2014SA'}, {year: '2014W2'}, {year: '2016W1'}, {year: '2016W2'}]
    assert.deepEqual(expected, util.sortByTerm(data))
  })
  it('takes an array of 2 and sorts accordingly', () => {
    const simpleData = [{year: '2009W2'}, {year: '2009W1'}]
    const expected = [{year: '2009W1'}, {year: '2009W2'}]
    assert.deepEqual(expected, util.sortByTerm(simpleData))
  })
  it('takes an array of 3 with different years and sorts accordingly', () => {
    const data = [{year: '2009W2'}, {year: '2009W1'}, {year: '2010SA'}]
    const expected = [{year: '2009W1'}, {year: '2009W2'}, {year: '2010SA'}]
    assert.deepEqual(expected, util.sortByTerm(data))
  })
  it('takes an array of 4 with different years but same terms and sorts accorindgly', () => {
    const data = [{year: '2017WC'}, {year: '2015WC'}, {year: '2011WC'}, {year: '2013WC'}]
    const expected = [{year: '2011WC'}, {year: '2013WC'}, {year: '2015WC'}, {year: '2017WC'}]
    assert.deepEqual(expected, util.sortByTerm(data))
  })
  it('takes an array of 7 with same year but different terms and sorts accordingly', () => {
    const data = [{year: '2011WC'}, {year: '2011S2'}, {year: '2011S1'}, {year: '2011W2'}, {year: '2011SA'}, {year: '2011WA'}, {year: '2011W1'}]
    const expected = [{year: '2011S1'}, {year: '2011SA'}, {year: '2011S2'}, {year: '2011W1'}, {year: '2011WA'}, {year: '2011W2'}, {year: '2011WC'}]
    assert.deepEqual(expected, util.sortByTerm(data))
  })
  it('takes an array of 9 with different years and various terms, sorts accordingly', () => {
    const data = [{year: '2015W1'}, {year: '2009WC'}, {year: '2016W1'}, {year: '2020W1'}, {year: '2016W2'}, {year: '2011S2'}, {year: '2009WA'}, {year: '2017S2'}, {year: '2011S1'}]
    const expected = [{year: '2009WA'}, {year: '2009WC'}, {year: '2011S1'}, {year: '2011S2'}, {year: '2015W1'}, {year: '2016W1'}, {year: '2016W2'}, {year: '2017S2'}, {year: '2020W1'}]
    assert.deepEqual(expected, util.sortByTerm(data))
  })
})

describe('compareCourse', () => {
  it('takes a course and sorts it first according to its dept and then according to its courseCode', () => {
    let input = ['APBI 400', 'APBI 350A']
    let output = ['APBI 350A', 'APBI 400']
    assert.deepEqual(input.sort(util.compareCourse), output)
    input = ['FNH 400', 'FNH 300', 'APBI 400', 'APBI 350A']
    output = ['APBI 350A', 'APBI 400', 'FNH 300', 'FNH 400']
    assert.deepEqual(input.sort(util.compareCourse), output)
  })
})
