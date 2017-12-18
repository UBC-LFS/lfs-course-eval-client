import { loadStats, loadOptions } from '../service/exportDataService'

const statsController = () => {
  loadOptions().then(data => console.log('loaded options in export view', data))

  document.getElementById('export-button').addEventListener('click', function () {
    const fromYear = document.getElementById('export-from-year').value
    const toYear = document.getElementById('export-to-year').value
    const dept = document.getElementById('export-dept').value
    loadStats({
      fromYear,
      toYear,
      dept
    }).then(data => console.log(data))
  })
}

export default statsController
