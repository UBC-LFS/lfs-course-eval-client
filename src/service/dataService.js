/* global fetch */

const fetchJSON = (url) => fetch(url).then(response => response.json())

const createFilterString = ({ time, courseNum, department, toggleBelowMin, questionCode, classSizeMin, classSizeMax }, chartKey) => {
  return 'data/' + chartKey + '/' + [time.year, time.term, courseNum, department, toggleBelowMin, questionCode, classSizeMin, classSizeMax].join('/')
}

const loadData = (filterSettings = {
  time: {
    year: '2016',
    term: 'W2'
  },
  courseNum: 'LFSLC 100 001',
  department: 'LFS',
  toggleBelowMin: true,
  questionCode: 'UMI6',
  classSizeMin: 0,
  classSizeMax: 300 // [min, max]
}, chartKey) => fetchJSON(createFilterString(filterSettings, chartKey))

const loadUMIInstructor = () => fetchJSON('data/UMIInstructor')
const loadOverallInstructorData = () => fetchJSON('data/OverallInstructor')
const loadCoursePerformance = () => fetchJSON('data/CoursePerformance')
export {
    loadData,
    createFilterString,
    fetchJSON,
    loadUMIInstructor,
    loadOverallInstructorData,
    loadCoursePerformance
}
