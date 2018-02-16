import initOverview from './controllers/overviewController/initOverview'
import initInstructorView from './controllers/instructorViewController/initInstructorView'
import initExportView from './controllers/exportController/initExportView'

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementsByClassName('navbar-nav')[0]
  if (window.location.pathname === '/') {
    navbar.children[0].className = 'active'
    navbar.children[1].className = ''
    navbar.children[2].className = ''
    initOverview()
  }
  if (window.location.pathname === '/instructor') {
    navbar.children[0].className = ''
    navbar.children[1].className = 'active'
    navbar.children[2].className = ''
    initInstructorView()
  }
  if (window.location.pathname === '/export') {
    navbar.children[0].className = ''
    navbar.children[1].className = ''
    navbar.children[2].className = 'active'
    initExportView()
  }
}, false)
