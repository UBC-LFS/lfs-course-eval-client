/* global $ */
import { loadEnrolmentTrend } from '../service/dataService'
import createLineChart from '../viz/drawEnrolmentLineChart'
import { compareCourse } from '../util/util'
import R from 'ramda'

const getUniqCourseTerms = (data, value) =>
  R.uniq((data.find(x => x.Course === value)).Terms.map(x => x.year.slice(-2)))

const attachOptions = (arr) => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#enrolmentCourse.selectpicker').selectpicker('refresh')
  $('#enrolmentTerm.selectpicker').selectpicker('refresh')
}

const initFilterHandler = (data) => {
  const courseSelect = document.getElementById('enrolmentCourse')
  const termSelect = document.getElementById('enrolmentTerm')
  const courses = data.map(x => x.Course).sort(compareCourse)

  courseSelect.innerHTML = attachOptions(courses)
  const courseTerms = ['all'].concat(getUniqCourseTerms(data, courseSelect.value))
  termSelect.innerHTML = attachOptions(courseTerms)
  courseSelect.addEventListener('change', function () {
    const courseTerms = ['all'].concat(getUniqCourseTerms(data, courseSelect.value))
    termSelect.innerHTML = attachOptions(courseTerms)
    refreshPicker()
    createLineChart(data, courseSelect.value, termSelect.value)
  })

  termSelect.addEventListener('change', function () {
    createLineChart(data, courseSelect.value, termSelect.value)
  })
  refreshPicker()
}

const initEnrolmentLineChart = () => loadEnrolmentTrend().then(data => {
  const courseSelect = document.getElementById('enrolmentCourse')
  const termSelect = document.getElementById('enrolmentTerm')
  initFilterHandler(data)
  console.log('enrolmentLineChart data:', data)
  createLineChart(data, courseSelect.value, termSelect.value)
})

export default initEnrolmentLineChart
