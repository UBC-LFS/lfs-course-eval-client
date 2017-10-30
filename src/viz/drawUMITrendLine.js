import { margin } from '../constants/constants'
import * as d3 from 'd3'

let sampleArr = [
  {
    period: '2015W1',
    UMI: 4
  },
  {
    period: '2015W2',
    UMI: 5
  },
  {
    period: '2016W1',
    UMI: 3
  }
]

const drawCountHistogram = (arr = sampleArr) => {
  const width = 375 - margin.left - margin.right
  const height = 200

  const svg = d3.select(document.createElement('div').append('svg'))
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g')
}

export default drawCountHistogram
