/* global fetch */

const fetchJSON = (url) => fetch(url).then(response => response.json())

const loadStats = (statsObj) => fetchJSON('export/' + statsObj.startYear + '/' + statsObj.endYear + '/' + statsObj.dept)

export {
  loadStats
}
