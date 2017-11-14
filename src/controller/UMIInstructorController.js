import { loadUMIInstructorData } from '../service/dataService'
import drawUMIInstructor from '../viz/drawUMIInstructorTable'

const initUMIInstructor = () => loadUMIInstructorData().then(data => {
  console.log('UMIInstructor data:', data)
  drawUMIInstructor(data)
})

export default initUMIInstructor
