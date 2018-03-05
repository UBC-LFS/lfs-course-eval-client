import initInstructorOverview from './Dashboard/overviewInstructorController'
import initCoursePerformance from './CoursePerformance/coursePerformanceController'

const initInstructorView = () => {
  initInstructorOverview()
  initCoursePerformance()
}

export default initInstructorView
