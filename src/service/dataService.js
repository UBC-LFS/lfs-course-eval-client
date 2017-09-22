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

const loadData = (filterSettings = {
                            time: {
                                year: '2016',
                                term: 'W2'
                            },
                            courseNum: 'LFSLC 100 001',
                            department: 'LFS',
                            toggleBelowMin: true,
                            questionCode: 'UMI6',
                            classSizeMin: 0,
                            classSizeMax: 300 // [min, max]
                        }, chartKey) => {
    let url = ''
    url = 'data/' + chartKey + createFilterString(filterSettings)
    console.log(url)
    //Temporary filter settings, change to real filters once applied
    //fetchJSON(url).then(x => drawUMIvsDispersion(x))
    return fetchJSON(url)
}

const loadFilterData = () => {
    return fetchJSON('filterData')
}

export {
    loadData,
    loadFilterData
}
