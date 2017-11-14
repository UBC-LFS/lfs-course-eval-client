import { margin } from '../constants/constants'
import { sortByTerm } from '../util/util'
import * as d3 from 'd3'
import R from 'ramda'

const filterByTerm = (term) => R.filter(x => x.year.slice(-2) === term)

const drawEnrolmentTrendLine = (data, course = 'FNH 200', term = 'all') => {
  const courseData = data.find(x => x.Course === course)
  let terms = sortByTerm(courseData.Terms)

  if (term !== 'all') {
    terms = filterByTerm(term)(terms).slice(-15)
  } else {
    terms = terms.slice(-15)
  }

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
    .x(d => (x(terms[1].year) - x(terms[0].year)) / 2 + x(d.year))
    .y(d => y(d.enrolment))

  x.domain(terms.map(d => d.year))
  y.domain([0, d3.max(terms, d => d.enrolment)])

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
    .datum(terms)
    .attr('class', 'line')
    .attr('d', line)

  g.selectAll('circle')
    .data(terms)
  .enter().append('circle')
    .attr('class', 'circle')
    .attr('cx', d => (x(terms[1].year) - x(terms[0].year)) / 2 + x(d.year))
    .attr('cy', d => y(d.enrolment))
    .attr('r', 4)
  return svg
}

export default drawEnrolmentTrendLine
