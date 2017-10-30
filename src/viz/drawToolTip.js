import drawCountHistogram from './drawCountHistogram'
import * as questionDefinitions from '../constants/questionDefinitions'

import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const drawToolTip = (filter, x) => d3.tip().html(function (d) {
  const tmp = document.createElement('div')
  tmp.appendChild(drawCountHistogram(d['UMI' + filter.UMI].count).node())
  const histHTML = tmp.innerHTML
  console.log(d)
  return "<div class='d3ToolTip'>" +
    '<h3 style="text-align:center;"> ' + d.instructorName + '</h3>' +
    '<p>Course: ' + d.course + ' ' + d.section + '</p>' +
    '<p>Question Code: ' + 'UMI' + filter.UMI + ' "' + questionDefinitions['codesAndDef']['UMI' + filter.UMI] +
    '"' + '</p>' +
    '<p>Average: ' + d['UMI' + filter.UMI].average + '</p>' +
    '<p>Dispersion Index: ' + d['UMI' + filter.UMI].dispersionIndex + '</p>' +
    '<p>Class Size: ' + d.enrolment + '</p>' +
    '<p>Response Rate: ' + Math.round(d.responseRate * 100) + '%' + '</p>' +
    '<p>Percent Favourable: ' + d['UMI' + filter.UMI].percentFavourable + '%' + '</p>' +
    histHTML +
    '</div>'
}).direction(function (d) {
  if (x(d['UMI' + filter.UMI].dispersionIndex) < 200) return 'e'
  else return 'n'
})

export default drawToolTip
