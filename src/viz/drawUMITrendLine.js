import { margin } from '../constants/constants'
import * as d3 from 'd3'

const drawCountHistogram = () => {
  const width = 375 - margin.left - margin.right
  const height = 200

  const svg = d3.select(document.createElement('div').append('svg'))
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g')
}

export default drawCountHistogram
