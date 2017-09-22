import { loadData, loadFilterData } from '../service/dataService'
import drawChart1 from '../viz/drawChart1'
import codesAndDef from '../constants/questionDefinitions'
import * as get from '../util/get'
import R from 'ramda'


const controller = () => {
    const filterSetting = {
        time: {
            year: '2016',
            term: 'W2'
        },
        courseNum: 'LFSLC 100 001',
        department: 'LFS',
        toggleBelowMin: true,
        questionCode: 'UMI6',
        classSizeMin: 0,
        classSizeMax: 300, 
        courseLevel: 'all'
    }
    // initial draw
    chart1Controller(filterSetting)
    dashboardController()

    initEventListenerController()
    eventListeners(filterSetting, (newFilter) => {
        // call chart controller here
    })
}

const initEventListenerController = () => {
    const filterData = loadFilterData()
    filterData.then(filterObj => initEventListeners(filterObj))
}

const chart1Controller = (filterSettings) => {
    const chart1Data = loadData(undefined, 'c1')
    //chart1Data.then(data => initEventListeners(data))
}

const yearSelection = document.getElementById('yearSelection')
const termSelection = document.getElementById('termSelection')
const courseLevelSelection = document.getElementById('courseLevelSelection')
const deptSelection = document.getElementById('deptSelection')
const questionCodeSelection = document.getElementById('questionCodeSelection')
const toggleBelowMinSelection = document.getElementById('toggleBelowMinSelection')
const classSizeMin = document.getElementById('classSizeMin')
const classSizeMax = document.getElementById('classSizeMax')

const eventListeners = (filterSetting, callback) => {
    yearSelection.addEventListener('change', function() {   
        filterSetting.time.year = this.value
        callback(filterSetting)
    })
    termSelection.addEventListener('change', function() {
        filterSetting.time.term = this.value
        callback(filterSetting)
    })
    courseLevelSelection.addEventListener('change', function() {
        filterSetting.courseLevel = this.value
        callback(filterSetting)
    })
    deptSelection.addEventListener('change', function() {
        filterSetting.department = this.value
        callback(filterSetting)
    })
    questionCodeSelection.addEventListener('change', function() {
        filterSetting.questionCode = this.value
        callback(filterSetting)
    })
    toggleBelowMinSelection.addEventListener('change', function() {
        if (toggleBelowMinSelection.checked) {
            filterSetting.toggleBelowMin = true
        } else filterSetting.toggleBelowMin = false
        callback(filterSetting)
    })
    classSizeMin.addEventListener('change', function() {
         filterSetting.classSizeMin = this.value
         callback(filterSetting)
    })
    classSizeMax.addEventListener('change', function() {
        filterSetting.classSizeMax = this.value
        callback(filterSetting)
    })
}

const initEventListeners = (filterObj) => {
    yearSelection.innerHTML = filterObj.years.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    // need to set current value below
    // yearSelection.value = 

    // make sure to add "all" into data.terms on server
    termSelection.innerHTML = filterObj.terms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    termSelection.value = 'all'
        
    // make sure to add "all" into data.courseLevelSelection on server
    courseLevelSelection.innerHTML = filterObj.courseLevels.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    courseLevelSelection.value = 'all'

    questionCodeSelection.innerHTML = filterObj.questionCodes.map(x => '<option value="' + x + '">' + x + ": " + codesAndDef[x] + '</option>').join(' ')
    questionCodeSelection.value = 'UMI6'

    // make sure to add "all" into data.courseLevelSelection on server
    deptSelection.innerHTML = filterObj.depts.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    deptSelection.value = 'all'
}

const dashboardController = (filterSettings) => {
    const dashboardData = loadData(undefined, 'dashboard')
    dashboardData.then(data => initEventListeners(data))
}

export default controller
