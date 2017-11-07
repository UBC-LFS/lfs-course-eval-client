/* global $ */
import { stripMiddleName } from '../util/util'

const drawOverallInstructor = (tableData) => {
  const data = tableData.map(x => (
    [stripMiddleName(x.instructorName), x.dept, x.UMI6.average, Math.round(x.UMI6.percentFavourable * 100) + '%', x.numCoursesTaught, x.numStudentsTaught]
  ))

  $('#OverallInstructors').DataTable({
    'aaData': data,
    'aoColumns':
    [
      { 'sTitle': 'Instructor Name' },
      { 'sTitle': 'Departments' },
      { 'sTitle': 'UMI6 Average' },
      { 'sTitle': 'Percent Favourable' },
      { 'sTitle': 'Number of Courses Taught' },
      { 'sTitle': 'Number of Students Taught' }
    ],
    'order': [[0, 'asc']]
  })
}

export default drawOverallInstructor
