import initOverallInstructor from './overallInstructorDataController'
import initUMIDispersion from './UMIVsDispersion/UMIVsDispersionController'
import initCoursePerformance from './CoursePerformance/coursePerformanceController'
import initFacultyDept from './facultyDeptController'
import initUMIInstructor from './UMIInstructorController'
import initEnrolmentLineChart from './EnrolmentChart/enrolmentLineChartController'
import initFacultyDeptLineChart from './facultyDeptLineChartController'
import initHighLevelOverview from './overviewController'

const initOverview = () => {
  initOverallInstructor()

  initUMIDispersion()

  // commented out for now because of annoying error message
  // initCoursePerformance()

  initFacultyDept()

  initUMIInstructor()

  initEnrolmentLineChart()

  initFacultyDeptLineChart()

  initHighLevelOverview()
}

export default initOverview
