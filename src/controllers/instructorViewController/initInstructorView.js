import initInstructorOverview from './Dashboard/overviewInstructorController'
import initCoursePerformance from './CoursePerformance/coursePerformanceController'
import initUMIInstructor from './UMIInstructor/UMIInstructorController'

const initInstructorView = () => {
  initInstructorOverview()
  initCoursePerformance()
  initUMIInstructor()
}

export default initInstructorView
