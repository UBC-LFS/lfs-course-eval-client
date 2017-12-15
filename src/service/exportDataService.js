/* global fetch */

const fetchJSON = (url) => fetch(url).then(response => response.json())

const loadStats = (statsObj) => fetchJSON('export/' + statsObj.fromYear + '/' + statsObj.toYear + '/' + statsObj.dept)

export {
  loadStats
}
