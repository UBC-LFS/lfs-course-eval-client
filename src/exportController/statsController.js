import { loadStats } from '../service/exportDataService'

const statsController = () => {
  const fromYear = document.getElementById('export-from-year')
  const toYear = document.getElementById('export-to-year')
  const dept = document.getElementById('export-dept')

  document.getElementById('export-button').onclick(() => {
    console.log(fromYear.value)
  })
} 

export default statsController
