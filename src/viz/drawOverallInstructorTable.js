/* global $ */
import { stripMiddleName } from '../util/util'

const drawOverallInstructor = (tableData) => {
  const data = tableData.map(x => (
    [stripMiddleName(x.instructorName),
      x.dept,
      x.UMI1.average,
      x.UMI2.average,
      x.UMI3.average,
      x.UMI4.average,
      x.UMI5.average,
      x.UMI6.average,
      Math.round(x.UMI6.percentFavourable * 100) + '%',
      x.numCoursesTaught,
      x.numStudentsTaught]
  ))

  $('#OverallInstructors').DataTable({
    'aaData': data,
    'aoColumns':
    [
      { 'sTitle': 'Instructor Name' },
      { 'sTitle': 'Departments' },
      { 'sTitle': 'UMI1 Average' },
      { 'sTitle': 'UMI2 Average' },
      { 'sTitle': 'UMI3 Average' },
      { 'sTitle': 'UMI4 Average' },
      { 'sTitle': 'UMI5 Average' },
      { 'sTitle': 'UMI6 Average' },
      { 'sTitle': 'Percent Favourable' },
      { 'sTitle': 'Number of Courses Taught' },
      { 'sTitle': 'Number of Students Taught' }
    ],
    'order': [[0, 'asc']]
  })
}

export default drawOverallInstructor
