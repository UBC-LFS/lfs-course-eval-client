/* global $ */

import { margin, height, percentFavourableColor6 } from '../constants/constants'
import drawToolTip from './drawToolTip'
import * as d3 from 'd3'

const drawUMIvsDispersion = (array, filter = { UMI: 6 }) => {
  const graphWidth = $('#UMIvsDispersionGraph').width()
  const svg = d3.select('#UMIvsDispersionGraph')
            .append('svg')
            .attr('style', 'display: block; margin: auto; margin-top: 30px;')
            .attr('width', '100%')
            .attr('height', height)
            .attr('viewBox', '0 0 ' + Math.min(graphWidth, height) + ' ' + 700)
            .attr('preserveAspectRatio', 'xMinYMin')

  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const x = d3.scaleLinear().rangeRound([0, graphWidth])
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
  const courseInfoTip = drawToolTip(filter, x)

  // removing below min
  array = array.filter(x => x.meetsMin)
  array = array.filter(x => x.year === 2016)

  umiDots.selectAll('dot')
    .data(array)
    .enter().append('circle')
    .attr('cx', (d) => x(Math.min(d['UMI' + filter.UMI].dispersionIndex, 0.8)))
    .attr('cy', (d) => y(Math.max(d['UMI' + filter.UMI].average, 2)))
    .attr('r', (d) => Math.pow(Math.log(d.enrolment), 1.7))
    .style('fill', (d) => {
      const percentFavourable = d['UMI' + filter.UMI].percentFavourable
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
    .attr('class', (d) => d.PUID)
    .on('mouseover', courseInfoTip.show)
    .on('mouseout', courseInfoTip.hide)
    .on('click', (d) => {
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

  const animate = () => {
    const pulseList = document.getElementsByClassName('pulse')
    Array.prototype.map.call(pulseList, (x) => (x.innerHTML = '<animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="0%" to="10%"/><animate attributeType="CSS" attributeName="stroke-width" begin="0s"  dur="1.5s" repeatCount="indefinite" from="3%" to="0%" /><animate attributeType="CSS" attributeName="opacity" begin="0s"  dur="1.5s" repeatCount="indefinite" from="1" to="0"/>'))
  }

  svg.call(courseInfoTip)
}

export default drawUMIvsDispersion
