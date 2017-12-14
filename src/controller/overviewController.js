import { loadOverview } from '../service/dataService'

const initOverview = () => {
  const year = 2016
  loadOverview(year).then(data => {
    console.log(data)
    const umi = document.getElementById('card-umi')
    const enrolment = document.getElementById('card-enrolment')
    const responseRate = document.getElementById('card-response-rate')
    const sections = document.getElementById('card-number-of-sections')
    const title = document.getElementById('card-title')

    umi.innerHTML = data.currentYear.umi6
    enrolment.innerHTML = data.currentYear.enrolment
    responseRate.innerHTML = data.currentYear.responseRate
    sections.innerHTML = data.currentYear.sections
    title.innerHTML = year + ' Overview'
  })
}

export default initOverview
