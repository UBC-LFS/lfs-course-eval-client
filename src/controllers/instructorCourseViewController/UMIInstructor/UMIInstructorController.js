/* global $ */
import { loadUMIInstructorData } from '../../../service/courseDataService'
import { drawUMIInstructor, redrawUMIInstructor } from './drawUMIInstructorTable'
import { stripMiddleName, compareLastNameThenFirstName } from '../../../util/util'

const attachOptions = arr => arr.map(x =>
  '<option value=' + x.PUID + '>' + x.name + '</option>').join(' ')

const initFilterHandler = data => {
  const instructorSelect = document.getElementById('umiInstructorFilter')
  const instructors = data.map(x => ({
    'name': stripMiddleName(x.Courses[0].instructorName),
    'PUID': x.PUID
  })).sort(compareLastNameThenFirstName)
  instructorSelect.innerHTML = attachOptions(instructors)
  $('#umiInstructorFilter.selectpicker').selectpicker('refresh')
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
