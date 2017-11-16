/* global describe, it */
import * as get from '../src/util/get'
import assert from 'assert'

describe('getDept', () => {
  it('takes an array and retruns an array with just the uniq depts', () => {
    let input = [
      { deptName: 'LFS' },
      { deptName: 'LFS' },
      { deptName: 'LFS' },
      { deptName: 'APBI' },
      { deptName: 'FNH' }
    ]
    let output = ['LFS', 'APBI', 'FNH']
    assert.deepEqual(get.getDepts(input), output)
  })
})
