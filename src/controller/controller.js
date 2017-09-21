import { loadChartData, loadFilterData } from '../service/dataService'
import drawChart1 from '../viz/drawChart1'
import * as get from '../util/get'
import R from 'ramda'

const controller = () => {
    // initial draw
    chart1Controller(undefined)
    // chart2Controller and chart3Controller will go here
}

const initEventListenerController = () => {
    const filterData = loadFilterData()
    filterData.then(data => initEventListeners(data))
}

const chart1Controller = (filterSettings) => {
    const chart1Data = loadChartData(undefined, 'c1')
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
