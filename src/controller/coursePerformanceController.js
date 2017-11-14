import { loadCoursePerformance } from '../service/dataService'
import drawCoursePerformance from '../viz/drawCoursePerformanceTable'

const coursePerformance = () => loadCoursePerformance().then(data => {
  console.log('coursePerformanceData data:', data)
  drawCoursePerformance(data, 'UMI6')
})

export default coursePerformance
