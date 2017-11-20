/* global $ */
import { loadEnrolmentTrend } from '../service/dataService'
import drawEnrolmentTrendLine from '../viz/drawEnrolmentTrendLine'
import { compareCourse } from '../util/util'
import R from 'ramda'

const attachGraph = (data, course, term) => {
  const svg = document.getElementById('enrolmentTrendGraphSVG')
  if (svg) svg.parentElement.removeChild(svg)

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
  const courseTerms = ['all'].concat(getUniqCourseTerms(data, courseSelect.value))
  termSelect.innerHTML = attachOptions(courseTerms)
  $('#enrolmentTrendCourse.selectpicker').selectpicker('refresh')
  $('#enrolmentTrendTerm.selectpicker').selectpicker('refresh')

  courseSelect.addEventListener('change', function () {
    const courseTerms = ['all'].concat(getUniqCourseTerms(data, courseSelect.value))
    termSelect.innerHTML = attachOptions(courseTerms)
    $('#enrolmentTrendTerm.selectpicker').selectpicker('refresh')

    attachGraph(data, courseSelect.value, termSelect.value)
  })

  termSelect.addEventListener('change', function () {
    attachGraph(data, courseSelect.value, termSelect.value)
  })
}

const initEnrolmentTrend = () => loadEnrolmentTrend().then(data => {
  const courseSelect = document.getElementById('enrolmentTrendCourse')
  const termSelect = document.getElementById('enrolmentTrendTerm')
  initFilterHandler(data)
  console.log('enrolmentTrend data:', data)
  attachGraph(data, courseSelect.value, termSelect.value)
})

export default initEnrolmentTrend
