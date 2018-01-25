/* global $ */
import initOverview from './controllers/overviewController/initOverview'
import initInstructorView from './controllers/instructorViewController/initInstructorView'
import initExportView from './controllers/exportController/initExportView'

document.addEventListener('DOMContentLoaded', function () {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })
  if (window.location.pathname === '/') initOverview()
  if (window.location.pathname === '/instructor') initInstructorView()
  if (window.location.pathname === '/export') initExportView()
}, false)
