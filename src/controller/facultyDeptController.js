import { loadFacultyDept } from '../service/dataService'
import drawUMITrendLine from '../viz/drawUMITrendLine'
import R from 'ramda'

const initFacultyDept = () => loadFacultyDept().then(data => {
  console.log('facultyDept data:', data)

  const years = R.compose(
    R.flatten(),
    R.map(x => R.keys(x).filter(x => x !== '_id'))
  )(data)

  const terms = ['S', 'S1', 'S2', 'SA', 'W', 'W1', 'W2', 'WA', 'WC']

  const facultyAvgData = []
  const apbiUMI6Data = []
  years.map(year => {
    const yearObj = data.find(x => x.hasOwnProperty(String(year)))[year]
    const pickTerms = R.pick(terms, yearObj)

    Object.keys(pickTerms).map(term => {
      if (pickTerms[term].facultyAverage) facultyAvgData.push({ 'year': year + term, 'UMI': pickTerms[term].facultyAverage.UMI6 })
    })
    facultyAvgData.push({ year, 'UMI': data.find(x => x.hasOwnProperty(String(year)))[year].facultyAverage.UMI6 })

    Object.keys(pickTerms).map(term => {
      if (pickTerms[term].APBIAverage) apbiUMI6Data.push({ 'year': year + term, 'UMI': pickTerms[term].APBIAverage.UMI6 })
    })
    apbiUMI6Data.push({ year, 'UMI': data.find(x => x.hasOwnProperty(String(year)))[year].APBIAverage.UMI6 })
  })

  const facultyUMITrend = document.getElementById('facultyUMITrend')
  facultyUMITrend.appendChild(drawUMITrendLine(facultyAvgData).node())

  const APIBUMITrend = document.getElementById('apbiUMITrend')
  APIBUMITrend.appendChild(drawUMITrendLine(apbiUMI6Data).node())
})

export default initFacultyDept
