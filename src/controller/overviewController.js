import { loadOverview } from '../service/dataService'

const toTwoDecimal = decimal => Math.round(decimal * 100) / 100

const initOverview = () => {
  const year = 2016
  loadOverview(year).then(data => {
    console.log(data)
    const umi = document.getElementById('card-umi')
    const enrolment = document.getElementById('card-enrolment')
    const responseRate = document.getElementById('card-response-rate')
    const sections = document.getElementById('card-number-of-sections')

    const title = document.getElementById('card-title')
    title.innerHTML = year + ' Overview'

    const elements = [umi, enrolment, responseRate, sections]
    const currentYear = [data.currentYear.umi6, data.currentYear.enrolment, data.currentYear.responseRate, data.currentYear.sections]
    const previousYear = [data.previousYear.umi6, data.previousYear.enrolment, data.previousYear.responseRate, data.previousYear.sections]

    elements.map((element, i) => (element.innerHTML = currentYear[i]))

    const comparisons = document.getElementsByClassName('card-comparison')
    Array.from(comparisons).map((x, i) => (x.innerHTML = (toTwoDecimal(currentYear[i] / previousYear[i] * 100 - 100) + '%')))
  })
}

export default initOverview
