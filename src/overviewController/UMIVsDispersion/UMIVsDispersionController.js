/* global $ */
import { loadUMIDispersion } from '../../service/overviewDataService'
import drawUMIVsDispersion from './drawUMIVsDispersion'
import R from 'ramda'

const attachGraph = (data, filter) => {
  const svg = document.getElementById('UMIVsDispersionSVG')
  if (svg) svg.parentElement.removeChild(svg)
  const graph = document.getElementById('UMIvsDispersionGraph')
  graph.appendChild(drawUMIVsDispersion(data, filter).node())
}

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#umiVsDispersionDept').selectpicker('refresh')
  $('#umiVsDispersionYear').selectpicker('refresh')
  $('#umiVsDispersionTerm').selectpicker('refresh')
  $('#umiVsDispersionUMI').selectpicker('refresh')
}

const initFilterHandler = (data, defaultFilter) => {
  const deptSelect = document.getElementById('umiVsDispersionDept')
  $(deptSelect).val(defaultFilter.dept)
  const depts = ['all'].concat(R.uniq(data.map(x => x.dept).sort()))
  deptSelect.innerHTML = attachOptions(depts)

  const yearSelect = document.getElementById('umiVsDispersionYear')
  const years = R.uniq(data.map(x => x.year).sort())
  yearSelect.innerHTML = attachOptions(years)

  const termSelect = document.getElementById('umiVsDispersionTerm')
  termSelect.value = defaultFilter.term
  const terms = ['all'].concat(R.uniq((data.map(x => x.term))).sort())
  termSelect.innerHTML = attachOptions(terms)

  const umiSelect = document.getElementById('umiVsDispersionUMI')
  umiSelect.value = defaultFilter.UMI
  const UMI = ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6']
  umiSelect.innerHTML = attachOptions(UMI)

  const belowMinSelect = document.getElementById('umiVsDispersionBelowMin')

  const elements = [deptSelect, yearSelect, termSelect, umiSelect, belowMinSelect]

  elements.map(el => el.addEventListener('change', function () {
    attachGraph(data, {
      dept: deptSelect.value,
      year: Number(yearSelect.value),
      term: termSelect.value,
      UMI: umiSelect.value.slice(-1),
      meetsMin: belowMinSelect.value === 'true'
    })
  }))

  $('#umiVsDispersionDept').selectpicker('val', defaultFilter.dept)
  $('#umiVsDispersionYear').selectpicker('val', defaultFilter.year)
  $('#umiVsDispersionTerm').selectpicker('val', defaultFilter.term)
  $('#umiVsDispersionUMI').selectpicker('val', 'UMI6')

  refreshPicker()
}

const initUMIVsDispersion = () => loadUMIDispersion().then(data => {
  console.log('umiVsDispersion data:', data)

  const defaultFilter = { dept: 'all', year: 2017, term: 'all', UMI: 6, meetsMin: 'false' }

  initFilterHandler(data, defaultFilter)
  attachGraph(data, defaultFilter)
})

export default initUMIVsDispersion
