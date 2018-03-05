/* global $ */
import * as util from '../../../util/util.js'

const filterCPData = (coursePerformanceData, PUID) => {
  const tableData = coursePerformanceData.find(x => x.PUID === PUID).Courses
  return tableData.map(x => {
    return [x.course + ' ' + x.section,
    x.enrolment,
    util.roundToTwoDecimal(x.UMI1.average),
    util.roundToTwoDecimal(x.UMI2.average),
    util.roundToTwoDecimal(x.UMI3.average),
    util.roundToTwoDecimal(x.UMI4.average),
    util.roundToTwoDecimal(x.UMI5.average),
    util.roundToTwoDecimal(x.UMI6.average),
    util.roundToTwoDecimal(x.responseRate * 100) + '%',
    x.year,
    util.roundToTwoDecimal(x.deptAverage.UMI1),
    util.roundToTwoDecimal(x.deptAverage.UMI2),
    util.roundToTwoDecimal(x.deptAverage.UMI3),
    util.roundToTwoDecimal(x.deptAverage.UMI4),
    util.roundToTwoDecimal(x.deptAverage.UMI5),
    util.roundToTwoDecimal(x.deptAverage.UMI6),
    util.roundToTwoDecimal(x.facultyAverage.UMI1),
    util.roundToTwoDecimal(x.facultyAverage.UMI2),
    util.roundToTwoDecimal(x.facultyAverage.UMI3),
    util.roundToTwoDecimal(x.facultyAverage.UMI4),
    util.roundToTwoDecimal(x.facultyAverage.UMI5),
    util.roundToTwoDecimal(x.facultyAverage.UMI6)
    ]
  })
}

const renderUMIColumn = (row, rowNum, deptRowNum, facultyRowNum) => {
  return $('<div></div>').append(row[rowNum] + $('<div></div>', {
    'class': 'bar-chart-bar'
  }).append(function () {
    const bars = []
    bars.push($('<div></div>', {
      'class': 'bar '
    }).css({
      'width': (row[rowNum] / 5) * 100 + '%'
    }))
    bars.push($('<div></div>', { 'class': 'line' }).css({ 'left': (row[deptRowNum] / 5) * 100 + '%' }).css({ 'color': '#ccc' }).append(function () {
      return $('<span></span>', {
        'class': 'tooltiptext'
      }).append('Department Average: ' + row[deptRowNum]).prop('outerHTML')
    }))
    bars.push($('<div></div>', { 'class': 'line' }).css({ 'left': (row[facultyRowNum] / 5) * 100 + '%' }).css({ 'color': 'gold' }).append(function () {
      return $('<span></span>', {
        'class': 'tooltiptext'
      }).append('Faculty Average: ' + row[facultyRowNum]).prop('outerHTML')
    }))
    return bars
  }).prop('outerHTML')).prop('outerHTML')
}

const drawCoursePerformance = (coursePerformanceData, questionCode, PUID) => {
  const data = filterCPData(coursePerformanceData, PUID)
  const table = $('#CoursePerformance').DataTable({
    'aaData': data,
    'aoColumns':
      [
        { 'sTitle': '' },
        { 'sTitle': 'Enrolment' },
        {
          'sTitle': 'UMI1 Average',
          'render': function (data, type, row, meta) {
            return renderUMIColumn(row, 2, 10, 16)
          }
        },
        {
          'sTitle': 'UMI2 Average',
          'render': function (data, type, row, meta) {
            return renderUMIColumn(row, 3, 11, 17)
          }
        },
        {
          'sTitle': 'UMI3 Average',
          'render': function (data, type, row, meta) {
            return renderUMIColumn(row, 4, 12, 18)
          }
        },
        {
          'sTitle': 'UMI4 Average',
          'render': function (data, type, row, meta) {
            return renderUMIColumn(row, 5, 13, 19)

          }
        },
        {
          'sTitle': 'UMI5 Average',
          'render': function (data, type, row, meta) {
            return renderUMIColumn(row, 6, 14, 20)
          }
        },
        {
          'sTitle': 'UMI6 Average',
          'render': function (data, type, row, meta) {
            return renderUMIColumn(row, 7, 15, 21)
          }
        },
        { 'sTitle': 'Response Rate' },
        { 'sTitle': 'Year' },
        { 'sTitle': 'Department Average1' },
        { 'sTitle': 'Department Average2' },
        { 'sTitle': 'Department Average3' },
        { 'sTitle': 'Department Average4' },
        { 'sTitle': 'Department Average5' },
        { 'sTitle': 'Department Average6' },
        { 'sTitle': 'Faculty Average1' },
        { 'sTitle': 'Faculty Average2' },
        { 'sTitle': 'Faculty Average3' },
        { 'sTitle': 'Faculty Average4' },
        { 'sTitle': 'Faculty Average5' },
        { 'sTitle': 'Faculty Average6' }
      ],
    'aoColumnDefs': [
      { 'bSortable': false, 'aTargets': [0] },
      {
        'targets': [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'visible': false,
        'searchable': false
      },
      { 'className': 'umiAvg1', 'targets': [2] },
      { 'className': 'umiAvg2', 'targets': [3] },
      { 'className': 'umiAvg3', 'targets': [4] },
      { 'className': 'umiAvg4', 'targets': [5] },
      { 'className': 'umiAvg5', 'targets': [6] },
      { 'className': 'umiAvg6', 'targets': [7] }
    ],
    'orderFixed': [9, 'desc'],
    'rowGroup': {
      'dataSrc': 9
    }
  })
  for (let i = 0; i < questionCode.length; i++) {
    const column = table.column(parseInt(questionCode[i].slice(-1)) + 1)
    column.visible(true)
  }
}

const redrawCoursePerformance = (coursePerformanceData, questionCode, PUID) => {
  const data = filterCPData(coursePerformanceData, PUID)
  const CPTable = $('#CoursePerformance').dataTable()
  CPTable.fnClearTable()
  CPTable.fnAddData(data)
  const table = $('#CoursePerformance').DataTable()
  for (let j = 2; j <= 7; j++) {
    table.column(j).visible(false)
  }
  for (let i = 0; i < questionCode.length; i++) {
    const column = table.column(parseInt(questionCode[i].slice(-1)) + 1)
    column.visible(true)
  }
}

export { drawCoursePerformance, redrawCoursePerformance }
