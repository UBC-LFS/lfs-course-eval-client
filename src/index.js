//import { getData } from './controller/controller'
import * as dataService from './service/dataService'

document.addEventListener('DOMContentLoaded', function() {
    //load first chart upon entering the page
   dataService.loadData('data','', 'c1')
})
