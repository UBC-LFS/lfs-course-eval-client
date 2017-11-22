import { margin } from '../constants/constants'
import { sortByTerm } from '../util/util'
import { filterByTerm, filterArrayByTerm } from '../util/filter'
import * as d3 from 'd3'
import R from 'ramda'

const drawUMITrendLine = (uniqueTerms, data, term = 'all') => {
  const filteredTerms = filterArrayByTerm(term, uniqueTerms)
  const dataGroup = R.map(facultyDept => R.filter(yearRecord => filteredTerms.includes(yearRecord.year), facultyDept.values), data)
  let facultyDept = []
  const w = 1000
  const h = 600
  const width = w - margin.left - margin.right
  const height = h - margin.top - margin.bottom

  const svg = d3.select(document.createElement('div')).append('svg')
    .attr('width', w)
    .attr('height', h)

  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const x = d3.scaleBand().rangeRound([0, width])
  const y = d3.scaleLinear().rangeRound([height, 0])

  const line = d3.line()
    .x(d => (x(facultyDept[1].year) - x(facultyDept[0].year)) / 2 + x(d.year))
    .y(d => y(d.UMI))

  x.domain(filteredTerms)
  y.domain([0, 5]) // d3.max(data, d => d.UMI)]

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

  dataGroup.forEach(function (n, i) {
    facultyDept = sortByTerm(n)
    g.append('path')
      .datum(facultyDept)
      .attr('class', 'dynamicline')
      .attr('d', line)
      .attr('stroke', function (d, j) {
        return 'hsl(' + Math.random() * 360 + ',100%,50%)'
    })
  })
  const uniqueDataGroup = R.uniq(sortByTerm(dataGroup[0].concat(dataGroup[1])))
  g.selectAll('circle')
  .data(uniqueDataGroup)
  .enter().append('circle')
  .attr('class', 'circle')
  .attr('cx', d => (x(filteredTerms[1]) - x(filteredTerms[0])) / 2 + x(d.year))
  .attr('cy', d => y(d.UMI))
  .attr('r', 4)
  return svg
}

export default drawUMITrendLine
