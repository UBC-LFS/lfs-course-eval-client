import Chart from 'chart.js'
import * as d3Selection from 'd3-selection'
import { sortByTerm, convertYearTermtoDate } from '../../../util/util'
import { filterByTerm } from '../../../util/filter'
import R from 'ramda'

const getColour = dept => {
  const colorPalette = {
    'APBI': [70, 130, 180],
    'ECON': [165, 42, 42],
    'FNH': [0, 128, 128],
    'FOOD': [255, 215, 0],
    'FRE': [0, 100, 0],
    'GRS': [128, 0, 0],
    'HUNU': [255, 127, 80],
    'LFS': [255, 192, 303],
    'PLNT': [147, 112, 219],
    'RMES': [220, 20, 60],
    'SOIL': [255, 255, 0]
  }
  return colorPalette[dept]
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
    const colour = getColour(oDataset.department)
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

  console.log('chart dataset', dataNew)

  return new Chart(ctx, {
    type: 'line',
    data: dataNew,
    options: options
  })
}

export default createLineChart
