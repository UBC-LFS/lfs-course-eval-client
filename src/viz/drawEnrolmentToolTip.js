import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const drawCourseEnrolmentToolTip = (data) => d3.tip().html(d => {
  console.log(d)
  // return "<div class='d3ToolTip'>" +
}).direction(d => 's')

export default drawCourseEnrolmentToolTip
