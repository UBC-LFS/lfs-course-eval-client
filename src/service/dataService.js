import drawUMIvsDispersion from '../viz/drawGraph'


const loadData = (url, filterSettings, chartKey) => {
    const filterSettingsConstant = {
        time: {
            year: '2016',
            term: 'all'
        },
        courseLevel: 'all',
        department: 'all',
        questionCode: 'IUMI06-5',
        toggleBelowMin: false,
        classSizeMin: 0,
        classSizeMax: 300 // [min, max]
    }
    url = url + '/' + chartKey + createFilterString(filterSettingsConstant)
    console.log(url)
    //Temporary filter settings, change to real filters once applied
    fetchJSON(url)
        .then(x => drawUMIvsDispersion(x))
}
const fetchJSON = (url) => fetch(url).then(response => response.json())
var filterString = ''
const createFilterString = (filterSettings) => {
    const keyArray = Object.keys(filterSettings)
    for (let i = 0; i < keyArray.length; i++) {
        var filterValue = filterSettings[keyArray[i]]
        if (typeof filterValue !== 'object') {
            filterString = filterString + '/' + filterValue
        }
        else { createFilterString(filterValue) }
    }
    return filterString
}
export {
    loadData
}
