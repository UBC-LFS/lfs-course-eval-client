/* global $ */
import initOverview from './overviewController/initOverview'
import initInstructorCourseView from './instructorCourseViewController/initInstructorCourseView'
import initExportView from './exportController/initExportView'

document.addEventListener('DOMContentLoaded', function () {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })
  // loading correct JS file on route
  if (window.location.pathname === '/') initOverview()
  if (window.location.pathname === '/course') initInstructorCourseView()
  if (window.location.pathname === '/instructor') console.log('on instructor')
  if (window.location.pathname === '/export') initExportView()
}, false)
