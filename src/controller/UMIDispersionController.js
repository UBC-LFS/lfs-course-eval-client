/* global $ */
import { loadUMIDispersion } from '../service/dataService'
import drawUMIVsDispersion from '../viz/drawUMIVsDispersion'
import R from 'ramda'

const attachGraph = (data, umi) => {
  const svg = document.getElementById('UMIVsDispersionSVG')
  if (svg) svg.parentElement.removeChild(svg)
  const graph = document.getElementById('UMIvsDispersionGraph')
  graph.appendChild(drawUMIVsDispersion(data, umi).node())
}

const attachOptions = (arr) => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const initFilterHandler = (data) => {
  const deptSelect = document.getElementById('umiVsDispersionDept')
  const yearSelect = document.getElementById('umiVsDispersionYear')
  const termSelect = document.getElementById('umiVsDispersionTerm')

  const years = R.uniq(data.map(x => x.year).sort())
  yearSelect.innerHTML = attachOptions(years)
  const terms = ['all'].concat(R.uniq((data.map(x => x.term))).sort())
  termSelect.innerHTML = attachOptions(terms)
  $('#umiVsDispersionYear.selectpicker').selectpicker('refresh')
  $('#umiVsDispersionTerm.selectpicker').selectpicker('refresh')
}

const initUMIDispersion = () => loadUMIDispersion().then(data => {
  console.log('umiVsDispersion data:', data)
  initFilterHandler(data)
  attachGraph(data, { UMI: 6 })
})

export default initUMIDispersion
