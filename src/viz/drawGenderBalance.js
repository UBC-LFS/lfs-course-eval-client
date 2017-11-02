import { margin } from '../constants/constants'
import * as d3 from 'd3'

let testGender = {
  Female: 20,
  Male: 15
}

const drawGenderBalance = (gender = testGender) => {
  const female = gender.Female
  const male = gender.Male

  const width = 375 - margin.left - margin.right
  const height = 50

  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleBand().rangeRound([0, height])

  const svg = d3.select(document.createAttribute('div')).append('svg')

  const g = svg.append('g')

  return svg
}

export default drawGenderBalance
