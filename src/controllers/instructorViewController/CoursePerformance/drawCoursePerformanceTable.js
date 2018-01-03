/* global $ */
import * as util from '../../../util/util.js'

const filterCPData = (coursePerformanceData, questionCode, PUID) => {
  const tableData = coursePerformanceData.find(x => x.PUID === PUID).Courses
  return tableData.map(x => {
    return [ x.course + ' ' + x.section,
      x.enrolment,
      util.roundToTwoDecimal(x[questionCode].average),
      util.roundToTwoDecimal(x.responseRate * 100) + '%',
      x.year,
      util.roundToTwoDecimal(x.deptAverage[questionCode])
      // util.roundToTwoDecimal(x.facultyAverage[questionCode])
    ]
  })
}
const drawCoursePerformance = (coursePerformanceData, questionCode, PUID) => {
  const data = filterCPData(coursePerformanceData, questionCode, PUID)
  $('#CoursePerformance').DataTable({
    'aaData': data,
    'aoColumns':
    [
      { 'sTitle': '' },
      { 'sTitle': 'Enrolment' },
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
            bars.push($('<div></div>', { 'class': 'line' }).css({ 'left': (row[5] / 5) * 100 + '%' }).css({'color': '#ccc'}).append(function () {
              return $('<span></span>', {
                'class': 'tooltiptext'
              }).append('Department Average: ' + row[5]).prop('outerHTML')
            }))
            bars.push($('<div></div>', { 'class': 'line' }).css({ 'left': (row[6] / 5) * 100 + '%' }).css({'color': 'gold'}).append(function () {
              return $('<span></span>', {
                'class': 'tooltiptext'
              }).append('Faculty Average: ' + row[6]).prop('outerHTML')
            }))
            return bars
          }).prop('outerHTML')).prop('outerHTML')
        }
      },
      { 'sTitle': 'Response Rate' },
      { 'sTitle': 'Year' },
      { 'sTitle': 'Department Average' },
      { 'sTitle': 'Faculty Average' }
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
}

const redrawCoursePerformance = (coursePerformanceData, questionCode, PUID) => {
  const data = filterCPData(coursePerformanceData, questionCode, PUID)
  const CPTable = $('#CoursePerformance').dataTable()
  CPTable.fnClearTable()
  CPTable.fnAddData(data)
}

export { drawCoursePerformance, redrawCoursePerformance }
