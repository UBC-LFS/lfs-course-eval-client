import { loadStats, loadOptions } from '../../service/exportDataService'

const statsController = () => {
  const fromYear = document.getElementById('export-from-year')
  const toYear = document.getElementById('export-to-year')
  const dept = document.getElementById('export-dept')

  loadOptions()
    .then(data => data[0])
    .then(obj => {
      obj.depts.unshift('all')
      return obj
    })
    .then(obj => {
      fromYear.innerHTML = obj.years.map(year => '<option value="' + year + '">' + year + '</option>').join(' ')
      toYear.innerHTML = obj.years.map(year => '<option value="' + year + '">' + year + '</option>').join(' ')
      dept.innerHTML = obj.depts.map(dept => '<option value="' + dept + '">' + dept + '</option>').join(' ')

      // this sets toYear to latest year
      toYear.value = obj.years[obj.years.length - 1]
    })

  document.getElementById('export-button').addEventListener('click', function () {
    if (fromYear.value <= toYear.value) {
      loadStats({
        fromYear: fromYear.value,
        toYear: toYear.value,
        dept: dept.value
      }).then(data => {
        // do something with the data, maybe a table?
        console.log(data)
      })
    }
  })
}

export default statsController
