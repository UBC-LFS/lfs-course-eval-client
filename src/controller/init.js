import initOverallInstructor from './overallInstructorDataController'
import initUMIDispersion from './UMIDispersionController'
import initCoursePerformance from './coursePerformanceController'
import initFacultyDept from './facultyDeptController'
import initEnrolmentTrend from './enrolmentTrendController'
import initUMIInstructor from './UMIInstructorController'

const init = () => {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })
  initOverallInstructor()

  initUMIDispersion()

  initCoursePerformance()

  initFacultyDept()

  initUMIInstructor()

  initEnrolmentTrend()
}

export default init
