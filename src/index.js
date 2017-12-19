/* global $ */
import initOverview from './overviewController/initOverview'
import initInstructorCourseView from './instructorCourseViewController/initInstructorCourseView'
import initInstructorView from './instructorViewController/initInstructorView'
import initExportView from './exportController/initExportView'

document.addEventListener('DOMContentLoaded', function () {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })
  // loading correct JS file on route
  if (window.location.pathname === '/') initOverview()
  if (window.location.pathname === '/course') initInstructorCourseView()
  if (window.location.pathname === '/instructor') initInstructorView()
  if (window.location.pathname === '/export') initExportView()
}, false)
