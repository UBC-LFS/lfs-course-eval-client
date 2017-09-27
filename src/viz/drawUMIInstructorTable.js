import * as courseData from '../data/mockInstructorSpecificCourseData'

const drawUMIInstructor = (tableData = courseData) => {
        const data = []
        tableData.default.map(x => data.push(
            [x.course + ' ' +x.section, x.UMI1.average, x.UMI2.average, x.UMI3.average, x.UMI4.average, x.UMI5.average, x.UMI6.average]
        ))
        $('#OverallInstructors').DataTable({
            "aaData": data,
            "aoColumns":
            [
                { "sTitle": "" },
                { "sTitle": "UMI1" },
                { "sTitle": "UMI2" },
                { "sTitle": "UMI3" },
                { "sTitle": "UMI4" },
                { "sTitle": "UMI5" },
                { "sTitle": "UMI6" }
            ],
            "aoColumnDefs": [
                { 'bSortable': false, 'aTargets': [ 0 ] }]
        });
}

export default drawUMIInstructor