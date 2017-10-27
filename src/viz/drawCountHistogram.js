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
  const width = 960 - margin.left - margin.right

  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleLinear().range([height, 0])

  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g')

  const arrayOfCounts = convertCountIntoArray(count)

  const bins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(5))(count)

  y.domain([0, d3.max(bins, (d) => d.length)])

  const bar = g.selectAll('.bar')
    .data(bins)
    .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', function (d) { return 'translate(' + x(d.x0) + ',' + 0 + ')' })

  bar.append('rect')
    .attr('x', 1)
    .attr('width', x(bins[0].x1) - x(bins[0].x0) - 1)
    .attr('height', function (d) { return y(d.length) })

  // svg.selectAll('rect')
  //   .data(bins)
  //   .enter().append('rect')
  //   .attr('class', 'bar')
  //   .attr('x', 1)
  //   .attr('transform', (d) => 'translate(' + x(d.x0) + ',' + y(d.length) + ')')
  //   .attr('width', (d) => x(d.x1) - x(d.x0) - 1)
  //   .attr('height', (d) => height - y(d.length))

  console.log(arrayOfCounts, bins)
}

export default drawCountHistogram
