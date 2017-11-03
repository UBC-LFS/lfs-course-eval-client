import { margin } from '../constants/constants'
import * as d3 from 'd3'
import { convertCountIntoArray } from '../util/util'

let sampleCount = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5
}

const drawCountHistogram = (count = sampleCount) => {
  const w = 300
  const h = 150
  const width = w - margin.left - margin.right
  const height = h - margin.top - margin.bottom

  const svg = d3.select(document.createElement('div')).append('svg')
    .attr('width', w)
    .attr('height', h)

  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleLinear().range([height, 0])

  const arrayOfCounts = convertCountIntoArray(count)

  const bins = d3.histogram().thresholds([1, 2, 3, 4, 5])(arrayOfCounts)

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
    .attr('y', -15)
    .attr('x', (x(bins[0].x1 / 5) - x(bins[0].x0 / 5)) / 2)
    .attr('text-anchor', 'middle')
    .text((d) => d.length)

  return svg
}

export default drawCountHistogram
