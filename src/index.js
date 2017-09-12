//import { getData } from './controller/controller'
import drawUMIvsDispersion from './viz/drawGraph'

document.addEventListener('DOMContentLoaded', function() {
   fetch('data')
    .then(response => response.json())
    .then(x => drawUMIvsDispersion(x))
})
