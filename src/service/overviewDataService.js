import fetchJSON from './fetch'

const loadUMIDispersion = ({ year, dept, term, UMI, meetsMin }) => fetchJSON('overview/UMIVsDispersion/' + year + '/' + term + '/' + dept + '/' + UMI + '/' + meetsMin)
const loadEnrolmentTrend = () => fetchJSON('overview/EnrolmentTrend')
const loadFacultyDept = () => fetchJSON('overview/FacultyDept')
const loadOverview = (year) => fetchJSON('overview/Overview/' + year)

export {
    loadUMIDispersion,
    loadEnrolmentTrend,
    loadFacultyDept,
    loadOverview
}
