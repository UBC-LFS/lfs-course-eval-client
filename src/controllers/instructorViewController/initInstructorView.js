import initInstructorOverview from './Dashboard/overviewInstructorController'
import initCoursePerformance from './CoursePerformance/coursePerformanceController'
import initInstructorRanking from './InstructorRanking/instructorRankingController'
import initUMI6Scatterplot from './UMI6Scatterplot/drawUMI6Scatterplot'

const initInstructorView = () => {
  initInstructorOverview()
  initCoursePerformance()
  initInstructorRanking()
  initUMI6Scatterplot()
}

export default initInstructorView
