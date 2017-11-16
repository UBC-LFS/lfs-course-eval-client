import { loadEnrolmentTrend } from '../service/dataService'
import drawEnrolmentTrendLine from '../viz/drawEnrolmentTrendLine'
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
  const courses = data.map(x => x.Course).sort((a, b) => (a - b))
  courseSelect.innerHTML = attachOptions(courses)

  const courseTerms = getUniqCourseTerms(data, courseSelect.value)
  courseTerms.push('all')
  termSelect.innerHTML = attachOptions(courseTerms)

  courseSelect.addEventListener('change', function () {
    const courseTerms = getUniqCourseTerms(data, courseSelect.value)
    courseTerms.push('all')
    termSelect.innerHTML = attachOptions(courseTerms)
    termSelect.value = 'all'
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
