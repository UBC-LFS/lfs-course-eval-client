import { loadEnrolmentTrend } from '../service/dataService'
import drawEnrolmentTrendLine from '../viz/drawEnrolmentTrendLine'
import {compareCourse} from '../util/util'
import R from 'ramda'

const attachGraph = (data, course, term) => {
  const graph = document.getElementById('enrolmentTrendGraph')
  if (graph) graph.parentElement.removeChild(graph)
  const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
  enrolmentTrendLine.appendChild(drawEnrolmentTrendLine(data, course, term).node())
}

const getUniqCourseTerms = (data, value) =>
  R.uniq((data.find(x => x.Course === value)).Terms.map(x => x.year.slice(-2)))

const attachOptions = (arr) => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const initFilterHandler = (data) => {
  const courseSelect = document.getElementById('enrolmentTrendCourse')
  const termSelect = document.getElementById('enrolmentTrendTerm')
  const courses = data.map(x => x.Course).sort(compareCourse)
  courseSelect.innerHTML = attachOptions(courses)

  const courseTerms = getUniqCourseTerms(data, courseSelect.value)
  courseTerms.push('all')
  termSelect.innerHTML = attachOptions(courseTerms)
  $('#enrolmentTrendCourse.selectpicker').selectpicker('refresh')    
  $('#enrolmentTrendTerm.selectpicker').selectpicker('refresh')    
  courseSelect.addEventListener('change', function () {
    const courseTerms = getUniqCourseTerms(data, courseSelect.value)
    courseTerms.push('all')
    termSelect.innerHTML = attachOptions(courseTerms)
    $('#enrolmentTrendTerm.selectpicker').selectpicker('refresh')      
    $('#enrolmentTrendTerm.selectpicker').selectpicker('val','all')
    attachGraph(data, courseSelect.value, termSelect.value)
  })

  termSelect.addEventListener('change', function () {
    attachGraph(data, courseSelect.value, termSelect.value)
  })
}

const initEnrolmentTrend = () => loadEnrolmentTrend().then(data => {
  initFilterHandler(data)
  console.log('enrolmentTrend data:', data)
  const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
  enrolmentTrendLine.appendChild(drawEnrolmentTrendLine(data).node())
})

export default initEnrolmentTrend
