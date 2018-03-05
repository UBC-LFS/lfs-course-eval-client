import fetchJSON from './fetch'

const loadInstructorOverview = (instructor, year) => fetchJSON('instructor/instructorOverview/' + instructor + '/' + year)
const loadInstructorTerms = (PUID) => fetchJSON('instructor/instructorOverview/' + PUID)

export {
    loadInstructorOverview,
    loadInstructorTerms
}
