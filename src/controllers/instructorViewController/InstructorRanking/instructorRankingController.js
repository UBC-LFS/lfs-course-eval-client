/* global $ */
import { loadOptions } from '../../../service/overviewDataService'

const refreshFilters = () => {
    $('#instructorRankingYearFilter.selectpicker').selectpicker('refresh')
}

const attachOptions = arr =>
    arr.map(x => '<option value=' + x + '>' + x + '</option>').join(' ')
const updateSliderRange = (min, max) => {
    const slider = document.getElementById('slider');
    slider.noUiSlider.updateOptions({
        range: {
            'min': min,
            'max': max
        }
    });
}
const calculateSliderEndpoints = (min, max) => {
    const sliderGap = (max-min) / 3
    const sliderStart = Math.floor(min + sliderGap)
    const sliderEnd = Math.floor(max - sliderGap)
    return [sliderStart,sliderEnd]
}
const initInstructorRanking = () => loadOptions().then(data => {
    const instructorSelect = document.getElementById('instructorRankingYearFilter')
    const yearsDescending = data[0].years.map(x => x.year).sort(function (a, b) { return b - a })
    instructorSelect.innerHTML = attachOptions(yearsDescending)
    refreshFilters()
    const slider = document.getElementById('slider');
    const yearData = data[0].years.find(function (element) {
        return element.year === instructorSelect.value
    })
    noUiSlider.create(slider, {
        start: calculateSliderEndpoints(yearData.minClassSize,yearData.maxClassSize),
        tooltips: true,
        connect: true,
        range: {
            'min': yearData.minClassSize,
            'max': yearData.maxClassSize
        }
    });

    instructorSelect.addEventListener('change', function () {
        const slider = document.getElementById('slider');
        const yearData = data[0].years.find(function (element) {
            return element.year === instructorSelect.value
        })
        updateSliderRange(yearData.minClassSize, yearData.maxClassSize)
        slider.noUiSlider.set(calculateSliderEndpoints(yearData.minClassSize,yearData.maxClassSize))
        refreshFilters()
    })
})

export default initInstructorRanking
