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
