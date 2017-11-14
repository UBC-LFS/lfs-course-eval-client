import { loadUMIDispersion } from '../service/dataService'
import drawUMIVsDispersion from '../viz/drawUMIVsDispersion'

const initUMIDispersion = () => loadUMIDispersion().then(data => {
  console.log('umiVsDispersion data:', data)
  drawUMIVsDispersion(data)
})

export default initUMIDispersion
