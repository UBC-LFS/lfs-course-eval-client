/* global $ */
import initOverview from './overviewController/initOverview'

document.addEventListener('DOMContentLoaded', function () {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })
  // loading correct JS file on route
  if (window.location.pathname === '/') initOverview()
  if (window.location.pathname === '/course') console.log('on course')
  if (window.location.pathname === '/instructor') console.log('on instructor')
  if (window.location.pathname === '/export') console.log('on export')
}, false)
