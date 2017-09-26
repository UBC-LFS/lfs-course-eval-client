import R from 'ramda'

const fetchJSON = (url) => fetch(url).then(response => response.json())

const createFilterString = ({ time, courseNum, department, toggleBelowMin, questionCode, classSizeMin, classSizeMax }) => {
    return '/' + [time.year, time.term, courseNum, department, toggleBelowMin, questionCode, classSizeMin, classSizeMax].join('/')
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
    let url = 'data/' + chartKey + createFilterString(filterSettings)
    if (chartKey === 'c1') console.log(createFilterString(filterSettings))
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
