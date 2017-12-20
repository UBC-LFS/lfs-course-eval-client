import fetchJSON from './fetch'

const loadOverallInstructorData = () => fetchJSON('overview/OverallInstructor')
const loadCoursePerformance = () => fetchJSON('overview/CoursePerformance')
const loadUMIInstructorData = () => fetchJSON('overview/UMIInstructor')

export {
  loadOverallInstructorData,
  loadCoursePerformance,
  loadUMIInstructorData
}
