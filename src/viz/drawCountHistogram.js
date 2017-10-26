import * as d3 from 'd3'
import { convertCountIntoArray } from '../util/util'

let sampleCount = {
  '1': 12,
  '2': 15,
  '3': 20,
  '4': 40,
  '5': 80
}

const drawCountHistogram = (count = sampleCount) => {
  const arrayOfCounts = convertCountIntoArray(count)
  const histogram = d3.histogram()
    .value((d) => d)
    .
}

export default drawCountHistogram
