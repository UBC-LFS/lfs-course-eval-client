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
  const width = 500 - margin.left - margin.right

  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleLinear().range([height, 0])

  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g')

  const arrayOfCounts = convertCountIntoArray(count)

  const bins = d3.histogram().thresholds([1, 2, 3, 4, 5])(arrayOfCounts)

  console.log(bins)

  y.domain([0, d3.max(bins, (d) => d.length)])

  const bar = g.selectAll('.bar')
    .data(bins)
    .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => 'translate(' + x((d.x0 - 1) / 5) + ',' + y(d.length) + ')')

  bar.append('rect')
    .attr('x', 1)
    .attr('width', x(bins[0].x1 / 5) - x(bins[0].x0 / 5) - 1)
    .attr('height', (d) => height - y(d.length))

  bar.append('text')
    .attr('dy', '.75em')
    .attr('y', 6)
    .attr('x', (x(bins[0].x1 / 5) - x(bins[0].x0 / 5)) / 2)
    .attr('text-anchor', 'middle')
    .text((d) => 'UMI' + d.x0 + ': ' + d.length)
}

export default drawCountHistogram
