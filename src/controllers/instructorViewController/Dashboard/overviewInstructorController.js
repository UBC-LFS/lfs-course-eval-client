/* global $ */

import { loadOptions } from '../../../service/overviewDataService'
import { loadInstructorOverview } from '../../../service/instructorDataService'
const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const initHighLevelInstructorOverview = (instructor) => {
  loadInstructorOverview(instructor).then(data => {
    const umi = document.getElementById('instructor-umi')
    const percentFavourable = document.getElementById('instructor-pf')
    const coursesTaught = document.getElementById('instructor-courses-count')
    const studentsTaught = document.getElementById('instructor-students-count')
    const title = document.getElementById('instructor-title')
    title.innerHTML = 'Overview of ' + instructor
    const elements = [umi, percentFavourable, coursesTaught, studentsTaught]
    const currentYear = [
      data[0].UMI6.average,
      data[0].UMI6.percentFavourable * 100 + '%',
      data[0].numCoursesTaught,
      data[0].numStudentsTaught
    ]
    elements.map((element, i) => (element.innerHTML = currentYear[i]))
  })
}

const initInstructorSelector = () => {
  const instructorSelect = document.getElementById('instructor-select')
  loadOptions().then(data => {
    const instructors = data[0].instructors
    instructorSelect.innerHTML = attachOptions(instructors)
    instructorSelect.options[0].selected = true
    $('#instructor-select.selectpicker').selectpicker('refresh')
    const selectedInstructor = instructorSelect.value
    initHighLevelInstructorOverview(selectedInstructor)
  })

  instructorSelect.addEventListener('change', function (e) {
    const selectedInstructor = instructorSelect.value
    initHighLevelInstructorOverview(selectedInstructor)
  })
}

const initInstructorOverview = () => {
  initInstructorSelector()
}

export default initInstructorOverview
