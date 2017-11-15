import { loadUMIInstructorData } from '../service/dataService'
import drawUMIInstructor from '../viz/drawUMIInstructorTable'


const initFilterHandler = (data) => {
  const instructors = data.map(x => x.Courses[0].instructorName).sort((a, b) => (a - b))

  const instructorSelect = document.getElementById('umiInstructorFilter')

  instructorSelect.innerHTML = instructors.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

  const courseTerms = R.uniq((data.find(x => x.Course === instructorSelect.value)).Terms.map(x => x.year.slice(-2)))
  courseTerms.push('all')
  termSelect.innerHTML = courseTerms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

  instructorSelect.addEventListener('change', function () {
    const graph = document.getElementById('enrolmentTrendGraph')
    graph.parentElement.removeChild(graph)
    const courseTerms = R.uniq((data.find(x => x.Course === instructorSelect.value)).Terms.map(x => x.year.slice(-2)))
    courseTerms.push('all')
    termSelect.innerHTML = courseTerms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    termSelect.value = 'all'
    const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
    enrolmentTrendLine.appendChild(drawEnrolmentTrendLine(data, instructorSelect.value, termSelect.value).node())
  })

  termSelect.addEventListener('change', function () {
    const graph = document.getElementById('enrolmentTrendGraph')
    graph.parentElement.removeChild(graph)
    const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
    enrolmentTrendLine.appendChild(drawEnrolmentTrendLine(data, instructorSelect.value, termSelect.value).node())
  })
}

const initUMIInstructor = () => loadUMIInstructorData().then(data => {
  console.log('UMIInstructor data:', data)
  drawUMIInstructor(data)
})

export default initUMIInstructor
