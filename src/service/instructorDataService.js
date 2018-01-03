import fetchJSON from './fetch'

const loadInstructorOverview = instructor => fetchJSON('instructor/instructorOverview/' + instructor)

export {
    loadInstructorOverview
}
