import { loadUMIInstructorData } from '../service/dataService'
import { drawUMIInstructor, redrawUMIInstructor } from '../viz/drawUMIInstructorTable'
import { stripMiddleName, compareLastNameFirstName } from '../util/util'

const attachOptions = (arr) => arr.map(x =>
  '<option value=' + x.PUID + '>' + x.name + '</option>').join(' ')

const initFilterHandler = (data) => {
  const instructorSelect = document.getElementById('umiInstructorFilter')
  const instructors = data.map(x => ({
    'name': stripMiddleName(x.Courses[0].instructorName),
    'PUID': x.PUID
  })).sort(compareLastNameFirstName)
  instructorSelect.innerHTML = attachOptions(instructors)
  $('.selectpicker').selectpicker('refresh')  
  instructorSelect.addEventListener('change', function () {
    redrawUMIInstructor(data, instructorSelect.value)
  })
}

const initUMIInstructor = () => loadUMIInstructorData().then(data => {
  const instructorSelect = document.getElementById('umiInstructorFilter')  
  initFilterHandler(data)
  console.log('UMIInstructer data:', data)
  drawUMIInstructor(data, instructorSelect.value)
})

export default initUMIInstructor
