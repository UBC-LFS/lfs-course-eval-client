/* global $ */
import { loadOptions } from '../../../service/overviewDataService'
import { loadInstructorRanking } from '../../../service/instructorDataService';
import drawInstructorRankingChart from '../InstructorRanking/drawInstructorRankingGraph'
import R from 'ramda'


var instructorRankingChart = null

const refreshFilters = () => {
    $('#instructorRankingYearFilter.selectpicker').selectpicker('refresh')
    $('#irQuestionFilter.selectpicker').selectpicker('refresh')
}

const destroyChart = () => {
    if (instructorRankingChart !== null) {
        instructorRankingChart.destroy()
    }
}
const attachOptions = arr =>
    arr.map(x => '<option value=' + x + '>' + x + '</option>').join(' ')

const getYearsTaught = (data) => {
    const instructorSelect = document.getElementById('instructor-select')
    const selectedPUID = instructorSelect.value
    const selectedInstructorData = data[0].instructors.find(function (instructor) {
        return instructor.PUID === selectedPUID
    })
    return R.uniq(selectedInstructorData.terms.map(x => x.substring(0, 4)))
}
const setYearandUMIFilter = (data, yearSelect, umiSelect) => {
    const years = getYearsTaught(data)
    umiSelect.selectedIndex = 5
    const yearsDescending = years.sort(function (a, b) { return b - a })
    yearSelect.innerHTML = attachOptions(yearsDescending)
    refreshFilters()
}

const initializeSlider = (data, yearSelect, slider) => {
    const yearData = data[0].years.find(function (element) {
        return element.year === yearSelect.value
    })
    const min = yearData.minClassSize
    const max = yearData.maxClassSize
    noUiSlider.create(slider, {
        start: [min, max],
        tooltips: true,
        connect: true,
        range: {
            'min': min,
            'max': max
        }
    });
}

const updateSlider = (data, yearSelect, slider) => {
    const yearData = data[0].years.find(function (element) {
        return element.year === yearSelect.value
    })
    const min = yearData.minClassSize
    const max = yearData.maxClassSize
    slider.noUiSlider.updateOptions({
        range: {
            'min': min,
            'max': max
        }
    });
    slider.noUiSlider.set([min, max])
}

const resetChart = () => {
    refreshFilters()
    destroyChart()
    createInstructorRankingChart()
}


const initInstructorRankingFilters = (data) => {
    const yearSelect = document.getElementById('instructorRankingYearFilter')
    const umiSelect = document.getElementById('irQuestionFilter')
    const instructorSelect = document.getElementById('instructor-select')
    const slider = document.getElementById('slider');

    setYearandUMIFilter(data, yearSelect, umiSelect)
    initializeSlider(data, yearSelect, slider)

    instructorSelect.addEventListener('change', function () {
        setYearandUMIFilter(data, yearSelect, umiSelect)
        updateSlider(data, yearSelect, slider)
        resetChart()
    })

    yearSelect.addEventListener('change', function () {
        updateSlider(data, yearSelect, slider)
        resetChart()
    })

    umiSelect.addEventListener('change', function () {
        resetChart()
    })

    slider.noUiSlider.on('end', function () {
        resetChart()
    })
}

const createInstructorRankingChart = () => {
    const slider = document.getElementById('slider');
    const yearSelect = document.getElementById('instructorRankingYearFilter')
    const classSizeRange = slider.noUiSlider.get()
    const umiSelect = document.getElementById('irQuestionFilter')
    loadInstructorRanking(yearSelect.value, parseInt(classSizeRange[0]), parseInt(classSizeRange[1])).then(data => {
        instructorRankingChart = drawInstructorRankingChart(data, umiSelect.value)
        console.log("instructor ranking: " + JSON.stringify(data))
    })
}
const initInstructorRanking = () => {
    loadOptions().then(data => {
        initInstructorRankingFilters(data)
        refreshFilters()
        createInstructorRankingChart()
    })
}

export default initInstructorRanking
