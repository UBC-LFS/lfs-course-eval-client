/* global $ */

const drawOverallInstructor = (tableData) => {
  const data = tableData.map(x => (
    [x.instructorName, x.dept, x.UMI6.average, x.UMI6.percentFavourable, x.numCoursesTaught, x.numStudentsTaught]
  ))

  $('#OverallInstructors').DataTable({
    'aaData': data,
    'aoColumns':
    [
      { 'sTitle': 'Instructor Name' },
      { 'sTitle': 'Departments' },
      { 'sTitle': 'Average' },
      { 'sTitle': 'Percent Favourable' },
      { 'sTitle': 'Number of Courses Taught' },
      { 'sTitle': 'Number of Students Taught' }
    ],
    'order': [[0, 'asc']]
  })
}

export default drawOverallInstructor
