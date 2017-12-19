import initOverallInstructor from './OverallInstructor/overallInstructorDataController'
import initUMIDispersion from './UMIVsDispersion/UMIVsDispersionController'
import initCoursePerformance from './CoursePerformance/coursePerformanceController'
import initFacultyDeptLineChart from './FacultyDeptLineChart/facultyDeptLineChartController'
import initUMIInstructor from './UMIInstructor/UMIInstructorController'
import initEnrolmentLineChart from './EnrolmentChart/enrolmentLineChartController'
import initHighLevelOverview from './Dashboard/overviewController'

const initOverview = () => {
  initOverallInstructor()

  initUMIDispersion()

  // commented out for now because of annoying error message
  // initCoursePerformance()

  initFacultyDeptLineChart()

  initUMIInstructor()

  initEnrolmentLineChart()

  initHighLevelOverview()
}

export default initOverview
