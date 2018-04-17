import fetchJSON from './fetch'

const loadInstructorOverview = (instructor, year) => fetchJSON('instructor/instructorOverview/' + instructor + '/' + year)
const loadInstructorTerms = (PUID) => fetchJSON('instructor/instructorOverview/' + PUID)
const loadInstructorRanking = (year, minClassSize, maxClassSize) => fetchJSON('instructor/instructorRanking/' + year + '/' + minClassSize + '/' + maxClassSize)
export {
  loadInstructorOverview,
  loadInstructorTerms,
  loadInstructorRanking
}
