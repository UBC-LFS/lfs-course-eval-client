import fetchJSON from './fetch'

const loadUMIInstructorData = () => fetchJSON('overview/UMIInstructor')
const loadOverallInstructorData = () => fetchJSON('overview/OverallInstructor')
const loadCoursePerformance = () => fetchJSON('overview/CoursePerformance')
const loadUMIDispersion = () => fetchJSON('overview/UMIDispersion')
const loadEnrolmentTrend = () => fetchJSON('overview/EnrolmentTrend')
const loadFacultyDept = () => fetchJSON('overview/FacultyDept')
const loadOverview = (year) => fetchJSON('overview/Overview/' + year)

export {
    loadUMIInstructorData,
    loadOverallInstructorData,
    loadCoursePerformance,
    loadUMIDispersion,
    loadEnrolmentTrend,
    loadFacultyDept,
    loadOverview
}
