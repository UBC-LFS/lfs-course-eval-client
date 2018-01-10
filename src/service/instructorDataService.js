import fetchJSON from './fetch'

const loadInstructorOverview = (instructor,year) => fetchJSON('instructor/instructorOverview/' + instructor + '/' + year)

export {
    loadInstructorOverview
}
