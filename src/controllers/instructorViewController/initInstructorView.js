import initInstructorOverview from './Dashboard/overviewInstructorController'
import initCoursePerformance from './CoursePerformance/coursePerformanceController'
import initInstructorRanking from './InstructorRanking/instructorRankingController'


const initInstructorView = () => {
  initInstructorOverview()
  initCoursePerformance()
  //initInstructorRanking()
}

export default initInstructorView
