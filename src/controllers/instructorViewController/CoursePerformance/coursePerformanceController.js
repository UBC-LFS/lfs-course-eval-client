/* global $ */
import { loadCoursePerformance } from '../../../service/courseDataService'
import { drawCoursePerformance, redrawCoursePerformance } from './drawCoursePerformanceTable'
import { stripMiddleName, compareLastNameThenFirstName } from '../../../util/util'

const attachOptions = arr =>
  arr.map(x => '<option value=' + x.PUID + '>' + x.name + '</option>').join(' ')

const initFilterHandler = data => {
  const instructorSelect = document.getElementById('cpInstructorFilter')
  const questionSelect = document.getElementById('cpQuestionFilter')
  const elements = [instructorSelect, questionSelect]

  const instructors = data.map(x => ({
    'name': stripMiddleName(x.Courses[0].instructorName),
    'PUID': x.PUID
  })).sort(compareLastNameThenFirstName)

  instructorSelect.innerHTML = attachOptions(instructors)
  $('#cpInstructorFilter.selectpicker').selectpicker('refresh')

  elements.map(el => el.addEventListener('change', function () {
    redrawCoursePerformance(data, questionSelect.value, instructorSelect.value)
  }))
}

const initCoursePerformance = () => loadCoursePerformance().then(data => {
  const instructorSelect = document.getElementById('cpInstructorFilter')
  const questionSelect = document.getElementById('cpQuestionFilter')
  console.log('coursePerformanceData data:', data)
  initFilterHandler(data)
  drawCoursePerformance(data, questionSelect.value, instructorSelect.value)
})

export default initCoursePerformance
