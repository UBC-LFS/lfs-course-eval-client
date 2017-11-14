import { loadEnrolmentTrend } from '../service/dataService'
import drawEnrolmentTrendLine from '../viz/drawEnrolmentTrendLine'

const initEnrolmentTrend = () => loadEnrolmentTrend().then(data => {
  console.log('enrolmentTrend data:', data)
  const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
  enrolmentTrendLine.appendChild(drawEnrolmentTrendLine().node())
})

export default initEnrolmentTrend
