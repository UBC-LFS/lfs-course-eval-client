import { loadUMIInstructor, loadOverallInstructorData, loadCoursePerformance, loadUMIDispersion, loadEnrolmentTrend, loadFacultyDept } from '../service/dataService'
import drawUMIVsDispersion from '../viz/drawUMIVsDispersion'
import drawOverallInstructor from '../viz/drawOverallInstructorTable'
import drawUMIInstructor from '../viz/drawUMIInstructorTable'
import drawCoursePerformance from '../viz/drawCoursePerformanceTable'
import drawUMITrendLine from '../viz/drawUMITrendLine'
import drawCountHistogram from '../viz/drawCountHistogram'
import drawEnrolmentTrendLine from '../viz/drawEnrolmentTrendLine'
import * as questionDefinitions from '../constants/questionDefinitions'
import R from 'ramda'

const eventListeners = (filterSetting, ids, callback) => {
  ids.yearSelection.addEventListener('change', function () {
    filterSetting.time.year = this.value
    callback(filterSetting)
  })
  ids.termSelection.addEventListener('change', function () {
    filterSetting.time.term = this.value
    callback(filterSetting)
  })
  ids.courseLevelSelection.addEventListener('change', function () {
    filterSetting.courseLevel = this.value
    callback(filterSetting)
  })
  ids.deptSelection.addEventListener('change', function () {
    filterSetting.department = this.value
    callback(filterSetting)
  })
  ids.questionCodeSelection.addEventListener('change', function () {
    filterSetting.questionCode = this.value
    callback(filterSetting)
  })
  ids.toggleBelowMinSelection.addEventListener('change', function () {
    if (ids.toggleBelowMinSelection.checked) {
      filterSetting.toggleBelowMin = true
    } else filterSetting.toggleBelowMin = false
    callback(filterSetting)
  })
  ids.classSizeMin.addEventListener('change', function () {
    filterSetting.classSizeMin = this.value
    callback(filterSetting)
  })
  ids.classSizeMax.addEventListener('change', function () {
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

  ids.questionCodeSelection.innerHTML = filterObj.questionCodes.map(x => '<option value="' + x + '">' + x + ': ' + questionDefinitions.codesAndDef[x] + '</option>').join(' ')
  ids.questionCodeSelection.value = 'UMI6'

  filterObj.depts.push('all')
  ids.deptSelection.innerHTML = filterObj.depts.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')
  ids.deptSelection.value = 'all'
}

const initEventListenerController = (filterSetting, ids) => {
  // const filterData = fetchJSON('filterData')
  // filterData.then(filterObj => initEventListeners(filterSetting, filterObj, ids))
}

const chartController = (filterSettings) => {
  loadOverallInstructorData().then(data => {
    console.log('overallInstructor data:', data)
    drawOverallInstructor(data)
  })

  loadUMIInstructor().then(data => {
    console.log('umiInstructor data:', data)
    drawUMIInstructor(data)
  })

  loadCoursePerformance().then(data => {
    console.log('coursePerformanceData data:', data)
    drawCoursePerformance(data, 'UMI6')
  })

  loadUMIDispersion().then(data => {
    console.log('umiVsDispersion data:', data)
    drawUMIVsDispersion(data)
  })

  loadFacultyDept().then(data => {
    console.log('facultyDept data:', data)

    const years = R.flatten(data.map(x => R.keys(x).filter(x => x !== '_id')))

    const facultyUMI6 = years.map(year => ({ year, 'UMI': data.find(x => x.hasOwnProperty(String(year)))[year].facultyAverage.UMI6 }))
    const apbiUMI6 = years.map(year => ({ year, 'UMI': data.find(x => x.hasOwnProperty(String(year)))[year].APBIAverage.UMI6 }))
    console.log(apbiUMI6)

    const facultyUMITrend = document.getElementById('facultyUMITrend')
    facultyUMITrend.appendChild(drawUMITrendLine(facultyUMI6).node())

    const APIBUMITrend = document.getElementById('apbiUMITrend')
    APIBUMITrend.appendChild(drawUMITrendLine(apbiUMI6).node())
    // do something with data later
  })
  
  const enrolmentTrendData = loadEnrolmentTrend()
  enrolmentTrendData.then(data => {
    console.log('enrolmentTrend data:', data)
    const enrolmentTrendLine = document.getElementById('enrolmentTrendLine')
    enrolmentTrendLine.appendChild(drawEnrolmentTrendLine().node())
  })
}

const dashboardController = (filterSettings) => {
  // const dashboardData = loadData(undefined, 'dashboard')
  // dashboardData.then(data => initEventListeners(data))
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
