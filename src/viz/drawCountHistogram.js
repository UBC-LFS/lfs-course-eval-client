import { margin, height } from '../constants/constants'
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
  const x = d3.scaleLinear().domain([1, 2, 3, 4, 5]).rangeRound([0, width])
  const y = d3.scaleLinear().range([height, 0])

  const width = 960 - margin.left - margin.right

  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')

  const arrayOfCounts = convertCountIntoArray(count)
  const histogram = d3.histogram()

  const bins = histogram(arrayOfCounts)

  y.domain(0, d3.max(bins))

  svg.selectAll('rect')
    .data(bins)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', 1)
    .attr('transform', (d) => 'translate(' + x(d.x0) + ',' + y(d.length) + ')')
    .attr('width', (d) => x(d.x1) - x(d.x0) - 1)
    .attr('height', (d) => height - y(d.length))

  console.log(bins)
}

export default drawCountHistogram
