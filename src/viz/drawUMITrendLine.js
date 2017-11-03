import { margin } from '../constants/constants'
import { sortByTerm } from '../util/util'
import * as d3 from 'd3'

let sampleArr = [
  {
    year: '2015',
    UMI: 4
  },
  {
    year: '2014',
    UMI: 5
  },
  {
    year: '2013',
    UMI: 3
  }
]

const drawUMITrendLine = (data = sampleArr) => {
  data = data.sort((a, b) => Number(a.year) - Number(b.year))
  // const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const w = 300
  const h = 150
  const width = w - margin.left - margin.right
  const height = h - margin.top - margin.bottom

  const svg = d3.select(document.createElement('div')).append('svg')
    .attr('width', w)
    .attr('height', h)

  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const x = d3.scaleBand().rangeRound([0, width])
  const y = d3.scaleLinear().rangeRound([height, 0])

  const line = d3.line()
    .x((d) => x(d.year) + margin.left)
    .y((d) => y(d.UMI))

  x.domain(data.map((d) => d.year))
  y.domain([0, d3.max(data, (d) => d.UMI)])

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(5))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.9em')
    .attr('text-anchor', 'end')
    .text('Frequency')

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))

  g.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)

  g.selectAll('circle')
    .data(data)
  .enter().append('circle')
    .attr('class', 'circle')
    .attr('cx', (d) => x(d.year) + margin.left)
    .attr('cy', (d) => y(d.UMI))
    .attr('r', 4)
  return svg
}

export default drawUMITrendLine
