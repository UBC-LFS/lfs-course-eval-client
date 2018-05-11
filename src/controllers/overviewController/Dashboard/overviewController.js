import { loadOverview } from '../../../service/overviewDataService'

const toTwoDecimal = decimal => Math.round(decimal * 100) / 100

const initHighLevelOverview = () => {
  const year = 2016
  loadOverview(year).then(data => {
    const umi = document.getElementById('card-umi')
    const enrolment = document.getElementById('card-enrolment')
    const responseRate = document.getElementById('card-response-rate')
    const sections = document.getElementById('card-number-of-sections')

    const title = document.getElementById('card-title')
    title.innerHTML = year + ' Overview'

    const elements = [umi, enrolment, responseRate, sections]
    const currentYear = [
      data.currentYear.umi6,
      data.currentYear.enrolment,
      data.currentYear.responseRate,
      data.currentYear.sections
    ]
    const previousYear = [
      data.previousYear.umi6,
      data.previousYear.enrolment,
      data.previousYear.responseRate,
      data.previousYear.sections
    ]
    elements.map((element, i) => (element.innerHTML = currentYear[i]))

    const comparisons = document.getElementsByClassName('card-comparison')

    Array.from(comparisons).map((x, i) => {
      const upIcon = document.createElement('i')
      upIcon.className = 'fas fa-caret-up'

      const downIcon = document.createElement('i')
      downIcon.className = 'fas fa-caret-down'

      if (previousYear[i]) {
        const p = document.createElement('p')
        p.style = 'display: inline;'
        p.innerHTML = ' ' + (toTwoDecimal(currentYear[i] / previousYear[i] * 100 - 100)) + '% from last year'

        x.innerHTML = ''
        if ((currentYear[i] / previousYear[i] * 100 - 100) > 0) x.appendChild(upIcon)
        if ((currentYear[i] / previousYear[i] * 100 - 100) < 0) x.appendChild(downIcon)
        x.appendChild(p)
      }
    })
  })
}

export default initHighLevelOverview
