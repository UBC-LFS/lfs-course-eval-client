/* global $ */

import * as courseData from '../data/mockCoursePerformanceData'
import * as d3 from 'd3'

const drawCoursePerformance = (tableData = courseData.courses, questionCode) => {
  const data = []
  tableData.map(x => data.push(
        [x.course + ' ' + x.section, x.classSize, x[questionCode].average, x.percentResponses * 100 + '%', x.year]
    ))
  $('#CoursePerformance').DataTable({
    'aaData': data,
    'aoColumns':
    [
            { 'sTitle': '' },
            { 'sTitle': 'Class Size' },
            { 'sTitle': 'UMI Average' },
            { 'sTitle': 'Response Rate' },
            { 'sTitle': 'Year' }
    ],
    'aoColumnDefs': [
            { 'bSortable': false, 'aTargets': [0] },
      {
        'targets': [4],
        'visible': false,
        'searchable': false
      },
      {'createdCell': function (td, cellData, rowData, row, col) {
        if (cellData < 1) {
          $(td).css('color', 'red')
        }
      }}
    ],
    'orderFixed': [4, 'asc'],
    'rowGroup': {
      'dataSrc': 4
    }
  })
    // var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];

    // var svg = d3.select("body").append("svg")
    //           .attr("height","100%")
    //           .attr("width","100%");

    // svg.selectAll("rect")
    //     .data(dataArray)
    //     .enter().append("rect")
    //           .attr("height", "30"})
    //           .attr("width",function(d, i) {return (d * 10))
    //           .attr("x", function(d, i) {return (i * 60) + 25})
    //           .attr("y", function(d, i) {return 400 - (d * 10)});
}

export default drawCoursePerformance
