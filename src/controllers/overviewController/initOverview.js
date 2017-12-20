import initUMIDispersion from './UMIVsDispersion/UMIVsDispersionController'
import initFacultyDeptLineChart from './FacultyDeptLineChart/facultyDeptLineChartController'
import initEnrolmentLineChart from './EnrolmentChart/enrolmentLineChartController'
import initHighLevelOverview from './Dashboard/overviewController'

const initOverview = () => {
  initUMIDispersion()

  initFacultyDeptLineChart()

  initEnrolmentLineChart()

  initHighLevelOverview()
}

export default initOverview
