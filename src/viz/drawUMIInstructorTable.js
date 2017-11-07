/* global $ */
import R from 'ramda'
import * as util from '../util/util.js'

const drawUMIInstructor = (UMIInstructorData, PUID = 'X53VU8MB9D08') => {
  const tableData = R.find(x => x.PUID === PUID, UMIInstructorData).Courses
  const data = tableData.map(x => 
    (
    [x.course + ' ' + x.section, util.roundToTwoDecimal(x.UMI1.average), util.roundToTwoDecimal(x.UMI2.average), util.roundToTwoDecimal(x.UMI3.average), util.roundToTwoDecimal(x.UMI4.average), util.roundToTwoDecimal(x.UMI5.average), util.roundToTwoDecimal(x.UMI6.average), x.year]
  ))
  $('#UMIInstructors').DataTable({
    'aaData': data,
    'aoColumns':
    [
      { 'sTitle': '' },
      { 'sTitle': 'UMI1' },
      { 'sTitle': 'UMI2' },
      { 'sTitle': 'UMI3' },
      { 'sTitle': 'UMI4' },
      { 'sTitle': 'UMI5' },
      { 'sTitle': 'UMI6' },
      { 'sTitle': 'Year' }
    ],
    'aoColumnDefs': [
      { 'bSortable': false, 'aTargets': [0] },
      {
        'targets': [7],
        'visible': false,
        'searchable': false
      }
    ],
    'orderFixed': [7, 'asc'],
    'rowGroup': {
      'dataSrc': 7
    }
  })
}

export default drawUMIInstructor
