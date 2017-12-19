import Chart from 'chart.js'
// import * as d3Selection from 'd3-selection'
import { sortByTerm } from '../../util/util'
import { filterByTerm } from '../../util/filter'
// import * as d3 from 'd3'

// const lineMargin = { top: 60, bottom: 50, left: 50, right: 30 }

const createLineChart = (data, course, term) => {
  const courseData = data.find(x => x.Course === course)
  const dataset = filterByTerm(term, sortByTerm(courseData.Terms))
  const terms = []
  const enrolment = []
  dataset.map(x => {
    terms.push(x.year)
    enrolment.push(x.enrolment)
  })

  const dataNew = {
    labels: terms,
    datasets: [
      {
        label: 'Enrolment',
        lineTension: 0,
        backgroundColor: 'rgba(151,187,205,0.2)',
        borderColor: 'rgba(151,187,205,1)',
        pointBackgroundColor: 'rgba(151,187,205,1)',
        pointRadius: 5,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(151,187,205,1)',
        data: enrolment
      }
    ]
  }
  const ctx = document.getElementById('enrolmentLineChartCanvas').getContext('2d')
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  const lineChart = new Chart(ctx, {
    type: 'line',
    data: dataNew,
    options: options
  })
}

export default createLineChart
