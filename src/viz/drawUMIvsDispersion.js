import * as util from '../clientUtil'
import R from 'ramda'
import { margin, height, percentFavourableColor6, graphWidth } from './constants'
import codesAndDef from './codesAndDef'

const drawUMIvsDispersion = (data, filterSettings) => {
    const name = data.Name
    const year = filterSettings.time.year
    const term = filterSettings.time.term
    const code = filterSettings.questionCode
    const courseLevel = filterSettings.courseLevel
    const dept = filterSettings.department
    const toggle = filterSettings.toggleBelowMin
    const minMaxRange = filterSettings.classSize
    
    // filtering data according to filterSettings
    const flatData = util.flattenData(data)
    const filterData = R.pipe(
        R.filter(x => x['AcademicPeriod'].slice(0, 4) === year),
        util.filterByCode(code),
        util.filterByCourseLevel(courseLevel),
        util.filterByDept(dept),
        util.toggleBelowMin(toggle),
        util.filterByTerm(term),
        util.filterClassSize(minMaxRange)
    )(flatData)

    const range = util.getRange(flatData)

    const svg = d3.select('#UMIvsDispersionGraph')
        .append('svg')
        .attr('style', 'display: block; margin: auto; margin-top: 30px;')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', '0 0 ' + Math.min(graphWidth, height) + ' ' + 700)
        .attr('preserveAspectRatio', 'xMinYMin')

    const g = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const x = d3.scaleLinear().rangeRound([0, graphWidth])
    const y = d3.scaleLinear().rangeRound([height, 0])

    x.domain([0, 0.8])
    y.domain([2, 5])

    g.append('g')
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.9em")
        .attr("text-anchor", "end")
        .attr('fill', '#000')
        .text("Likert Scale")

    g.append('g')
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    const umiDots = g.append('g').attr('id', 'umiDots')

    const courseInfoTip = d3.tip().html(function (d) {
        return "<div class='d3ToolTip'>" +
            "<p>Instructor: " + d.Instructor + "</p>" +
            "<p>Section: " + d.CourseSection + "</p>" +
            "<p>Question Code: " + d.QuestionCode + ' "' + codesAndDef[d.QuestionCode] + '"' + "</p>" +
            "<p>Average: " + util.roundToTwoDecimal(d.Avg) + "</p>" +
            "<p>Dispersion Index: " + util.roundToTwoDecimal(d.DispersionIndex) + "</p>" +
            "<p>Class Size: " + d.ClassSize + "</p>" +
            "<p>Response Rate: " + util.roundToTwoDecimal(d.Responses / d.ClassSize * 100) + '%' + "</p>" +
            "<p>Percent Favourable: " + util.roundToTwoDecimal(d.PercentFavourable) + '%' + "</p>" + 
            "</div>"
    }).direction(function (d) {
        if (x(d.DispersionIndex) < 200) return 'e'
        else return 'n'
    })

    umiDots.selectAll('dot')
        .data(filterData)
        .enter().append('circle')
        .attr('cx', (d) => x(Math.min(d['DispersionIndex'], 0.8)))
        .attr('cy', (d) => y(Math.max(d['Avg'], 2)))
        .attr('r', (d) => Math.pow(Math.log(d['ClassSize']), 1.7))
        .style('fill', (d) => {
            if (d['PercentFavourable'] >= 90) {
                return percentFavourableColor6.first
            } else if (d['PercentFavourable'] >= 80 && d['PercentFavourable'] < 90) {
                return percentFavourableColor6.second
            } else if (d['PercentFavourable'] >= 70 && d['PercentFavourable'] < 80) {
                return percentFavourableColor6.third
            } else if (d['PercentFavourable'] >= 60 && d['PercentFavourable'] < 70) {
                return percentFavourableColor6.fourth
            } else if (d['PercentFavourable'] >= 50 && d['PercentFavourable'] < 60) {
                return percentFavourableColor6.fifth
            } else return percentFavourableColor6.sixth
        })
        .attr('class', (d) => {
            if (util.stripMiddleName(d.Instructor) === name) {
                return 'pulse'
            }
        })
        .on('mouseover', courseInfoTip.show)
        .on('mouseout', courseInfoTip.hide)

    // set circles for the instructor 
    umiDots.selectAll('dot')
        .data(R.filter(x => util.stripMiddleName(x.Instructor) === name, filterData))
        .enter().append('circle')
        .attr('cx', (d) => x(Math.min(d['DispersionIndex'], 0.8)))
        .attr('cy', (d) => y(Math.max(d['Avg'], 2)))
        .attr('r', (d) => Math.pow(Math.log(d['ClassSize']), 1.7))
        .style('fill', (d) => {
            if (d['PercentFavourable'] >= 90) {
                return percentFavourableColor6.first
            } else if (d['PercentFavourable'] >= 80 && d['PercentFavourable'] < 90) {
                return percentFavourableColor6.second
            } else if (d['PercentFavourable'] >= 70 && d['PercentFavourable'] < 80) {
                return percentFavourableColor6.third
            } else if (d['PercentFavourable'] >= 60 && d['PercentFavourable'] < 70) {
                return percentFavourableColor6.fourth
            } else if (d['PercentFavourable'] >= 50 && d['PercentFavourable'] < 60) {
                return percentFavourableColor6.fifth
            } else return percentFavourableColor6.sixth
        })
        .on('mouseover', courseInfoTip.show)
        .on('mouseout', courseInfoTip.hide)
    
    // append animation
    const pulseList = document.getElementsByClassName('pulse')
    Array.prototype.map.call(pulseList, (x) => {
        x.innerHTML = '<animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="0%" to="10%"/><animate attributeType="CSS" attributeName="stroke-width" begin="0s"  dur="1.5s" repeatCount="indefinite" from="3%" to="0%" /><animate attributeType="CSS" attributeName="opacity" begin="0s"  dur="1.5s" repeatCount="indefinite" from="1" to="0"/>'
    })

    svg.call(courseInfoTip)

}

export default drawUMIvsDispersion