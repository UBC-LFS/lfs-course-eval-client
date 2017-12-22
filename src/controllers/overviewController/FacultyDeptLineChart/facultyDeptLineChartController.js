/* global $ */
import Chart from 'chart.js'
import { loadFacultyDept } from '../../../service/overviewDataService'
import createLineChart from './drawUMITrendLine'
import R from 'ramda'
import { sortByTerm, compare } from '../../../util/util'
var myChart = null

const getUniqCourseTerms = (data, value) =>
  R.uniq((data.find(x => x.department === value)).data.map(x => x.term))

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#UMIDeptFilter.selectpicker').selectpicker('refresh')
  $('#UMITermFilter.selectpicker').selectpicker('refresh')
}

const getValue = x => x.value

const destroyChart = () => {
  if (myChart !== null) {
    myChart.destroy()
  }
}

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

  deptSelect.addEventListener('change', function (e) {
    const selectedDepartments = R.map(getValue, deptSelect.selectedOptions)
    const uniqueTerms = R.uniq(R.flatten(selectedDepartments.map(dept => getUniqCourseTerms(data, dept))))
    const courseTerms = ['all'].concat(uniqueTerms)
    termSelect.innerHTML = attachOptions(courseTerms)
    refreshPicker()
    destroyChart()
    myChart = createLineChart(data, selectedDepartments, termSelect.value)
  })

  termSelect.addEventListener('onselect', function () {
    const selectedDepartments = R.map(getValue, deptSelect.selectedOptions)
    destroyChart()
    myChart = createLineChart(data, selectedDepartments, termSelect.value)
  })
}

const initFacultyDeptLineChart = () => loadFacultyDept().then(data => {
  const deptSelect = document.getElementById('UMIDeptFilter')
  const termSelect = document.getElementById('UMITermFilter')
  console.log('facultyDept data:', data)
  initFilterHandler(data)
  const selectedDepartments = R.map(getValue, deptSelect.selectedOptions)
  myChart = createLineChart(data, selectedDepartments, termSelect.value)
})

export default initFacultyDeptLineChart
