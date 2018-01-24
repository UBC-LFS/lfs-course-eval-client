/* global $ */

import { loadOptions } from '../../../service/overviewDataService'
import { loadInstructorOverview } from '../../../service/instructorDataService'
const attachOptions = arr => arr.map(x => '<option value="' + x.PUID + '" data-terms=' + x.terms + '>' + x.name + '</option>').join(' ')
const toTwoDecimal = decimal => Math.round(decimal * 100) / 100

const initHighLevelInstructorOverview = (instructor) => {
  const terms = instructor.selectedOptions[0].dataset.terms.split(',')
  const lastTerm = terms[terms.length - 1].substring(0, 4)
  loadInstructorOverview(instructor.value, lastTerm).then(data => {
    const umi = document.getElementById('instructor-umi')
    const percentFavourable = document.getElementById('instructor-pf')
    const coursesTaught = document.getElementById('instructor-courses-count')
    const studentsTaught = document.getElementById('instructor-students-count')
    const title = document.getElementById('instructor-title')
    title.innerHTML = 'Overview of ' + $('#instructor-select option:selected')[0].innerHTML
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

        const p = document.createElement('p')
        p.style = 'display: inline;'
        p.innerHTML = ' ' + (toTwoDecimal(currentYear[i] / prevYear[i] * 100 - 100)) + '% from ' + (parseInt(lastTerm) - 1)

        x.innerHTML = ''
        if ((currentYear[i] / prevYear[i] * 100 - 100) > 0) x.appendChild(upIcon)
        if ((currentYear[i] / prevYear[i] * 100 - 100) < 0) x.appendChild(downIcon)
        x.appendChild(p)
      })
    }
    else { Array.from(comparisons).map(x => { x.innerHTML = '' }) }
  })
}

const initInstructorSelector = () => {
  const instructorSelect = document.getElementById('instructor-select')
  loadOptions().then(data => {
    console.log(data)
    const instructors = data[0].instructors
    instructorSelect.innerHTML = attachOptions(instructors)
    instructorSelect.options[0].selected = true
    $('#instructor-select.selectpicker').selectpicker('refresh')
    initHighLevelInstructorOverview(instructorSelect)
  })

  instructorSelect.addEventListener('change', function (e) {
    initHighLevelInstructorOverview(instructorSelect)
  })
}

const initInstructorOverview = () => {
  initInstructorSelector()
}

export default initInstructorOverview
