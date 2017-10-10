/* global $ */

import * as courseData from '../data/mockCoursePerformanceData'
import * as d3 from 'd3'

const drawCoursePerformance = (tableData = courseData.courses, questionCode) => {
  const data = []
  tableData.map(x => data.push(
    [x.course + ' ' + x.section, x.classSize, x[questionCode].average, x.percentResponses * 100 + '%', x.year, courseData.courseAvg[x.course], courseData.deptAvg[x.dept]]
  ))
  $('#CoursePerformance').DataTable({
    'aaData': data,
    'aoColumns':
    [
      { 'sTitle': '' },
      { 'sTitle': 'Class Size' },
      {
        'sTitle': 'UMI Average',
        'render': function (data, type, row, meta) {
          return $('<div></div>').append(row[2] + $('<div></div>', {
            'class': 'bar-chart-bar'
          }).append(function () {
            const bars = []
            bars.push($('<div></div>', {
              'class': 'bar '
            }).css({
              'width': (row[2] / 5) * 100 + '%'
            }))
            bars.push($('<div></div>', { 'class': 'line' }).css({ 'left': (row[5] / 5) * 100 + '%' }))
            return bars
          }).prop('outerHTML')).prop('outerHTML')
        }
      },
      { 'sTitle': 'Response Rate' },
      { 'sTitle': 'Year' },
      { 'sTitle': 'Course Average' },
      { 'sTitle': 'Department Average' }
    ],
    'aoColumnDefs': [
      { 'bSortable': false, 'aTargets': [0] },
      {
        'targets': [4, 5, 6],
        'visible': false,
        'searchable': false
      },
      { 'className': 'umiAvg', 'targets': [2] }
    ],
    'orderFixed': [4, 'asc'],
    'rowGroup': {
      'dataSrc': 4
    }
  })
  // var x = d3.scaleLinear()
  // .domain([0, 4.4])
  // .range(['0%', '100%'])
  // const tbody = d3.select('#CoursePerformance').select('tbody')
  // const tr = tbody.selectAll('tr')
  // const chart = tr.append('td').attr('class', 'chart').attr('width', '5px')
  // const umiAvgColumn = tbody.selectAll('.umiAvg')
  // Create the div structure of the chart
  // chart.append('div').attr('class', 'container').append('div').attr('class', 'negative');
  // chart.append('div').attr('class', 'container').append('div').attr('class', 'positive');

  // // Creates the negative div bar
  // tr.select('div.negative')
  //   .style('width', '0%')
  //   .transition()
  //   .duration(500)
  //     .style('width', '0%')

  // // Creates the positive div bar
  // tr.select('div.positive')
  //   .style('width', '0%')
  //   .transition()
  //   .duration(500)
  //     .style('width', '0%')
  // d3.select('#CoursePerformance').select('tbody').selectAll('.umiAvg').data(umiArray)
  // .enter().append('rect')
  //   .style('width', function (d) { return d * 10 + 'px' })
  //   .text(function (d) { return d })
  // var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];

  // var svg = d3.select('body').append('svg')
  //           .attr('height','100%')
  //           .attr('width','100%');

  // svg.selectAll('rect')
  //     .data(dataArray)
  //     .enter().append('rect')
  //           .attr('height', '30'})
  //           .attr('width',function(d, i) {return (d * 10))
  //           .attr('x', function(d, i) {return (i * 60) + 25})
  //           .attr('y', function(d, i) {return 400 - (d * 10)});
}

export default drawCoursePerformance
