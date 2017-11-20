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
  const depts = ['all'].concat(R.uniq(data.map(x => x.dept).sort()))
  deptSelect.innerHTML = attachOptions(depts)

  const draw = () => attachGraph(data, { dept: deptSelect.value, year: Number(yearSelect.value), term: termSelect.value, UMI: umiSelect.value.slice(-1), meetsMin: true })

  $('#umiVsDispersionDept.selectpicker').selectpicker('refresh')
  deptSelect.addEventListener('change', function () {
    $('#umiVsDispersionDept.selectpicker').selectpicker('refresh')
    draw()
  })

  const yearSelect = document.getElementById('umiVsDispersionYear')
  const years = R.uniq(data.map(x => x.year).sort())
  yearSelect.innerHTML = attachOptions(years)
  $('#umiVsDispersionYear.selectpicker').selectpicker('refresh')
  yearSelect.addEventListener('change', function () {
    $('#umiVsDispersionYear.selectpicker').selectpicker('refresh')
    draw()
  })

  const termSelect = document.getElementById('umiVsDispersionTerm')
  const terms = ['all'].concat(R.uniq((data.map(x => x.term))).sort())
  termSelect.innerHTML = attachOptions(terms)
  $('#umiVsDispersionTerm.selectpicker').selectpicker('refresh')
  termSelect.addEventListener('change', function () {
    $('#umiVsDispersionTerm.selectpicker').selectpicker('refresh')
    draw()
  })

  const umiSelect = document.getElementById('umiVsDispersionUMI')
  const UMI = ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6']
  umiSelect.innerHTML = attachOptions(UMI)
  $('#umiVsDispersionUMI.selectpicker').selectpicker('refresh')
  umiSelect.addEventListener('change', function () {
    $('#umiVsDispersionUMI.selectpicker').selectpicker('refresh')
    draw()
  })
}

const initUMIDispersion = () => loadUMIDispersion().then(data => {
  console.log('umiVsDispersion data:', data)
  initFilterHandler(data)
  attachGraph(data, { dept: 'all', year: 2017, term: 'all', UMI: 6, meetsMin: false })
})

export default initUMIDispersion
