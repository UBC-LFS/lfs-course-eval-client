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

const initFilterHandler = (data) => {
  const deptSelect = document.getElementById('umiVsDispersionDept')
  const yearSelect = document.getElementById('umiVsDispersionYear')
  const termSelect = document.getElementById('umiVsDispersionTerm')
  const umiSelect = document.getElementById('umiVsDispersionUMI')

  const depts = ['all'].concat(R.uniq(data.map(x => x.dept).sort()))
  deptSelect.innerHTML = attachOptions(depts)
  const years = R.uniq(data.map(x => x.year).sort())
  yearSelect.innerHTML = attachOptions(years)
  const terms = ['all'].concat(R.uniq((data.map(x => x.term))).sort())
  termSelect.innerHTML = attachOptions(terms)
  const UMI = ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6']
  umiSelect.innerHTML = attachOptions(UMI)

  $('#umiVsDispersionDept.selectpicker').selectpicker('refresh')
  $('#umiVsDispersionYear.selectpicker').selectpicker('refresh')
  $('#umiVsDispersionTerm.selectpicker').selectpicker('refresh')
  $('#umiVsDispersionUMI.selectpicker').selectpicker('refresh')

  deptSelect.addEventListener('change', function () {
    $('#umiVsDispersionDept.selectpicker').selectpicker('refresh')
    attachGraph(data, { year: yearSelect.value, term: termSelect.value, UMI: umiSelect.value, meetsMin: true })
  })

  yearSelect.addEventListener('change', function () {
    $('#umiVsDispersionYear.selectpicker').selectpicker('refresh')
    attachGraph(data, { year: yearSelect.value, term: termSelect.value, UMI: umiSelect.value, meetsMin: true })
  })

  termSelect.addEventListener('change', function () {
    $('#umiVsDispersionTerm.selectpicker').selectpicker('refresh')
    attachGraph(data, { year: yearSelect.value, term: termSelect.value, UMI: umiSelect.value, meetsMin: true })
  })
}

const initUMIDispersion = () => loadUMIDispersion().then(data => {
  console.log('umiVsDispersion data:', data)
  initFilterHandler(data)
  attachGraph(data, { year: 2017, term: 'all', UMI: 6, meetsMin: false })
})

export default initUMIDispersion
