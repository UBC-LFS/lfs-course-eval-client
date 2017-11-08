/* global fetch */

const fetchJSON = (url) => fetch(url).then(response => response.json())

const loadUMIInstructor = () => fetchJSON('data/UMIInstructor')
const loadOverallInstructorData = () => fetchJSON('data/OverallInstructor')
const loadCoursePerformance = () => fetchJSON('data/CoursePerformance')
const loadUMIDispersion = () => fetchJSON('data/UMIDispersion')
const loadEnrolmentTrend = () => fetchJSON('data/EnrolmentTrend')
const loadFacultyDept = () => fetchJSON('/data/FacultyDept')

export {
    fetchJSON,
    loadUMIInstructor,
    loadOverallInstructorData,
    loadCoursePerformance,
    loadUMIDispersion,
    loadEnrolmentTrend,
    loadFacultyDept
}
