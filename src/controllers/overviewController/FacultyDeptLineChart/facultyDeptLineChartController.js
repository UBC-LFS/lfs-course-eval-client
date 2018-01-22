/* global $ */
import { loadFacultyDept, loadOptions } from '../../../service/overviewDataService'
import createLineChart from './drawUMITrendLine'
import R from 'ramda'
import { sortByTerm, compare } from '../../../util/util'
let umiChart = null

const getUniqCourseTerms = (data, value) =>
  R.uniq((data.find(x => x.department === value)).data.map(x => x.term))

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#UMIDeptFilter.selectpicker').selectpicker('refresh')
  $('#UMITermFilter.selectpicker').selectpicker('refresh')
}

const destroyChart = () => {
  if (umiChart !== null) {
    umiChart.destroy()
  }
}

const initFilterHandler = data => {
  const deptSelect = document.getElementById('UMIDeptFilter')
  const termSelect = document.getElementById('UMITermFilter')
  loadOptions()
    .then(options => options[0])
    .then(options => {
      deptSelect.innerHTML = attachOptions(options.depts)
      deptSelect.options[0].selected = true
      refreshPicker()
      const terms = ['all'].concat(getUniqCourseTerms(data, deptSelect.value))
      termSelect.innerHTML = attachOptions(terms)
      refreshPicker()
      const selectedDepartments = R.map(x => x.value, deptSelect.selectedOptions)
      umiChart = createLineChart(data, selectedDepartments, termSelect.value)
    })
  deptSelect.addEventListener('change', function (e) {
    const selectedDepartments = R.map(x => x.value, deptSelect.selectedOptions)
    const uniqueTerms = R.uniq(R.flatten(selectedDepartments.map(dept => getUniqCourseTerms(data, dept))))
    const courseTerms = ['all'].concat(uniqueTerms)
    termSelect.innerHTML = attachOptions(courseTerms)
    refreshPicker()
    destroyChart()
    umiChart = createLineChart(data, selectedDepartments, termSelect.value)
  })

  termSelect.addEventListener('change', function () {
    const selectedDepartments = R.map(x => x.value, deptSelect.selectedOptions)
    destroyChart()
    umiChart = createLineChart(data, selectedDepartments, termSelect.value)
  })
}

const initFacultyDeptLineChart = () => loadFacultyDept().then(data => {
  console.log('facultyDept data:', data)
  initFilterHandler(data)
})

export default initFacultyDeptLineChart
