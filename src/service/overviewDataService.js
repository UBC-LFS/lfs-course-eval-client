import fetchJSON from './fetch'

const loadUMIVsDispersion = ({ year, dept, term, meetsMin }) => fetchJSON('overview/UMIVsDispersion/' + year + '/' + term + '/' + dept + '/' + meetsMin)
const loadOptions = () => fetchJSON('overview/options')
const loadEnrolmentTrend = () => fetchJSON('overview/EnrolmentTrend')
const loadFacultyDept = () => fetchJSON('overview/FacultyDept')
const loadOverview = year => fetchJSON('overview/Overview/' + year)

export {
  loadUMIVsDispersion,
  loadOptions,
  loadEnrolmentTrend,
  loadFacultyDept,
  loadOverview
}
