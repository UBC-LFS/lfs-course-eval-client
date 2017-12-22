import fetchJSON from './fetch'

const loadOptions = () => fetchJSON('export/options')
const loadStats = statsObj => fetchJSON('export/' + statsObj.fromYear + '/' + statsObj.toYear + '/' + statsObj.dept)

export {
  loadOptions,
  loadStats
}
