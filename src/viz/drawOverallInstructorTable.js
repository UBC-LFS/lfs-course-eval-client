import * as instructorData from '../data/mockInstructorData'

const drawOverallInstructor = (tableData = instructorData) => {
        const data = []
        tableData.default.map(x => data.push(
            [x.instructorName, x.dept, x.percentileRankingByFaculty, x.percentileRankingByDept, x.numberOfCoursesTaught, x.numberOfStudentsTaught]
        ))
        $('#OverallInstructors').DataTable({
            "aaData": data,
            "aoColumns":
            [
                { "sTitle": "Instructor Name" },
                { "sTitle": "Department" },
                { "sTitle": "Percentile Ranking By Faculty" },
                { "sTitle": "Percentile Ranking By Department" },
                { "sTitle": "Number of Courses Taught" },
                { "sTitle": "Number of Students Taught" }
            ],
            "order": [[ 0, "asc" ]]
        });
}

export default drawOverallInstructor