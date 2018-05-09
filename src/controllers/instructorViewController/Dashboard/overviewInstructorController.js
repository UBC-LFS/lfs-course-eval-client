/* global $ */

import { loadOptions } from '../../../service/overviewDataService'
import { loadInstructorOverview, loadInstructorTerms } from '../../../service/instructorDataService'
const toTwoDecimal = decimal => Math.round(decimal * 100) / 100

const initHighLevelInstructorOverview = (instructor, terms) => {
  const lastYear = terms[terms.length - 1].substring(0, 4)
  loadInstructorOverview(instructor.value, lastYear).then(data => {
    const umi = document.getElementById('instructor-umi')
    const percentFavourable = document.getElementById('instructor-pf')
    const coursesTaught = document.getElementById('instructor-courses-count')
    const studentsTaught = document.getElementById('instructor-students-count')
    const title = document.getElementById('instructor-title')
    title.innerHTML = 'Overview of ' + $('#instructor-select option:selected')[0].innerHTML
    const yearTitle = document.getElementById('most-recent-year')
    yearTitle.innerHTML = 'Most Recent Year Taught: ' + lastYear
    const elements = [umi, percentFavourable, coursesTaught, studentsTaught]
    const currentYear = [
      data.currentYear.umi6,
      data.currentYear.percentFavourable,
      data.currentYear.numCoursesTaught,
      data.currentYear.numStudentsTaught
    ]
    const prevYear = [
      data.previousYear.umi6,
      data.previousYear.percentFavourable,
      data.previousYear.numCoursesTaught,
      data.previousYear.numStudentsTaught
    ]
    elements.map((element, i) => (element.innerHTML = currentYear[i]))
    const comparisons = document.getElementsByClassName('card-comparison')
    if (terms.length > 1) {
      Array.from(comparisons).map((x, i) => {
        const upIcon = document.createElement('i')
        upIcon.className = 'fas fa-caret-up'

        const downIcon = document.createElement('i')
        downIcon.className = 'fas fa-caret-down'

        if (prevYear[i]) {
          const p = document.createElement('p')
          p.style = 'display: inline;'
          p.innerHTML = ' ' + (toTwoDecimal(currentYear[i] - prevYear[i])) + ' (' + (toTwoDecimal(currentYear[i] / prevYear[i] * 100 - 100)) + '%' + ') ' + 'from ' + (parseInt(lastYear) - 1)

          x.innerHTML = ''
          if ((currentYear[i] / prevYear[i] * 100 - 100) > 0) x.appendChild(upIcon)
          if ((currentYear[i] / prevYear[i] * 100 - 100) < 0) x.appendChild(downIcon)
          x.appendChild(p)
        }
      })
    } else { Array.from(comparisons).map(x => { x.innerHTML = '' }) }
  })
}

const updateInstructorKPI = (instructorSelect) => {
  loadInstructorTerms(instructorSelect.selectedOptions[0].value).then(terms => {
    initHighLevelInstructorOverview(instructorSelect, terms)
  })
}
const initInstructorSelector = () => {
  const instructorSelect = document.getElementById('instructor-select')
  loadOptions().then(data => {
    const attachOptions = arr => arr.map(x => '<option value="' + x.PUID + '">' + x.name + '</option>').join(' ')
    console.log(data)
    const instructors = data[0].instructors
    instructorSelect.innerHTML = attachOptions(instructors)
    instructorSelect.options[0].selected = true
    $('#instructor-select.selectpicker').selectpicker('refresh')
    updateInstructorKPI(instructorSelect)
  })

  instructorSelect.addEventListener('change', function (e) {
    updateInstructorKPI(instructorSelect)
  })
}

const initInstructorOverview = () => {
  initInstructorSelector()
}

export default initInstructorOverview
