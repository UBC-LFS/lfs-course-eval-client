import { loadUMIDispersion } from '../service/dataService'
import drawUMIVsDispersion from '../viz/drawUMIVsDispersion'

const attachGraph = (data, umi) => {
  const graph = document.getElementById('UMIvsDispersionGraph')
  // if (graph) graph.parentElement.removeChild(graph)
  graph.appendChild(drawUMIVsDispersion(data, umi).node())
}

const initUMIDispersion = () => loadUMIDispersion().then(data => {
  console.log('umiVsDispersion data:', data)
  attachGraph(data, { UMI: 6 })
})

export default initUMIDispersion
