import initUMIDispersion from './UMIVsDispersion/UMIVsDispersionController'
import initFacultyDeptLineChart from './FacultyDeptLineChart/facultyDeptLineChartController'
import initEnrolmentLineChart from './EnrolmentChart/enrolmentLineChartController'
import initHighLevelOverview from './Dashboard/overviewController'
import initOverallInstructor from './OverallInstructor/overallInstructorDataController'

const initOverview = () => {
  initUMIDispersion()

  initFacultyDeptLineChart()

  initEnrolmentLineChart()

  initHighLevelOverview()

  initOverallInstructor()
}

export default initOverview
