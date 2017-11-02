import { margin } from '../constants/constants'
import * as d3 from 'd3'
import { convertCountIntoArray } from '../util/util'

const drawCountHistogram = (count) => {
  const width = 375 - margin.left - margin.right
  const height = 100

  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleLinear().range([height, 0])

  const svg = d3.select(document.createElement('div')).append('svg')
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g')

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
    .attr('y', 6)
    .attr('x', (x(bins[0].x1 / 5) - x(bins[0].x0 / 5)) / 2)
    .attr('text-anchor', 'middle')
    .text((d) => d.length)

  return svg
}

export default drawCountHistogram
