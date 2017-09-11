const fetchJSON = (url) => fetch(url).then(response => response.json())

const getData = () => {
    fetchJSON()
}