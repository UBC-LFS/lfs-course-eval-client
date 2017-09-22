import { loadData, loadFilterData } from '../service/dataService'
import drawChart1 from '../viz/drawChart1'
import codesAndDef from '../constants/questionDefinitions'
import * as get from '../util/get'
import R from 'ramda'

const eventListeners = (filterSetting, ids, callback) => {
    ids.yearSelection.addEventListener('change', function() {   
        filterSetting.time.year = this.value
        callback(filterSetting)
    })
    ids.termSelection.addEventListener('change', function() {
        filterSetting.time.term = this.value
        callback(filterSetting)
    })
    ids.courseLevelSelection.addEventListener('change', function() {
        filterSetting.courseLevel = this.value
        callback(filterSetting)
    })
    ids.deptSelection.addEventListener('change', function() {
        filterSetting.department = this.value
        callback(filterSetting)
    })
    ids.questionCodeSelection.addEventListener('change', function() {
        filterSetting.questionCode = this.value
        callback(filterSetting)
    })
    ids.toggleBelowMinSelection.addEventListener('change', function() {
        if (toggleBelowMinSelection.checked) {
            filterSetting.toggleBelowMin = true
        } else filterSetting.toggleBelowMin = false
        callback(filterSetting)
    })
    ids.classSizeMin.addEventListener('change', function() {
         filterSetting.classSizeMin = this.value
         callback(filterSetting)
    })
    ids.classSizeMax.addEventListener('change', function() {
        filterSetting.classSizeMax = this.value
        callback(filterSetting)
    })
}

const initEventListeners = (initialFilterSetting, filterObj, ids) => {
    ids.yearSelection.innerHTML = filterObj.years.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    ids.yearSelection.value = initialFilterSetting.time.year

    filterObj.terms.push('all')
    ids.termSelection.innerHTML = filterObj.terms.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    ids.termSelection.value = 'all'
        
    filterObj.courseLevels.push('all')
    ids.courseLevelSelection.innerHTML = filterObj.courseLevels.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    ids.courseLevelSelection.value = 'all'

    ids.questionCodeSelection.innerHTML = filterObj.questionCodes.map(x => '<option value="' + x + '">' + x + ": " + codesAndDef[x] + '</option>').join(' ')
    ids.questionCodeSelection.value = 'UMI6'

    filterObj.depts.push('all')
    ids.deptSelection.innerHTML = filterObj.depts.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
    ids.deptSelection.value = 'all'
}

const initEventListenerController = (filterSetting, ids) => {
    const filterData = loadFilterData()
    filterData.then(filterObj => initEventListeners(filterSetting, filterObj, ids))
}

const chartController = (filterSettings) => {
    const chart1Data = loadData(undefined, 'c1')
    chart1Data.then(data => drawChart1(data))
    // call chart2data, chart3data from here?
}

const dashboardController = (filterSettings) => {
    const dashboardData = loadData(undefined, 'dashboard')
    //dashboardData.then(data => initEventListeners(data))
}

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

    const ids = {
        yearSelection: document.getElementById('yearSelection'),
        termSelection: document.getElementById('termSelection'),
        courseLevelSelection: document.getElementById('courseLevelSelection'),
        deptSelection: document.getElementById('deptSelection'),
        questionCodeSelection: document.getElementById('questionCodeSelection'),
        toggleBelowMinSelection: document.getElementById('toggleBelowMinSelection'),
        classSizeMin: document.getElementById('classSizeMin'),
        classSizeMax: document.getElementById('classSizeMax')
    }

    // initial draw
    chartController(filterSetting)
    dashboardController()

    initEventListenerController(filterSetting, ids)
    eventListeners(filterSetting, ids, (newFilter) => {
        // call chart controller here
    })
}





export default controller
