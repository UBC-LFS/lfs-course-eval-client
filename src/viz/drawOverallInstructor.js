import * as instructorData from '../data/mockInstructorData'

const drawOverallInstructor = (data = instructorData) => {
    $(document).ready(function () {
        $('#OverallInstructors').DataTable({
            "data": data,
            "columns":
            [
                { "data": "instructorName" },
                { "data": "dept" },
                { "data": "percentileRankingByFaculty" },
                { "data": "percentileRankingByDept" },
                { "data": "numberOfCoursesTaught" },
                { "data": "numberOfStudentsTaught" }
            ]
        });
    });
}

export default drawOverallInstructor