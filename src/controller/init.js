/* global $ */
import initOverallInstructor from './overallInstructorDataController'
import initUMIDispersion from './UMIDispersionController'
import initCoursePerformance from './coursePerformanceController'
import initFacultyDept from './facultyDeptController'
import initEnrolmentTrend from './enrolmentTrendController'
import initUMIInstructor from './UMIInstructorController'
import initEnrolmentLineChart from './enrolmentLineChartController'
import initFacultyDeptLineChart from './facultyDeptLineChartController'
import initStats from './statsController'
import initOverview from './overviewController'

const init = () => {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })

  initOverallInstructor()

  initUMIDispersion()

  // commented out for now because of annoying error message
  // initCoursePerformance()

  initFacultyDept()

  initUMIInstructor()

  initEnrolmentTrend()

  initEnrolmentLineChart()

  initFacultyDeptLineChart()

  initStats()

  initOverview()
}

export default init
