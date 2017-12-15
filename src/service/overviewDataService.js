/* global fetch */

const fetchJSON = (url) => fetch(url).then(response => response.json())

const loadUMIInstructorData = () => fetchJSON('overview/UMIInstructor')
const loadOverallInstructorData = () => fetchJSON('overview/OverallInstructor')
const loadCoursePerformance = () => fetchJSON('overview/CoursePerformance')
const loadUMIDispersion = () => fetchJSON('overview/UMIDispersion')
const loadEnrolmentTrend = () => fetchJSON('overview/EnrolmentTrend')
const loadFacultyDept = () => fetchJSON('overview/FacultyDept')
const loadStats = (filters) => fetchJSON('overview/' + filters)
const loadOverview = (year) => fetchJSON('overview/' + year)

export {
    loadUMIInstructorData,
    loadOverallInstructorData,
    loadCoursePerformance,
    loadUMIDispersion,
    loadEnrolmentTrend,
    loadFacultyDept,
    loadStats,
    loadOverview
}
