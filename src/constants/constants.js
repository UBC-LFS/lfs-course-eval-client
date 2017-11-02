/* global $ */

const margin = { top: 20, right: 20, bottom: 30, left: 40 }

const graphWidth = $('#UMIvsDispersionGraph').width()
const height = 700 - margin.top - margin.bottom

const color = {
  first: '#ffffcc',
  second: '#c2e699',
  third: '#78c679',
  fourth: '#31a354',
  fifth: '#006837'
}

const percentFavourableColor = {
  first: '#1a9641',
  second: '#a6d96a',
  third: '#ffffbf',
  fourth: '#fdae61',
  fifth: '#d7191c'
}

const percentFavourableColor6 = {
  sixth: '#d73027',
  fifth: '#fc8d59',
  fourth: '#fee08b',
  third: '#d9ef8b',
  second: '#91cf60',
  first: '#1a9850'
}

export {
    margin,
    graphWidth,
    height,
    color,
    percentFavourableColor,
    percentFavourableColor6
 }
