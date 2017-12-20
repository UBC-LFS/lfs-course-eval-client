import { loadFacultyDept } from '../../../service/overviewDataService'
import createLineChart from './drawUMITrendLine'
import R from 'ramda'
import { sortByTerm } from '../../../util/util'
import { compare } from '../../../util/util'

const getUniqCourseTerms = (data, value) =>
  R.uniq((data.find(x => x.department === value)).data.map(x => x.term))

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#UMIDeptFilter.selectpicker').selectpicker('refresh')
  $('#UMITermFilter.selectpicker').selectpicker('refresh')
}
const getValues = (x) => x.value

const initFilterHandler = data => {
  const deptSelect = document.getElementById('UMIDeptFilter')
  const termSelect = document.getElementById('UMITermFilter')
  const grapharea = document.getElementById('UMILineChartCanvas').getContext('2d')
  const departments = data.map(x => x.department).sort(compare)
  deptSelect.innerHTML = attachOptions(departments)
  deptSelect.options[0].selected = true
  const terms = ['all'].concat(getUniqCourseTerms(data, deptSelect.value))
  termSelect.innerHTML = attachOptions(terms)
  refreshPicker()

  deptSelect.addEventListener('change', function () {
    const myChart = new Chart(grapharea, {})
    const selectedDepartments = R.map(getValues, deptSelect.selectedOptions)
    const uniqueTerms = R.uniq(R.flatten(selectedDepartments.map(dept => getUniqCourseTerms(data, dept))))
    const courseTerms = ['all'].concat(uniqueTerms)
    termSelect.innerHTML = attachOptions(courseTerms)
    refreshPicker()
    myChart.destroy()
    createLineChart(data, selectedDepartments, termSelect.value)
  })

  termSelect.addEventListener('change', function () {
    const myChart = new Chart(grapharea, {})
    const selectedDepartments = R.map(getValues, deptSelect.selectedOptions)
    myChart.destroy()
    createLineChart(data, selectedDepartments, termSelect.value)
  })
}

const initFacultyDeptLineChart = () => loadFacultyDept().then(data => {
  const deptSelect = document.getElementById('UMIDeptFilter')
  const termSelect = document.getElementById('UMITermFilter')
  console.log('facultyDept data:', data)
  initFilterHandler(data)
  const selectedDepartments = R.map(getValues, deptSelect.selectedOptions)
  createLineChart(data, selectedDepartments, termSelect.value)
})

export default initFacultyDeptLineChart
