import Chart from 'chart.js'
import * as d3Selection from 'd3-selection'
import { sortByTerm, convertYearTermtoDate } from '../util/util'
import { filterByTerm } from '../util/filter'
import * as d3 from 'd3'
import R from 'ramda'

const lineMargin = { top: 60, bottom: 50, left: 50, right: 30 }
const dynamicColors = function () {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return [r, g, b]
}
const createLineChart = (data, departments, term) => {
  const deptDatasets = departments.map(department => data.find(x => x.department === department))
  const terms = []
  const datasets = deptDatasets.map(dataset => {
    dataset.data.map(termData => {
      termData.yearTerm = termData.year + termData.term
      terms.push({ year: termData.yearTerm })
      return termData
    })
    return dataset
  })
  const termLabels = filterByTerm(term, sortByTerm(R.uniq(terms))).map(x => x.year)
  const dataRecords = datasets.map(oDataset => {
    const dataset = []
    for (let i = 0; i < termLabels.length; i++) {
      let score = oDataset.data.find(x => x.yearTerm === termLabels[i])
      if (score !== undefined) {
        score = score.UMI6
      } else { score = null }
      dataset.push(score)
    }
    const colour = dynamicColors()
    return {

      label: oDataset.department,
      lineTension: 0,
      backgroundColor: 'rgba(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ',0.2)',
      borderColor: 'rgba(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ',1)',
      pointBackgroundColor: 'rgba(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ',1)',
      pointRadius: 5,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ',1)',
      data: dataset
    }
  }
  )

  const dataNew = {
    labels: termLabels,
    datasets: dataRecords
  }
  const ctx = document.getElementById('UMILineChartCanvas').getContext('2d')
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    spanGaps: true
  }
  const lineChart = new Chart(ctx, {
    type: 'line',
    data: dataNew,
    options: options
  })
}

export default createLineChart
