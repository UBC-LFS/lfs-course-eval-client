import { margin, percentFavourableColor6 } from '../constants/constants'
import drawToolTip from './drawToolTip'
import * as d3 from 'd3'
import R from 'ramda'

const animate = () => {
  const pulseList = document.getElementsByClassName('pulse')
  Array.prototype.map.call(pulseList, (x) => (x.innerHTML = '<animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="0%" to="10%"/><animate attributeType="CSS" attributeName="stroke-width" begin="0s"  dur="1.5s" repeatCount="indefinite" from="3%" to="0%" /><animate attributeType="CSS" attributeName="opacity" begin="0s"  dur="1.5s" repeatCount="indefinite" from="1" to="0"/>'))
}

const filterData = (data, { year, term, UMI, meetsMin }) => {
  return R.compose(
    R.filter(x => x.year === year),
    R.filter(x => {
      if (term === 'all') return true
      return x.term === term
    }),
    R.filter(x => x.meetsMin === meetsMin)
  )(data)
}

const drawUMIvsDispersion = (data, filter) => {
  const UMI = filter.UMI

  data = filterData(data, filter)

  const w = 1000
  const h = 600
  const width = w - margin.left - margin.right
  const height = h - margin.top - margin.bottom

  const svg = d3.select(document.createElement('div')).append('svg')
    .attr('style', 'display: block; margin: auto; margin-top: 30px;')
    .attr('id', 'UMIVsDispersionSVG')
    .attr('width', w)
    .attr('height', h)

  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleLinear().rangeRound([height, 0])

  x.domain([0, 0.8])
  y.domain([2, 5])

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(10))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.9em')
    .attr('text-anchor', 'end')
    .attr('fill', '#000')
    .text('Likert Scale')

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))

  const umiDots = g.append('g').attr('id', 'umiDots')

  // tooltip config
  const courseInfoTip = drawToolTip(UMI)

  umiDots.selectAll('dot')
    .data(data)
    .enter().append('circle')
    .attr('cx', d => x(Math.min(d['UMI' + UMI].dispersionIndex, 0.8)))
    .attr('cy', d => y(Math.max(d['UMI' + UMI].average, 2)))
    .attr('r', d => Math.pow(Math.log(d.enrolment), 1.7))
    .style('fill', d => {
      const percentFavourable = d['UMI' + UMI].percentFavourable
      if (percentFavourable >= 0.90) {
        return percentFavourableColor6.first
      } else if (percentFavourable >= 0.80 && percentFavourable < 0.90) {
        return percentFavourableColor6.second
      } else if (percentFavourable >= 0.70 && percentFavourable < 0.80) {
        return percentFavourableColor6.third
      } else if (percentFavourable >= 0.60 && percentFavourable < 0.70) {
        return percentFavourableColor6.fourth
      } else if (percentFavourable >= 0.50 && percentFavourable < 0.60) {
        return percentFavourableColor6.fifth
      } else return percentFavourableColor6.sixth
    })
    .attr('class', d => d.PUID)
    .on('mouseover', courseInfoTip.show)
    .on('mouseout', courseInfoTip.hide)
    .on('click', d => {
      const circles = document.getElementsByTagName('circle')
      Array.prototype.map.call(circles, (x) => {
        x.classList.remove('pulse')
        while (x.firstChild) {
          x.removeChild(x.firstChild)
        }
      })
      const selectedCircles = document.getElementsByClassName(d.PUID)
      Array.prototype.map.call(selectedCircles, (x) => x.classList.add('pulse'))
      animate()
    })

  svg.call(courseInfoTip)

  return svg
}

export default drawUMIvsDispersion
