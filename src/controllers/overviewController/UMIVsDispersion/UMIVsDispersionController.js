/* global $ */
import { loadUMIVsDispersion, loadOptions } from '../../../service/overviewDataService'
import drawUMIVsDispersion from './drawUMIVsDispersion'

const attachGraph = (data, umi = 'UMI6') => {
  const svg = document.getElementById('UMIVsDispersionSVG')
  if (svg) svg.parentElement.removeChild(svg)
  const graph = document.getElementById('UMIvsDispersionGraph')
  graph.appendChild(drawUMIVsDispersion(data, umi).node())
}

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#umiVsDispersionDept').selectpicker('refresh')
  $('#umiVsDispersionYear').selectpicker('refresh')
  $('#umiVsDispersionTerm').selectpicker('refresh')
  $('#umiVsDispersionUMI').selectpicker('refresh')
}

const initUMIVsDispersion = () => {
  const deptSelect = document.getElementById('umiVsDispersionDept')
  const yearSelect = document.getElementById('umiVsDispersionYear')
  const termSelect = document.getElementById('umiVsDispersionTerm')
  const umiSelect = document.getElementById('umiVsDispersionUMI')
  const belowMinSelect = document.getElementById('umiVsDispersionBelowMin')
  const UMI = ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6']
  const elements = [deptSelect, yearSelect, termSelect, umiSelect, belowMinSelect]

  loadOptions()
    .then(options => options[0])
    .then(options => {
      options.depts.unshift('all')
      options.terms.unshift('all')
      return options
    })
    .then(options => {
      deptSelect.value = options.depts[0]
      umiSelect.value = 'UMI6'

      deptSelect.innerHTML = attachOptions(options.depts)
      yearSelect.innerHTML = attachOptions(options.years.map(x => x.year))
      termSelect.innerHTML = attachOptions(options.terms)
      umiSelect.innerHTML = attachOptions(UMI)

      $('#umiVsDispersionDept').selectpicker('val', options.depts[0])
      $('#umiVsDispersionYear').selectpicker('val', options.years[options.years.length - 1].year)
      $('#umiVsDispersionTerm').selectpicker('val', options.terms[0])
      $('#umiVsDispersionUMI').selectpicker('val', 'UMI6')

      refreshPicker()
    })
    .then(() => {
      loadUMIVsDispersion({ dept: deptSelect.value, year: Number(yearSelect.value), term: termSelect.value, meetsMin: belowMinSelect.value })
        .then(data => attachGraph(data))
    })

  elements.map(el => el.addEventListener('change', function () {
    loadUMIVsDispersion({ dept: deptSelect.value, year: Number(yearSelect.value), term: termSelect.value, meetsMin: belowMinSelect.value })
      .then(data => attachGraph(data, umiSelect.value))
  }))
}

export default initUMIVsDispersion
