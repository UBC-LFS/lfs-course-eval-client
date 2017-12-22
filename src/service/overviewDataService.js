import fetchJSON from './fetch'

const loadUMIVsDispersion = ({ year, dept, term, UMI, meetsMin }) => fetchJSON('overview/UMIVsDispersion/' + year + '/' + term + '/' + dept + '/' + meetsMin)
const loadUMIVsDispersionOptions = () => fetchJSON('overview/UMIVsDispersion/options')
const loadEnrolmentTrend = () => fetchJSON('overview/EnrolmentTrend')
const loadFacultyDept = () => fetchJSON('overview/FacultyDept')
const loadOverview = year => fetchJSON('overview/Overview/' + year)

export {
    loadUMIVsDispersion,
    loadUMIVsDispersionOptions,
    loadEnrolmentTrend,
    loadFacultyDept,
    loadOverview
}
