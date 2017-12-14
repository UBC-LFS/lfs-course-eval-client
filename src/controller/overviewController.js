import { loadOverview } from '../service/dataService'

const initOverview = () => loadOverview().then(data => {
  const umi = document.getElementById('card-umi')
  const enrolment = document.getElementById('card-enrolment')
  const responseRate = document.getElementById('card-response-rate')
  const sections = document.getElementById('card-number-of-sections')

  umi.innerHTML = data.umi6
  enrolment.innerHTML = data.enrolment
  responseRate.innerHTML = data.responseRate
  sections.innerHTML = data.sections
})

export default initOverview
