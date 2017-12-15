/* global $ */
import initOverview from './overviewController/initOverview'

document.addEventListener('DOMContentLoaded', function () {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })

  // call the right code depending on which page we're on
  initOverview()
}, false)
