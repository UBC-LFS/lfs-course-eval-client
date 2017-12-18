import { loadStats } from '../service/exportDataService'

const statsController = () => {
  document.getElementById('export-button').addEventListener('click', function () {
    const fromYear = document.getElementById('export-from-year').value
    const toYear = document.getElementById('export-to-year').value
    const dept = document.getElementById('export-dept').value
    loadStats({
      fromYear,
      toYear,
      dept
    })
  })
} 

export default statsController
