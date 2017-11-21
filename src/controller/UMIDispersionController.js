/* global $ */
import { loadUMIDispersion } from '../service/dataService'
import drawUMIVsDispersion from '../viz/drawUMIVsDispersion'
import R from 'ramda'

const attachGraph = (data, filter) => {
  const svg = document.getElementById('UMIVsDispersionSVG')
  if (svg) svg.parentElement.removeChild(svg)
  const graph = document.getElementById('UMIvsDispersionGraph')
  graph.appendChild(drawUMIVsDispersion(data, filter).node())
}

const attachOptions = (arr) => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#umiVsDispersionDept.selectpicker').selectpicker('refresh')
  $('#umiVsDispersionYear.selectpicker').selectpicker('refresh')
  $('#umiVsDispersionTerm.selectpicker').selectpicker('refresh')
  $('#umiVsDispersionUMI.selectpicker').selectpicker('refresh')
}

const initFilterHandler = (data) => {
  const draw = () => attachGraph(data, { dept: deptSelect.value, year: Number(yearSelect.value), term: termSelect.value, UMI: umiSelect.value.slice(-1), meetsMin: belowMinSelect.value === 'true' })

  const deptSelect = document.getElementById('umiVsDispersionDept')
  const depts = ['all'].concat(R.uniq(data.map(x => x.dept).sort()))
  deptSelect.innerHTML = attachOptions(depts)

  const yearSelect = document.getElementById('umiVsDispersionYear')
  const years = R.uniq(data.map(x => x.year).sort())
  yearSelect.innerHTML = attachOptions(years)

  const termSelect = document.getElementById('umiVsDispersionTerm')
  const terms = ['all'].concat(R.uniq((data.map(x => x.term))).sort())
  termSelect.innerHTML = attachOptions(terms)

  const umiSelect = document.getElementById('umiVsDispersionUMI')
  const UMI = ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6']
  umiSelect.innerHTML = attachOptions(UMI)

  const belowMinSelect = document.getElementById('umiVsDispersionBelowMin')

  const elements = [deptSelect, yearSelect, termSelect, umiSelect, belowMinSelect]

  elements.map(el => el.addEventListener('change', function () {
    console.log(deptSelect.value, yearSelect.value, termSelect.value, umiSelect.value, belowMinSelect.value)
    draw()
  }))

  refreshPicker()
}

const initUMIDispersion = () => loadUMIDispersion().then(data => {
  console.log('umiVsDispersion data:', data)
  initFilterHandler(data)
  attachGraph(data, { dept: 'all', year: 2017, term: 'all', UMI: 6, meetsMin: 'false' })
})

export default initUMIDispersion
