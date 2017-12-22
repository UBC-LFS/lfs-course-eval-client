/* global $, Chart  */
import { loadEnrolmentTrend } from '../../../service/overviewDataService'
import createLineChart from './drawEnrolmentLineChart'
import { compareCourse } from '../../../util/util'
import R from 'ramda'

var enrolmentChart = null

const getUniqCourseTerms = (data, value) =>
  R.uniq((data.find(x => x.Course === value)).Terms.map(x => x.year.slice(-2)))

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#enrolmentCourse.selectpicker').selectpicker('refresh')
  $('#enrolmentTerm.selectpicker').selectpicker('refresh')
}

const destroyChart = () => {
  if (enrolmentChart !== null) {
    enrolmentChart.destroy()
  }
}

const initFilterHandler = data => {
  const courseSelect = document.getElementById('enrolmentCourse')
  const termSelect = document.getElementById('enrolmentTerm')
  const grapharea = document.getElementById('enrolmentLineChartCanvas').getContext('2d')
  const courses = data.map(x => x.Course).sort(compareCourse)

  courseSelect.innerHTML = attachOptions(courses)
  const courseTerms = ['all'].concat(getUniqCourseTerms(data, courseSelect.value))
  termSelect.innerHTML = attachOptions(courseTerms)
  courseSelect.addEventListener('change', function () {
    const courseTerms = ['all'].concat(getUniqCourseTerms(data, courseSelect.value))
    termSelect.innerHTML = attachOptions(courseTerms)
    refreshPicker()
    destroyChart()
    enrolmentChart = createLineChart(data, courseSelect.value, termSelect.value)
  })

  termSelect.addEventListener('change', function () {
    destroyChart()
    enrolmentChart = createLineChart(data, courseSelect.value, termSelect.value)
  })
  refreshPicker()
}

const initEnrolmentLineChart = () => loadEnrolmentTrend().then(data => {
  const courseSelect = document.getElementById('enrolmentCourse')
  const termSelect = document.getElementById('enrolmentTerm')
  initFilterHandler(data)
  console.log('enrolmentLineChart data:', data)
  enrolmentChart = createLineChart(data, courseSelect.value, termSelect.value)
})

export default initEnrolmentLineChart
