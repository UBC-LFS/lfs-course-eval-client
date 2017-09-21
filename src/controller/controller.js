import { loadChartData, loadFilterData } from '../service/dataService'
import drawChart1 from '../viz/drawChart1'
import codesAndDef from '../constants/questionDefinitions'
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
    yearSelection.innerHTML = data.years.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    // need to set current value below
    // yearSelection.value = 

    // make sure to add "all" into data.terms on server
    termSelection.innerHTML = data.terms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    termSelection.value = 'all'
        
    // make sure to add "all" into data.courseLevelSelection on server
    courseLevelSelection.innerHTML = data.courseLevelSelection.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    courseLevelSelection.value = 'all'

    questionCodeSelection.innerHTML = data.questionCodeSelection.map(x => '<option value="' + x + '">' + x + ": " + codesAndDef[x] + '</option>').join(' ')
    questionCodeSelection.value = 'UMI6'
}

export default controller
