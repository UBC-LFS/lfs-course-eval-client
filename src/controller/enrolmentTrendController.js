import { loadEnrolmentTrend } from '../service/dataService'
import drawEnrolmentTrendLine from '../viz/drawEnrolmentTrendLine'
import R from 'ramda'

const initFilterHandler = (data) => {
  const courses = data.map(x => x.Course).sort((a, b) => (a - b))

  const courseSelect = document.getElementById('enrolmentTrendCourse')
  const termSelect = document.getElementById('enrolmentTrendTerm')

  courseSelect.innerHTML = courses.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

  const courseTerms = R.uniq((data.find(x => x.Course === courseSelect.value)).Terms.map(x => x.year.slice(-2)))
  termSelect.innerHTML = courseTerms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

  courseSelect.addEventListener('change', function () {
    const courseTerms = R.uniq((data.find(x => x.Course === courseSelect.value)).Terms.map(x => x.year.slice(-2)))
    termSelect.innerHTML = courseTerms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
    enrolmentTrendLine.appendChild(drawEnrolmentTrendLine(data, courseSelect.value, termSelect.value).node())
  })

  termSelect.addEventListener('change', function () {
    const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
    enrolmentTrendLine.appendChild(drawEnrolmentTrendLine(data, courseSelect.value, termSelect.value).node())
  })
}

const initEnrolmentTrend = () => loadEnrolmentTrend().then(data => {
  initFilterHandler(data)
  console.log('enrolmentTrend data:', data)
  const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
  enrolmentTrendLine.appendChild(drawEnrolmentTrendLine(data).node())
})

export default initEnrolmentTrend
