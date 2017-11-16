import { loadCoursePerformance } from '../service/dataService'
import { drawCoursePerformance, redrawCoursePerformance } from '../viz/drawCoursePerformanceTable'
import { stripMiddleName, compareLastNameFirstName } from '../util/util'

const attachOptions = (arr) => arr.map(x =>
  '<option value=' + x.PUID + '>' + x.name + '</option>').join(' ')

const initFilterHandler = (data) => {
  const instructorSelect = document.getElementById('cpInstructorFilter')
  const questionSelect = document.getElementById('cpQuestionFilter')
  const instructors = data.map(x => ({
    'name': stripMiddleName(x.Courses[0].instructorName),
    'PUID': x.PUID
  })).sort(compareLastNameFirstName)
  instructorSelect.innerHTML = attachOptions(instructors)
  $('.selectpicker').selectpicker('refresh')
  instructorSelect.addEventListener('change', function () {
    redrawCoursePerformance(data, questionSelect.value, instructorSelect.value)
  })
  questionSelect.addEventListener('change', function (){
    redrawCoursePerformance(data, questionSelect.value, instructorSelect.value)
  })
}

const initCoursePerformance = () => loadCoursePerformance().then(data => {
  const instructorSelect = document.getElementById('cpInstructorFilter')
  const questionSelect = document.getElementById('cpQuestionFilter')
  console.log('coursePerformanceData data:', data)
  initFilterHandler(data)  
  drawCoursePerformance(data, questionSelect.value, instructorSelect.value)
})

export default initCoursePerformance
