/* global $ */
import R from 'ramda'

const drawUMIInstructor = (UMIInstructorData, PUID = 'X53VU8MB9D08') => {
  const tableData = R.find(x => x.hasOwnProperty(PUID), UMIInstructorData)[PUID]
  const data = tableData.map(x => (
    [x.course + ' ' + x.section, x.UMI1.average, x.UMI2.average, x.UMI3.average, x.UMI4.average, x.UMI5.average, x.UMI6.average, x.year]
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
