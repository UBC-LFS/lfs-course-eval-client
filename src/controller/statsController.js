import { loadStats } from '../service/dataService'

const initStats = () => loadStats().then(data => {
  console.log(data)
})

export default initStats
