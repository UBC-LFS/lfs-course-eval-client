import { loadEnrolmentTrend } from '../service/dataService'
import drawEnrolmentTrendLine from '../viz/drawEnrolmentTrendLine'
import R from 'ramda'

const attachGraph = (data, course, term) => {
  const graph = document.getElementById('enrolmentTrendGraph')
  if (graph) graph.parentElement.removeChild(graph)
  const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
  enrolmentTrendLine.appendChild(drawEnrolmentTrendLine(data, course, term).node())
}

const initFilterHandler = (data) => {
  const courses = data.map(x => x.Course).sort((a, b) => (a - b))

  const courseSelect = document.getElementById('enrolmentTrendCourse')
  const termSelect = document.getElementById('enrolmentTrendTerm')

  courseSelect.innerHTML = courses.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

  const courseTerms = R.uniq((data.find(x => x.Course === courseSelect.value)).Terms.map(x => x.year.slice(-2)))
  courseTerms.push('all')
  termSelect.innerHTML = courseTerms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

  courseSelect.addEventListener('change', function () {

    const courseTerms = R.uniq((data.find(x => x.Course === courseSelect.value)).Terms.map(x => x.year.slice(-2)))
    courseTerms.push('all')
    termSelect.innerHTML = courseTerms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
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
