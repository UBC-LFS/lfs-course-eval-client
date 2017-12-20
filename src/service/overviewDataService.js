import fetchJSON from './fetch'

const loadUMIDispersion = () => fetchJSON('overview/UMIDispersion')
const loadEnrolmentTrend = () => fetchJSON('overview/EnrolmentTrend')
const loadFacultyDept = () => fetchJSON('overview/FacultyDept')
const loadOverview = (year) => fetchJSON('overview/Overview/' + year)

export {
    loadUMIDispersion,
    loadEnrolmentTrend,
    loadFacultyDept,
    loadOverview
}
