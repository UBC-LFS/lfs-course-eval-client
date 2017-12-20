import { loadOverallInstructorData } from '../../../service/courseDataService'
import drawOverallInstructor from './drawOverallInstructorTable'

const initOverallInstructor = () => loadOverallInstructorData().then(data => {
  console.log('overallInstructor data:', data)
  drawOverallInstructor(data)
})

export default initOverallInstructor
