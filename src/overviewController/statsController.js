import { loadStats } from '../service/dataService'

const initStats = () => loadStats('2014/2016/APBI').then(data => {
  console.log('loadStats', data)

  const displayStats = document.getElementById('stats')

  const depts = ['APBI', 'ECON', 'FNH', 'FOOD', 'FRE', 'GRS', 'HUNU', 'LFS', 'PLNT', 'RMES', 'SOIL']
  const deptSelector = document.getElementById('deptSelector')
  
})

export default initStats
