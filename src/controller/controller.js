import { loadData } from '../service/dataService'
import drawChart1 from '../viz/drawChart1'
import R from 'ramda'

const controller = () => {
    // initial draw
    chart1Controller(undefined)
    // chart2Controller and chart3Controller will go here
}

const chart1Controller = (filterSettings) => {
    const chart1Data = loadData(undefined, 'c1')
    // call draw
    chart1Data.then(data => initEventListeners(data))
}

const yearSelection = document.getElementById('yearSelection')
const termSelection = document.getElementById('termSelection')
const courseLevelSelection = document.getElementById('courseLevelSelection')
const deptSelection = document.getElementById('deptSelection')
const questionCodeSelection = document.getElementById('questionCodeSelection')
const toggleBelowMinSelection = document.getElementById('toggleBelowMinSelection')
const classSizeMin = document.getElementById('classSizeMin')
const classSizeMax = document.getElementById('classSizeMax')

const eventListeners = () => {
        
}

const initEventListeners = (data) => {
    
}

export default controller
