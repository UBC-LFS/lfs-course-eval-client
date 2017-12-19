import initOverallInstructor from './overallInstructorDataController'
import initUMIDispersion from './UMIVsDispersion/UMIVsDispersionController'
import initCoursePerformance from './CoursePerformance/coursePerformanceController'
import initFacultyDept from './facultyDeptController'
import initEnrolmentTrend from './enrolmentTrendController'
import initUMIInstructor from './UMIInstructorController'
import initEnrolmentLineChart from './enrolmentLineChartController'
import initFacultyDeptLineChart from './facultyDeptLineChartController'
import initHighLevelOverview from './overviewController'

const initOverview = () => {
  initOverallInstructor()

  initUMIDispersion()

  // commented out for now because of annoying error message
  // initCoursePerformance()

  initFacultyDept()

  initUMIInstructor()

  initEnrolmentTrend()

  initEnrolmentLineChart()

  initFacultyDeptLineChart()

  initHighLevelOverview()
}

export default initOverview
