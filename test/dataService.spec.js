import * as dataService from '../src/service/dataService'
import assert from 'assert'

describe('createFilterString', () => {
  it('returns a string with the appropriate paramters', () => {
    const data = {
      time: {
        year: '2016',
        term: 'W2'
      },
      courseNum: 'LFSLC 100 001',
      department: 'LFS',
      toggleBelowMin: true,
      questionCode: 'UMI6',
      classSizeMin: 0,
      classSizeMax: 300 // [min, max]
    }
    const chartKey = 'c1'
    const expected = 'data/c1/2016/W2/LFSLC 100 001/LFS/true/UMI6/0/300'
    assert.deepEqual(expected, dataService.createFilterString(data, chartKey))
  })
})
