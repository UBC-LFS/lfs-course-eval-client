import drawUMIvsDispersion from '../viz/drawGraph'

const fetchJSON = (url) => fetch(url).then(response => response.json())

let filterString = ''
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

const loadData = (url, filterSettings = {
                            time: {
                                year: '2016',
                                term: 'all'
                            },
                            courseLevel: 'all',
                            department: 'all',
                            questionCode: 'UMI6',
                            toggleBelowMin: false,
                            classSizeMin: 0,
                            classSizeMax: 300 // [min, max]
                        }, chartKey) => {

    url = url + '/' + chartKey + createFilterString(filterSettings)
    console.log(url)
    //Temporary filter settings, change to real filters once applied
    fetchJSON(url).then(x => drawUMIvsDispersion(x))
}

export {
    loadData
}
